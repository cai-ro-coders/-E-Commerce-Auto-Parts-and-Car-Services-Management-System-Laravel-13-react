<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');
        $paymentStatus = $request->input('payment_status');

        $orders = Order::with(['customer:id,full_name,email', 'items'])
            ->when($search, fn($q) => $q->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhereHas('customer', fn($q) => $q->where('full_name', 'like', "%{$search}%"));
            }))
            ->when($status, fn($q) => $q->where('order_status', $status))
            ->when($paymentStatus, fn($q) => $q->where('payment_status', $paymentStatus))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($order) => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer_name' => $order->customer?->full_name,
                'customer_email' => $order->customer?->email,
                'subtotal' => (float) $order->subtotal,
                'discount' => (float) $order->discount,
                'tax' => (float) $order->tax,
                'shipping_fee' => (float) $order->shipping_fee,
                'total' => (float) $order->total,
                'order_status' => $order->order_status,
                'payment_status' => $order->payment_status,
                'items_count' => $order->items->count(),
                'created_at' => $order->created_at->format('Y-m-d H:i'),
            ]);

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'payment_status' => $paymentStatus,
            ],
        ]);
    }

    public function show($id)
    {
        $order = Order::with(['customer', 'items.product', 'coupon'])->findOrFail($id);

        return Inertia::render('admin/orders/show', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer' => $order->customer ? [
                    'id' => $order->customer->id,
                    'full_name' => $order->customer->full_name,
                    'email' => $order->customer->email,
                    'phone' => $order->customer->phone,
                    'address' => $order->customer->address,
                ] : null,
                'subtotal' => (float) $order->subtotal,
                'discount' => (float) $order->discount,
                'tax' => (float) $order->tax,
                'shipping_fee' => (float) $order->shipping_fee,
                'total' => (float) $order->total,
                'order_status' => $order->order_status,
                'payment_status' => $order->payment_status,
                'payment_method' => $order->payment_method,
                'items' => $order->items->map(fn($item) => [
                    'id' => $item->id,
                    'product_name' => $item->product?->name,
                    'product_sku' => $item->product?->sku,
                    'quantity' => $item->quantity,
                    'unit_price' => (float) $item->unit_price,
                    'total' => (float) $item->total,
                ]),
                'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $order->updated_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }

    public function edit($id)
    {
        $order = Order::with(['customer', 'items.product'])->findOrFail($id);

        return Inertia::render('admin/orders/edit', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer_name' => $order->customer?->full_name,
                'subtotal' => (float) $order->subtotal,
                'discount' => (float) $order->discount,
                'tax' => (float) $order->tax,
                'shipping_fee' => (float) $order->shipping_fee,
                'total' => (float) $order->total,
                'order_status' => $order->order_status,
                'payment_status' => $order->payment_status,
                'items' => $order->items->map(fn($item) => [
                    'id' => $item->id,
                    'product_name' => $item->product?->name,
                    'quantity' => $item->quantity,
                    'unit_price' => (float) $item->unit_price,
                    'total' => (float) $item->total,
                ]),
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'order_status' => 'required|in:pending,processing,shipped,completed,cancelled',
            'payment_status' => 'required|in:pending,paid,failed,refunded',
        ]);

        $order->update($validated);

        return redirect()->route('admin.orders.index')
            ->with('toast', ['type' => 'success', 'message' => 'Order updated successfully.']);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->items()->delete();
        $order->delete();

        return redirect()->route('admin.orders.index')
            ->with('toast', ['type' => 'success', 'message' => 'Order deleted successfully.']);
    }

    public function export(Request $request)
    {
        $orders = Order::with(['customer', 'items'])->orderBy('created_at', 'desc')->get();

        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename=orders.csv',
        ];

        $callback = function () use ($orders) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, [
                'Order Number', 'Customer', 'Email', 'Items Count',
                'Subtotal', 'Discount', 'Tax', 'Shipping Fee', 'Total',
                'Order Status', 'Payment Status', 'Date',
            ]);

            foreach ($orders as $order) {
                fputcsv($handle, [
                    $order->order_number,
                    $order->customer?->full_name,
                    $order->customer?->email,
                    $order->items->count(),
                    number_format((float) $order->subtotal, 2),
                    number_format((float) $order->discount, 2),
                    number_format((float) $order->tax, 2),
                    number_format((float) $order->shipping_fee, 2),
                    number_format((float) $order->total, 2),
                    $order->order_status,
                    $order->payment_status,
                    $order->created_at->format('Y-m-d H:i'),
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function tracking($id)
    {
        $order = Order::with(['customer'])->findOrFail($id);

        $statusFlow = ['pending', 'processing', 'shipped', 'completed'];
        $currentIndex = array_search($order->order_status, $statusFlow);

        return Inertia::render('admin/orders/tracking', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer_name' => $order->customer?->full_name,
                'order_status' => $order->order_status,
                'payment_status' => $order->payment_status,
                'total' => (float) $order->total,
                'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                'current_step' => $currentIndex !== false ? $currentIndex : -1,
                'status_flow' => $statusFlow,
            ],
        ]);
    }

    public function printReceipt($id)
    {
        $order = Order::with(['customer', 'items.product'])->findOrFail($id);

        return Inertia::render('admin/orders/receipt', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer' => $order->customer ? [
                    'full_name' => $order->customer->full_name,
                    'email' => $order->customer->email,
                    'phone' => $order->customer->phone,
                    'address' => $order->customer->address,
                ] : null,
                'subtotal' => (float) $order->subtotal,
                'discount' => (float) $order->discount,
                'tax' => (float) $order->tax,
                'shipping_fee' => (float) $order->shipping_fee,
                'total' => (float) $order->total,
                'order_status' => $order->order_status,
                'payment_status' => $order->payment_status,
                'items' => $order->items->map(fn($item) => [
                    'product_name' => $item->product?->name,
                    'quantity' => $item->quantity,
                    'unit_price' => (float) $item->unit_price,
                    'total' => (float) $item->total,
                ]),
                'created_at' => $order->created_at->format('Y-m-d H:i:s'),
            ],
        ]);
    }
}
