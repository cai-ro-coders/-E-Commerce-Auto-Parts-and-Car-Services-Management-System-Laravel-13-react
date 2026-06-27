<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Customer;
use App\Models\JobCard;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ServicePackage;
use App\Models\Vehicle;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function admin()
    {
        $today = Carbon::today();
        $yesterday = Carbon::yesterday();
        $startOfWeek = Carbon::now()->startOfWeek();

        $totalRevenue = Order::where('payment_status', 'paid')->sum('total');
        $todayRevenue = Order::whereDate('created_at', $today)->sum('total');
        $todayOrders = Order::whereDate('created_at', $today)->count();
        $yesterdayOrders = Order::whereDate('created_at', $yesterday)->count();
        $totalOrders = Order::count();

        $weeklySales = Order::where('created_at', '>=', $startOfWeek)
            ->where('payment_status', 'paid')
            ->select(DB::raw('DATE(created_at) as date'), DB::raw('SUM(total) as total'))
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('total', 'date')
            ->map(fn ($v) => (float) $v);

        $salesAnalytic = Order::whereYear('created_at', $today->year)
            ->where('payment_status', 'paid')
            ->select(DB::raw("DATE_FORMAT(created_at, '%Y-%m') as month"), DB::raw('SUM(total) as total'))
            ->groupBy('month')
            ->orderBy('month')
            ->pluck('total', 'month')
            ->map(fn ($v) => (float) $v);

        $bestSellers = OrderItem::select('product_id', DB::raw('SUM(quantity) as total_qty'))
            ->groupBy('product_id')
            ->orderByDesc('total_qty')
            ->take(5)
            ->with('product')
            ->get()
            ->map(fn ($item) => [
                'id' => $item->product_id,
                'name' => $item->product->name,
                'total_qty' => (int) $item->total_qty,
                'revenue' => (float) OrderItem::where('product_id', $item->product_id)->sum('total'),
                'image' => ($img = $item->product->images()->first()) ? '/storage/' . $img->image : null,
            ]);

        $recentOrders = Order::with(['items.product.images', 'customer'])
            ->latest()
            ->take(10)
            ->get()
            ->map(fn ($order) => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'customer_name' => $order->customer?->full_name ?? 'N/A',
                'total' => (float) $order->total,
                'status' => $order->order_status,
                'payment_status' => $order->payment_status,
                'items' => $order->items->take(3)->map(fn ($item) => [
                    'name' => $item->product->name,
                    'quantity' => $item->quantity,
                    'image' => ($img = $item->product->images()->first()) ? '/storage/' . $img->image : null,
                ]),
                'created_at' => $order->created_at->toDateTimeString(),
            ]);

        $serviceStats = [
            'total' => JobCard::count(),
            'waiting' => JobCard::where('status', 'waiting')->count(),
            'assigned' => JobCard::where('status', 'assigned')->count(),
            'inProgress' => JobCard::where('status', 'in_progress')->count(),
            'completed' => JobCard::where('status', 'completed')->count(),
            'cancelled' => JobCard::where('status', 'cancelled')->count(),
        ];

        $completedServices = JobCard::with([
            'customer:id,full_name,phone',
            'mechanicAssignments.mechanic:id,name',
            'repairOrders' => fn($q) => $q->select('id', 'job_card_id', 'total_cost'),
            'servicePackages' => fn($q) => $q->select('service_packages.id', 'name'),
        ])
            ->where('status', 'completed')
            ->latest('updated_at')
            ->take(10)
            ->get()
            ->map(fn($job) => [
                'id' => $job->id,
                'job_number' => $job->job_number,
                'customer_name' => $job->customer?->full_name,
                'customer_phone' => $job->customer?->phone,
                'vehicle_name' => $job->vehicle_name,
                'vehicle_plate' => $job->vehicle_plate,
                'mechanic_name' => $job->mechanicAssignments->first()?->mechanic?->name,
                'total_cost' => (float) $job->repairOrders->sum('total_cost'),
                'services' => $job->servicePackages->pluck('name')->toArray(),
                'completed_at' => $job->updated_at->format('Y-m-d H:i'),
            ]);

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'totalRevenue' => $totalRevenue,
                'todayRevenue' => $todayRevenue,
                'todayOrders' => $todayOrders,
                'yesterdayOrders' => $yesterdayOrders,
                'totalOrders' => $totalOrders,
                'totalProducts' => Product::count(),
                'totalCustomers' => Customer::count(),
                'totalVehicles' => Vehicle::count(),
                'totalBookings' => Booking::count(),
            ],
            'weeklySales' => $weeklySales,
            'salesAnalytic' => $salesAnalytic,
            'bestSellers' => $bestSellers,
            'recentOrders' => $recentOrders,
            'serviceStats' => $serviceStats,
            'completedServices' => $completedServices,
        ]);
    }

    public function staff()
    {
        return Inertia::render('staff/dashboard', [
            'stats' => [
                'todayBookings' => Booking::whereDate('booking_date', today())->count(),
                'pendingBookings' => Booking::where('status', 'pending')->count(),
                'servicePackages' => ServicePackage::count(),
                'totalVehicles' => Vehicle::count(),
            ],
        ]);
    }

    public function customer(Request $request)
    {
        $user = $request->user();
        $customer = $user->customer;

        $orders = $customer
            ? Order::where('customer_id', $customer->id)
                ->with(['items' => function ($q) {
                    $q->with(['product' => function ($pq) {
                        $pq->with(['images' => function ($iq) { $iq->orderBy('sort_order'); }]);
                    }]);
                }])
                ->latest()
                ->get(['id', 'order_number', 'total', 'payment_status', 'order_status', 'created_at'])
            : collect();

        $wishlistItems = $customer
            ? $customer->wishlists()->with(['product' => function ($q) {
                $q->with(['images' => function ($iq) { $iq->orderBy('sort_order'); }]);
            }])->latest()->get()
            : collect();

        $allCategories = Category::where('status', true)
            ->get(['id', 'name', 'slug', 'image', 'description']);

        $sessionCart = $request->session()->get('cart', []);
        $cartItems = collect($sessionCart)->values()->map(fn ($item, $i) => [
            'id' => $item['product_id'] + 1000,
            'product_id' => $item['product_id'],
            'quantity' => (int) $item['quantity'],
            'product' => [
                'id' => $item['product_id'],
                'name' => $item['name'],
                'slug' => $item['slug'],
                'selling_price' => (float) $item['selling_price'],
                'discount_type' => $item['discount_type'] ?? null,
                'discount_value' => (float) ($item['discount_value'] ?? 0),
            ],
        ]);

        return Inertia::render('my-account', [
            'customerData' => $customer ? $customer->only(['full_name', 'email', 'phone', 'address', 'loyalty_points', 'wallet_balance']) : null,
            'orders' => $orders->map(fn ($o) => [
                'id' => $o->id,
                'order_number' => $o->order_number,
                'total' => (float) $o->total,
                'payment_status' => $o->payment_status,
                'order_status' => $o->order_status,
                'created_at' => $o->created_at->toDateTimeString(),
                'items_count' => $o->items->count(),
                'items' => $o->items->map(fn ($item) => [
                    'id' => $item->id,
                    'product_name' => $item->product->name,
                    'slug' => $item->product->slug,
                    'quantity' => $item->quantity,
                    'price' => (float) $item->price,
                    'total' => (float) $item->total,
                    'image' => ($img = $item->product->images()->first()) ? '/storage/'.$img->image : null,
                ]),
            ]),
            'wishlistItems' => $wishlistItems->map(fn ($w) => [
                'id' => $w->id,
                'product_id' => $w->product_id,
                'product' => $w->product ? [
                    'id' => $w->product->id,
                    'name' => $w->product->name,
                    'slug' => $w->product->slug,
                    'selling_price' => (float) $w->product->selling_price,
                    'discount_type' => $w->product->discount_type,
                    'discount_value' => (float) $w->product->discount_value,
                    'image' => ($img = $w->product->images()->first()) ? '/storage/'.$img->image : null,
                ] : null,
            ]),
            'cartItems' => $cartItems,
            'allCategories' => $allCategories,
        ]);
    }

    public function showOrder(Request $request, $id)
    {
        $customer = $request->user()->customer;

        if (!$customer) {
            return redirect()->route('my-account')->with('error', 'Order not found.');
        }

        $order = Order::with(['items.product' => function ($q) {
            $q->with(['images' => function ($iq) { $iq->orderBy('sort_order'); }]);
        }])->where('customer_id', $customer->id)->findOrFail($id);

        return Inertia::render('my-order', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'subtotal' => (float) $order->subtotal,
                'discount' => (float) $order->discount,
                'tax' => (float) $order->tax,
                'shipping_fee' => (float) $order->shipping_fee,
                'total' => (float) $order->total,
                'payment_status' => $order->payment_status,
                'order_status' => $order->order_status,
                'created_at' => $order->created_at->format('Y-m-d H:i:s'),
                'items' => $order->items->map(fn($item) => [
                    'id' => $item->id,
                    'product_name' => $item->product->name ?? 'Unknown',
                    'quantity' => $item->quantity,
                    'unit_price' => (float) $item->unit_price,
                    'total' => (float) $item->total,
                    'image' => ($img = $item->product->images()->first()) ? '/storage/'.$img->image : null,
                ]),
            ],
        ]);
    }

    public function updateProfile(Request $request)
    {
        $customer = $request->user()->customer;

        if (!$customer) {
            return redirect()->back()->withErrors(['message' => 'Customer profile not found.']);
        }

        $validated = $request->validate([
            'full_name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'email', 'max:255', Rule::unique('customers', 'email')->ignore($customer->id)],
            'phone' => ['nullable', 'string', 'max:20'],
            'address' => ['nullable', 'string', 'max:500'],
        ]);

        $customer->update($validated);

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }
}
