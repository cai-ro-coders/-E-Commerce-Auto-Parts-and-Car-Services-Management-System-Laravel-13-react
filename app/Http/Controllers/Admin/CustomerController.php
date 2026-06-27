<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $customers = Customer::withCount('orders')
            ->withSum('orders', 'total')
            ->when($search, fn($q) => $q->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('customer_code', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            }))
            ->when($status !== null && $status !== '', fn($q) => $q->where('status', $status === 'active' ? 1 : 0))
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString()
            ->through(fn($customer) => [
                'id' => $customer->id,
                'customer_code' => $customer->customer_code,
                'full_name' => $customer->full_name,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'loyalty_points' => $customer->loyalty_points,
                'wallet_balance' => (float) $customer->wallet_balance,
                'orders_count' => $customer->orders_count,
                'total_spent' => (float) ($customer->orders_sum_total ?? 0),
                'status' => (bool) $customer->status,
                'created_at' => $customer->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('admin/customers/index', [
            'customers' => $customers,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/customers/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'notes' => 'nullable|string',
            'status' => 'required|boolean',
        ]);

        $validated['customer_code'] = 'CUST-' . str_pad(Customer::max('id') + 1, 3, '0', STR_PAD_LEFT);

        Customer::create($validated);

        return redirect()->route('admin.customers.index')
            ->with('toast', ['type' => 'success', 'message' => 'Customer created successfully.']);
    }

    public function show($id)
    {
        $customer = Customer::withCount('orders')->findOrFail($id);

        $orders = Order::with(['items'])
            ->where('customer_id', $id)
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn($order) => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'total' => (float) $order->total,
                'order_status' => $order->order_status,
                'payment_status' => $order->payment_status,
                'items_count' => $order->items->count(),
                'created_at' => $order->created_at->format('Y-m-d H:i'),
            ]);

        return Inertia::render('admin/customers/show', [
            'customer' => [
                'id' => $customer->id,
                'customer_code' => $customer->customer_code,
                'full_name' => $customer->full_name,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'address' => $customer->address,
                'loyalty_points' => $customer->loyalty_points,
                'wallet_balance' => (float) $customer->wallet_balance,
                'notes' => $customer->notes,
                'status' => (bool) $customer->status,
                'orders_count' => $customer->orders_count,
                'created_at' => $customer->created_at->format('Y-m-d'),
                'updated_at' => $customer->updated_at->format('Y-m-d'),
            ],
            'orders' => $orders,
        ]);
    }

    public function edit($id)
    {
        $customer = Customer::findOrFail($id);

        return Inertia::render('admin/customers/edit', [
            'customer' => [
                'id' => $customer->id,
                'customer_code' => $customer->customer_code,
                'full_name' => $customer->full_name,
                'email' => $customer->email,
                'phone' => $customer->phone,
                'address' => $customer->address,
                'loyalty_points' => $customer->loyalty_points,
                'wallet_balance' => (float) $customer->wallet_balance,
                'notes' => $customer->notes,
                'status' => (bool) $customer->status,
            ],
        ]);
    }

    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string',
            'loyalty_points' => 'nullable|integer|min:0',
            'wallet_balance' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string',
            'status' => 'required|boolean',
        ]);

        $customer->update($validated);

        return redirect()->route('admin.customers.index')
            ->with('toast', ['type' => 'success', 'message' => 'Customer updated successfully.']);
    }

    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return redirect()->route('admin.customers.index')
            ->with('toast', ['type' => 'success', 'message' => 'Customer deleted successfully.']);
    }
}
