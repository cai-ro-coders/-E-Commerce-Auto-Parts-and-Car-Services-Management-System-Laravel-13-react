import { Head, Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import LandingNavigation from '@/components/landing-navigation';
import LandingFooter from '@/components/landing-footer';
import {
    ChevronRight,
    Package,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Truck,
    MapPin,
    User,
    ArrowLeft,
    CreditCard,
    ShoppingBag,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    total: number;
    image: string | null;
}

interface OrderData {
    id: number;
    order_number: string;
    subtotal: number;
    discount: number;
    tax: number;
    shipping_fee: number;
    total: number;
    payment_status: string;
    order_status: string;
    created_at: string;
    items: OrderItem[];
}

function statusColor(status: string): string {
    switch (status) {
        case 'pending': return 'text-yellow-500 bg-yellow-500/10';
        case 'processing': case 'confirmed': return 'text-blue-500 bg-blue-500/10';
        case 'shipped': return 'text-purple-500 bg-purple-500/10';
        case 'delivered': case 'completed': return 'text-green-500 bg-green-500/10';
        case 'cancelled': return 'text-red-500 bg-red-500/10';
        default: return 'text-[#666] bg-white/5';
    }
}

function statusIcon(status: string) {
    switch (status) {
        case 'pending': return AlertCircle;
        case 'processing': case 'confirmed': return Clock;
        case 'shipped': return Truck;
        case 'delivered': case 'completed': return CheckCircle;
        case 'cancelled': return XCircle;
        default: return Package;
    }
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
}

export default function MyOrder() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { order } = usePage<{ order: OrderData }>().props;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const StatusIcon = statusIcon(order.order_status);

    return (
        <>
            <Head title={`Order #${order.order_number} - RevAuto Care`}>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet" />
            </Head>

            <div className="relative min-h-screen bg-[#0D0D0D] font-['Inter'] antialiased selection:bg-[#FF4D00]/30">
                <LandingNavigation
                    isScrolled={isScrolled}
                    mobileMenuOpen={mobileMenuOpen}
                    onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
                    canRegister={false}
                    categories={[]}
                />

                {/* Breadcrumb */}
                <div className="pt-24 border-b border-white/5 bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#666]">
                            <Link href="/" className="transition-colors hover:text-white">Home</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <Link href="/my-account" className="transition-colors hover:text-white">My Account</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="text-[#FF4D00] font-medium">Order #{order.order_number}</span>
                        </div>
                    </div>
                </div>

                {/* Order Detail */}
                <section className="bg-[#0D0D0D] py-10 lg:py-14">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <div className="mb-6">
                            <Link
                                href="/my-account"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-[#B5B5B5] transition-colors hover:text-white"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to My Account
                            </Link>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-10">
                            {/* Left - Order Info */}
                            <div className="flex-1 space-y-6">
                                {/* Order Header */}
                                <div className="rounded-lg border border-white/5 bg-[#171717] p-6 lg:p-8">
                                    <div className="flex flex-wrap items-start justify-between gap-4">
                                        <div>
                                            <h1 className="font-['Montserrat'] text-2xl font-bold text-white">Order #{order.order_number}</h1>
                                            <p className="mt-1 text-sm text-[#666]">Placed on {formatDate(order.created_at)}</p>
                                        </div>
                                        <span className={cn('flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold', statusColor(order.order_status))}>
                                            <StatusIcon className="h-4 w-4" />
                                            {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                                        </span>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="rounded-lg border border-white/5 bg-[#171717] p-6 lg:p-8">
                                    <h2 className="font-['Montserrat'] text-lg font-bold text-white mb-6">Items</h2>
                                    <div className="divide-y divide-white/5">
                                        {order.items.map(item => (
                                            <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                                                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-[#0D0D0D]">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.product_name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-[#333]">
                                                            <Package className="h-6 w-6" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-white">{item.product_name}</p>
                                                    <p className="text-xs text-[#666]">Qty: {item.quantity} × ${item.unit_price.toFixed(2)}</p>
                                                </div>
                                                <p className="text-sm font-bold text-[#FF4D00]">${item.total.toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right - Order Summary */}
                            <div className="lg:w-[380px]">
                                <div className="sticky top-28 rounded-lg border border-white/5 bg-[#171717] overflow-hidden">
                                    <div className="p-6 border-b border-white/5">
                                        <div className="flex items-center gap-3">
                                            <ShoppingBag className="h-5 w-5 text-[#FF4D00]" />
                                            <h2 className="font-['Montserrat'] text-lg font-bold text-white">Order Summary</h2>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-[#666]">Subtotal</span>
                                            <span className="text-white font-medium">${order.subtotal.toFixed(2)}</span>
                                        </div>
                                        {order.discount > 0 && (
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-[#666]">Discount</span>
                                                <span className="text-green-500 font-medium">-${order.discount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-[#666]">Shipping</span>
                                            <span className="text-green-500 font-medium">{order.shipping_fee > 0 ? `$${order.shipping_fee.toFixed(2)}` : 'Free'}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-[#666]">Tax</span>
                                            <span className="text-white font-medium">${order.tax.toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                            <span className="text-base font-bold text-white">Total</span>
                                            <span className="text-xl font-bold text-[#FF4D00]">${order.total.toFixed(2)}</span>
                                        </div>
                                    </div>

                                    <div className="p-6 pt-0 space-y-4">
                                        <div className="rounded-lg border border-white/5 bg-[#0D0D0D] p-4 space-y-3">
                                            <div className="flex items-center gap-3">
                                                <CreditCard className="h-4 w-4 text-[#FF4D00]" />
                                                <div>
                                                    <p className="text-xs text-[#666]">Payment</p>
                                                    <p className={cn('text-sm font-semibold', order.payment_status === 'paid' ? 'text-green-500' : 'text-yellow-500')}>
                                                        {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Truck className="h-4 w-4 text-[#FF4D00]" />
                                                <div>
                                                    <p className="text-xs text-[#666]">Fulfillment</p>
                                                    <p className="text-sm font-semibold text-white">
                                                        {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <LandingFooter />
            </div>
        </>
    );
}
