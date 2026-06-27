<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $invoices = Invoice::with(['customer:id,full_name', 'items'])
            ->when($search, fn($q) => $q->where(function ($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                  ->orWhereHas('customer', fn($q) => $q->where('full_name', 'like', "%{$search}%"));
            }))
            ->when($status, fn($q) => $q->where('status', $status))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($invoice) => [
                'id' => $invoice->id,
                'invoice_number' => $invoice->invoice_number,
                'customer_name' => $invoice->customer?->full_name,
                'subtotal' => (float) $invoice->subtotal,
                'discount' => (float) $invoice->discount,
                'tax' => (float) $invoice->tax,
                'total' => (float) $invoice->total,
                'status' => $invoice->status,
                'items_count' => $invoice->items->count(),
                'due_date' => $invoice->due_date?->format('Y-m-d'),
                'created_at' => $invoice->created_at->format('Y-m-d H:i'),
            ]);

        return Inertia::render('admin/invoices/index', [
            'invoices' => $invoices,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function create()
    {
        $customers = Customer::select('id', 'full_name', 'phone', 'email')
            ->where('status', true)
            ->orderBy('full_name')
            ->get()
            ->map(fn($c) => [
                'id' => $c->id,
                'name' => $c->full_name,
                'phone' => $c->phone,
                'email' => $c->email,
            ]);

        $products = Product::with(['images' => fn($q) => $q->orderBy('sort_order')->limit(1)])
            ->where('status', true)
            ->orderBy('name')
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'sku' => $p->sku,
                'selling_price' => (float) $p->selling_price,
                'image' => $p->images->first()?->image,
            ]);

        return Inertia::render('admin/invoices/create', [
            'customers' => $customers,
            'products' => $products,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'nullable|exists:customers,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'items.*.description' => 'nullable|string|max:255',
            'discount' => 'nullable|numeric|min:0',
            'tax' => 'nullable|numeric|min:0',
            'due_date' => 'nullable|date',
            'status' => 'required|string|in:pending,paid,cancelled',
        ]);

        $subtotal = collect($validated['items'])->sum(fn($i) => $i['quantity'] * $i['unit_price']);
        $discount = $validated['discount'] ?? 0;
        $tax = $validated['tax'] ?? 0;
        $total = $subtotal - $discount + $tax;

        $invoice = Invoice::create([
            'invoice_number' => 'INV-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6)),
            'customer_id' => $validated['customer_id'],
            'invoice_type' => 'manual',
            'subtotal' => $subtotal,
            'discount' => $discount,
            'tax' => $tax,
            'total' => $total,
            'due_date' => $validated['due_date'],
            'status' => $validated['status'],
        ]);

        foreach ($validated['items'] as $item) {
            $invoice->items()->create([
                'item_type' => 'product',
                'item_id' => $item['product_id'],
                'description' => $item['description'] ?? null,
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'total' => $item['quantity'] * $item['unit_price'],
            ]);
        }

        return redirect()->route('admin.invoices.index')
            ->with('toast', ['type' => 'success', 'message' => 'Invoice ' . $invoice->invoice_number . ' created.']);
    }

    public function show($id)
    {
        $invoice = Invoice::with([
            'customer',
            'items',
            'payments',
        ])->findOrFail($id);

        return Inertia::render('admin/invoices/show', [
            'invoice' => [
                'id' => $invoice->id,
                'invoice_number' => $invoice->invoice_number,
                'customer' => $invoice->customer ? [
                    'id' => $invoice->customer->id,
                    'full_name' => $invoice->customer->full_name,
                    'email' => $invoice->customer->email,
                    'phone' => $invoice->customer->phone,
                    'address' => $invoice->customer->address,
                ] : null,
                'subtotal' => (float) $invoice->subtotal,
                'discount' => (float) $invoice->discount,
                'tax' => (float) $invoice->tax,
                'total' => (float) $invoice->total,
                'status' => $invoice->status,
                'due_date' => $invoice->due_date?->format('Y-m-d'),
                'items' => $invoice->items->map(fn($item) => [
                    'id' => $item->id,
                    'item_type' => $item->item_type,
                    'description' => $item->description,
                    'quantity' => $item->quantity,
                    'unit_price' => (float) $item->unit_price,
                    'total' => (float) $item->total,
                ]),
                'payments' => $invoice->payments->map(fn($p) => [
                    'id' => $p->id,
                    'amount' => (float) $p->amount,
                    'payment_method' => $p->payment_method,
                    'payment_date' => $p->payment_date?->format('Y-m-d H:i'),
                ]),
                'created_at' => $invoice->created_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    public function destroy($id)
    {
        $invoice = Invoice::findOrFail($id);
        $invoice->items()->delete();
        $invoice->delete();

        return redirect()->route('admin.invoices.index')
            ->with('toast', ['type' => 'success', 'message' => 'Invoice deleted.']);
    }

    public function printInvoice($id)
    {
        $invoice = Invoice::with(['customer', 'items'])->findOrFail($id);

        return Inertia::render('admin/invoices/print', [
            'invoice' => [
                'id' => $invoice->id,
                'invoice_number' => $invoice->invoice_number,
                'customer' => $invoice->customer ? [
                    'full_name' => $invoice->customer->full_name,
                    'email' => $invoice->customer->email,
                    'phone' => $invoice->customer->phone,
                    'address' => $invoice->customer->address,
                ] : null,
                'subtotal' => (float) $invoice->subtotal,
                'discount' => (float) $invoice->discount,
                'tax' => (float) $invoice->tax,
                'total' => (float) $invoice->total,
                'status' => $invoice->status,
                'due_date' => $invoice->due_date?->format('Y-m-d'),
                'items' => $invoice->items->map(fn($item) => [
                    'description' => $item->description,
                    'quantity' => $item->quantity,
                    'unit_price' => (float) $item->unit_price,
                    'total' => (float) $item->total,
                ]),
                'created_at' => $invoice->created_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }
}
