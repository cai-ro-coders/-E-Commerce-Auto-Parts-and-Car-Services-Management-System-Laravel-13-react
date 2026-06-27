<?php

use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CouponController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\InvoiceController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\ServicePackageController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\PointOfSaleController;
use App\Http\Controllers\Admin\WorkOrderController;
use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductDetailsController;
use App\Http\Controllers\ReviewController as CustomerReviewController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\WishlistController;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ServicePackage;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/', function () {
    $servicePackages = ServicePackage::where('status', true)->get(['id', 'name', 'description', 'price', 'duration']);
    $categories = Category::where('status', true)->get(['id', 'name', 'slug', 'image', 'description']);
    $popularProducts = Product::where('status', true)
        ->with(['images' => function ($q) { $q->orderBy('sort_order'); }, 'category'])
        ->withCount('reviews')
        ->orderByDesc('reviews_count')
        ->take(8)
        ->get(['id', 'category_id', 'name', 'slug', 'description', 'selling_price', 'discount_type', 'discount_value']);
    $brands = Brand::where('status', true)->get(['id', 'name', 'slug', 'logo', 'description']);

    return inertia('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
        'servicePackages' => $servicePackages,
        'categories' => $categories,
        'popularProducts' => $popularProducts,
        'brands' => $brands,
    ]);
})->name('home');

Route::get('/about-us', fn () => inertia('about-us'))->name('about-us');
Route::get('/contact-us', fn () => inertia('contact-us'))->name('contact-us');
Route::get('/search', [SearchController::class, 'index'])->name('search');

Route::get('/book-an-appointment', [BookingController::class, 'create'])->name('book-an-appointment');
Route::post('/book-an-appointment', [BookingController::class, 'store']);

Route::get('/collections/{slug}', [CollectionController::class, 'index'])->name('collections.index');
Route::get('/product-details/{slug}', [ProductDetailsController::class, 'show'])->name('product-details.show');
Route::get('/customer/login', fn () => inertia('customer-login', ['canRegister' => Features::enabled(Features::registration())]))->name('customer.login');

Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
Route::post('/cart/remove/{productId}', [CartController::class, 'remove'])->name('cart.remove');
Route::post('/cart/update-quantity/{productId}', [CartController::class, 'updateQuantity'])->name('cart.update-quantity');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'admin'])->name('admin.dashboard');
        Route::get('products/export', [ProductController::class, 'export'])->name('admin.products.export');
        Route::resource('products', ProductController::class)->names('admin.products');

        Route::get('orders/export', [OrderController::class, 'export'])->name('admin.orders.export');
        Route::get('orders/{order}/tracking', [OrderController::class, 'tracking'])->name('admin.orders.tracking');
        Route::get('orders/{order}/print-receipt', [OrderController::class, 'printReceipt'])->name('admin.orders.print-receipt');
        Route::resource('orders', OrderController::class)->names('admin.orders');

        Route::resource('customers', CustomerController::class)->names('admin.customers');

        Route::resource('categories', CategoryController::class)->names('admin.categories');

        Route::resource('brands', BrandController::class)->names('admin.brands');

        Route::resource('coupons', CouponController::class)->names('admin.coupons');

        Route::resource('reviews', ReviewController::class)->names('admin.reviews');

        Route::resource('employees', EmployeeController::class)->names('admin.employees');

        Route::resource('services', ServicePackageController::class)->names('admin.services');

        Route::post('work-orders/{work_order}/add-part', [WorkOrderController::class, 'addPart'])->name('admin.work-orders.add-part');
        Route::post('work-orders/{work_order}/update-notes', [WorkOrderController::class, 'updateNotes'])->name('admin.work-orders.update-notes');
        Route::post('work-orders/{work_order}/update-status', [WorkOrderController::class, 'updateStatus'])->name('admin.work-orders.update-status');
        Route::post('work-orders/{work_order}/generate-invoice', [WorkOrderController::class, 'generateInvoice'])->name('admin.work-orders.generate-invoice');
        Route::resource('work-orders', WorkOrderController::class)->names('admin.work-orders');
        Route::get('invoices/{invoice}/print', [InvoiceController::class, 'printInvoice'])->name('admin.invoices.print');
        Route::resource('invoices', InvoiceController::class)->names('admin.invoices');
        Route::get('point-of-sales', [PointOfSaleController::class, 'index'])->name('admin.point-of-sales.index');
        Route::post('point-of-sales', [PointOfSaleController::class, 'store'])->name('admin.point-of-sales.store');

        Route::resource('bookings', AdminBookingController::class)->names('admin.bookings');

        Route::resource('settings', SettingController::class)->names('admin.settings');
    });

    Route::middleware('role:staff')->prefix('staff')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'staff'])->name('staff.dashboard');
    });

    Route::middleware('role:customer')->group(function () {
        Route::get('my-account', [DashboardController::class, 'customer'])->name('my-account');
        Route::put('my-account/update', [DashboardController::class, 'updateProfile'])->name('my-account.update');
        Route::get('orders/{order}', [DashboardController::class, 'showOrder'])->name('orders.show');
    });

    Route::get('/checkout', [CheckoutController::class, 'create'])->name('checkout');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');
    Route::post('/wishlist/toggle/{product}', [WishlistController::class, 'toggle'])->name('wishlist.toggle');

    Route::get('redirect-dashboard', function () {
        return redirect()->to(match (request()->user()->role) {
            'admin' => '/admin/dashboard',
            'staff' => '/staff/dashboard',
            default => '/my-account',
        });
    })->name('redirect-dashboard');

    Route::get('dashboard', fn () => redirect()->route('redirect-dashboard'));

    Route::post('/reviews', [CustomerReviewController::class, 'store'])->name('reviews.store');
});

require __DIR__.'/settings.php';
