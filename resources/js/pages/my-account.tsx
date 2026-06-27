import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import LandingNavigation from '@/components/landing-navigation';
import LandingFooter from '@/components/landing-footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    ChevronRight,
    User,
    Bell,
    ShoppingBag,
    Heart,
    MapPin,
    ShoppingCart,
    Package,
    Trash2,
    Eye,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Truck,
    Star,
    Award,
    Wallet,
    PencilLine,
    LogOut,
    Plus,
    Minus,
    ArrowRight,
    Loader2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '@/hooks/use-cart';

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    description: string | null;
}

interface OrderItem {
    id: number;
    product_name: string;
    slug: string;
    quantity: number;
    price: number;
    total: number;
    image: string | null;
}

interface Order {
    id: number;
    order_number: string;
    total: number;
    payment_status: string;
    order_status: string;
    created_at: string;
    items_count: number;
    items: OrderItem[];
}

interface WishlistItem {
    id: number;
    product_id: number;
    product: {
        id: number;
        name: string;
        slug: string;
        selling_price: number;
        discount_type: string | null;
        discount_value: number;
        image: string | null;
    } | null;
}

interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    product: {
        id: number;
        name: string;
        slug: string;
        selling_price: number;
        discount_type: string | null;
        discount_value: number;
    } | null;
}

interface CustomerData {
    full_name: string;
    email: string;
    phone: string | null;
    address: string | null;
    loyalty_points: number;
    wallet_balance: number;
}

type Section = 'details' | 'orders' | 'wishlist' | 'cart' | 'billing' | 'notifications';

const navItems: { id: Section; label: string; icon: typeof User }[] = [
    { id: 'details', label: 'My Details', icon: User },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'cart', label: 'My Cart', icon: ShoppingCart },
    { id: 'billing', label: 'Billing Address', icon: MapPin },
    { id: 'notifications', label: 'Notifications', icon: Bell },
];

function calcPrice(p: { selling_price: number; discount_type: string | null; discount_value: number }): number {
    if (p.discount_value > 0) {
        if (p.discount_type === 'percentage') {
            return Number(p.selling_price) - (Number(p.selling_price) * p.discount_value / 100);
        }
        return Number(p.selling_price) - p.discount_value;
    }
    return Number(p.selling_price);
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
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function MyAccount() {
    const { auth } = usePage<{ auth: { user: { name: string; email: string } } }>().props;
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<Section>('details');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const page = usePage<{
        customerData: {
            full_name: string;
            email: string;
            phone: string | null;
            address: string | null;
            loyalty_points: number;
            wallet_balance: number;
        } | null;
        orders: Order[];
        wishlistItems: WishlistItem[];
        cartItems: CartItem[];
        allCategories: Category[];
    }>().props;

    const { customerData, orders, wishlistItems, cartItems, allCategories } = page;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);

    const activeIcon = navItems.find(n => n.id === activeSection)?.icon || User;
    const ActiveIcon = activeIcon;
    const activeLabel = navItems.find(n => n.id === activeSection)?.label || '';

    function renderSection() {
        switch (activeSection) {
            case 'details': return <DetailsSection customerData={customerData} />;
            case 'orders': return <OrdersSection orders={orders} />;
            case 'wishlist': return <WishlistSection items={wishlistItems} />;
            case 'cart': return <CartSection />;
            case 'billing': return <BillingSection customerData={customerData} />;
            case 'notifications': return <NotificationsSection />;
        }
    }

    return (
        <>
            <Head title="My Account - RevAuto Care">
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
                    categories={allCategories}
                />

                {/* Breadcrumb */}
                <div className="pt-24 border-b border-white/5 bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#666]">
                            <Link href="/" className="transition-colors hover:text-white">Home</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="text-[#FF4D00] font-medium">My Account</span>
                        </div>
                    </div>
                </div>

                {/* Mobile sidebar toggle */}
                <div className="lg:hidden mx-auto max-w-[1440px] px-6 pt-6">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="flex w-full items-center gap-3 rounded-lg border border-white/10 bg-[#171717] px-4 py-3 text-sm font-semibold text-[#B5B5B5] hover:text-white"
                    >
                        <ActiveIcon className="h-4 w-4 text-[#FF4D00]" />
                        {activeLabel}
                        <ChevronRight className="ml-auto h-4 w-4" />
                    </button>
                </div>

                {/* Mobile sidebar overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 lg:hidden">
                        <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
                        <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#0D0D0D] border-r border-white/5 overflow-y-auto">
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4D00]/10 text-sm font-bold text-[#FF4D00]">
                                        {(customerData?.full_name || auth.user.name).charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">{customerData?.full_name || auth.user.name}</p>
                                        <p className="text-xs text-[#666]">{customerData?.email || auth.user.email}</p>
                                    </div>
                                </div>
                                <SidebarNav active={activeSection} onSelect={(s) => { setActiveSection(s); setSidebarOpen(false); }} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <section className="bg-[#0D0D0D] py-10 lg:py-14">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <div className="flex gap-10">
                            {/* Desktop Sidebar */}
                            <aside className="hidden lg:block w-64 flex-shrink-0">
                                <div className="sticky top-28 rounded-lg border border-white/5 bg-[#171717] overflow-hidden">
                                    {/* User info header */}
                                    <div className="p-5 border-b border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FF4D00]/10 text-base font-bold text-[#FF4D00]">
                                                {(customerData?.full_name || auth.user.name).charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-white truncate">{customerData?.full_name || auth.user.name}</p>
                                                <p className="text-xs text-[#666] truncate">{customerData?.email || auth.user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <SidebarNav active={activeSection} onSelect={setActiveSection} />
                                </div>
                            </aside>

                            {/* Content Area */}
                            <div className="flex-1 min-w-0">
                                <div className="rounded-lg border border-white/5 bg-[#171717] p-6 lg:p-8">
                                    {renderSection()}
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

function SidebarNav({ active, onSelect }: { active: Section; onSelect: (s: Section) => void }) {
    return (
        <nav className="p-3 space-y-1">
            {navItems.map(item => {
                const Icon = item.icon;
                const isActive = active === item.id;
                const badge = item.id === 'orders' ? null : null;
                const count = item.id === 'wishlist'
                    ? undefined
                    : item.id === 'cart'
                    ? undefined
                    : undefined;

                return (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={cn(
                            'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all',
                            isActive
                                ? 'bg-[#FF4D00]/10 text-[#FF4D00]'
                                : 'text-[#666] hover:bg-white/5 hover:text-white'
                        )}
                    >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        <span>{item.label}</span>
                    </button>
                );
            })}

            <div className="pt-3 mt-3 border-t border-white/5">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#666] transition-colors hover:bg-red-500/10 hover:text-red-500"
                >
                    <LogOut className="h-4 w-4 flex-shrink-0" />
                    <span>Sign Out</span>
                </Link>
            </div>
        </nav>
    );
}

function DetailsSection({ customerData }: { customerData: CustomerData | null }) {
    const [open, setOpen] = useState(false);

    if (!customerData) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <User className="h-12 w-12 text-[#333]" />
                <p className="mt-4 text-[#666]">Customer profile not found.</p>
            </div>
        );
    }

    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        full_name: customerData.full_name,
        email: customerData.email,
        phone: customerData.phone || '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put('/my-account/update', {
            onSuccess: () => setOpen(false),
        });
    }

    const infoRows = [
        { label: 'Full Name', value: customerData.full_name },
        { label: 'Email', value: customerData.email },
        { label: 'Phone', value: customerData.phone || '—' },
    ];

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="font-['Montserrat'] text-xl font-bold text-white">My Details</h2>
                    <p className="mt-1 text-sm text-[#666]">Manage your personal information.</p>
                </div>
                <button
                    onClick={() => {
                        setData({
                            full_name: customerData.full_name,
                            email: customerData.email,
                            phone: customerData.phone || '',
                        });
                        setOpen(true);
                    }}
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white"
                >
                    <PencilLine className="h-4 w-4" />
                    Edit
                </button>
            </div>

            <div className="space-y-5">
                {infoRows.map(row => (
                    <div key={row.label} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 pb-4 border-b border-white/5 last:border-0">
                        <span className="text-sm font-medium text-[#666] w-32 flex-shrink-0">{row.label}</span>
                        <span className="text-sm text-white">{row.value}</span>
                    </div>
                ))}
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-lg border border-white/5 bg-[#0D0D0D] p-5">
                    <div className="flex items-center gap-3">
                        <Award className="h-5 w-5 text-[#FF4D00]" />
                        <div>
                            <p className="text-xs text-[#666]">Loyalty Points</p>
                            <p className="text-lg font-bold text-white">{customerData.loyalty_points}</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg border border-white/5 bg-[#0D0D0D] p-5">
                    <div className="flex items-center gap-3">
                        <Wallet className="h-5 w-5 text-[#FF4D00]" />
                        <div>
                            <p className="text-xs text-[#666]">Wallet Balance</p>
                            <p className="text-lg font-bold text-white">${Number(customerData.wallet_balance).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="border border-white/10 bg-[#171717] text-white sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-['Montserrat'] text-lg font-bold text-white">Edit Details</DialogTitle>
                        <DialogDescription className="text-[#666]">Update your personal information.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-[#666]">Full Name</label>
                                <Input
                                    value={data.full_name}
                                    onChange={e => setData('full_name', e.target.value)}
                                    className="border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                />
                                {errors.full_name && <p className="text-xs text-red-500">{errors.full_name}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-[#666]">Email</label>
                                <Input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-[#666]">Phone</label>
                                <Input
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                />
                                {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="border-white/10 text-[#B5B5B5] hover:bg-white/5 hover:text-white"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-[#FF4D00] text-white hover:bg-[#FF4D00]/90"
                            >
                                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function OrdersSection({ orders }: { orders: Order[] }) {
    if (!orders.length) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <ShoppingBag className="h-12 w-12 text-[#333]" />
                <h3 className="mt-4 font-['Montserrat'] text-lg font-bold text-white">No Orders Yet</h3>
                <p className="mt-2 text-sm text-[#666]">Start shopping to see your orders here.</p>
                <Link href="/collections/all" className="mt-6 inline-flex h-11 items-center rounded-lg bg-[#FF4D00] px-6 text-sm font-bold uppercase tracking-[0.1em] text-white hover:bg-[#FF4D00]/90">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="font-['Montserrat'] text-xl font-bold text-white">My Orders</h2>
                <p className="mt-1 text-sm text-[#666]">Track and manage your orders.</p>
            </div>

            <div className="space-y-4">
                {orders.map(order => {
                    const StatusIcon = statusIcon(order.order_status);
                    return (
                        <div key={order.id} className="rounded-lg border border-white/5 bg-[#0D0D0D] overflow-hidden">
                            <div className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-white/5">
                                <div>
                                    <p className="text-sm font-semibold text-white">{order.order_number}</p>
                                    <p className="text-xs text-[#666] mt-0.5">{formatDate(order.created_at)}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={cn('flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold', statusColor(order.order_status))}>
                                        <StatusIcon className="h-3 w-3" />
                                        {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                                    </span>
                                    <span className="text-sm font-bold text-[#FF4D00]">${order.total.toFixed(2)}</span>
                                </div>
                            </div>
                            <div className="p-5">
                                <div className="flex flex-wrap gap-3">
                                    {order.items.slice(0, 4).map(item => (
                                        <Link key={item.id} href={`/product-details/${item.slug}`} className="flex items-center gap-3 group">
                                            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-[#171717]">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.product_name} className="h-full w-full object-cover transition-all duration-300 group-hover:scale-110" />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-[#333]">
                                                        <Package className="h-5 w-5" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-white truncate max-w-[120px] transition-colors group-hover:text-[#FF4D00]">{item.product_name}</p>
                                                <p className="text-xs text-[#666]">x{item.quantity}</p>
                                            </div>
                                        </Link>
                                    ))}
                                    {order.items_count > 4 && (
                                        <div className="flex items-center text-xs text-[#666]">+{order.items_count - 4} more</div>
                                    )}
                                </div>
                                <div className="mt-3">
                                    <Link
                                        href={`/orders/${order.id}`}
                                        className="text-xs font-semibold text-[#FF4D00] hover:underline"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function WishlistSection({ items }: { items: WishlistItem[] }) {
    if (!items.length) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <Heart className="h-12 w-12 text-[#333]" />
                <h3 className="mt-4 font-['Montserrat'] text-lg font-bold text-white">Your Wishlist is Empty</h3>
                <p className="mt-2 text-sm text-[#666]">Save your favorite products for later.</p>
                <Link href="/collections/all" className="mt-6 inline-flex h-11 items-center rounded-lg bg-[#FF4D00] px-6 text-sm font-bold uppercase tracking-[0.1em] text-white hover:bg-[#FF4D00]/90">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="font-['Montserrat'] text-xl font-bold text-white">Wishlist ({items.length})</h2>
                <p className="mt-1 text-sm text-[#666]">Products you've saved for later.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map(wi => {
                    if (!wi.product) return null;
                    const salePrice = calcPrice(wi.product);
                    const hasDiscount = wi.product.discount_value > 0;
                    return (
                        <div key={wi.id} className="group relative flex flex-col rounded-lg border border-white/5 bg-[#0D0D0D] overflow-hidden transition-all hover:-translate-y-0.5 hover:border-[#FF4D00]/20">
                            <Link href={`/product-details/${wi.product.slug}`} className="relative aspect-square overflow-hidden">
                                {wi.product.image ? (
                                    <img src={wi.product.image} alt={wi.product.name} className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110" />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-[#171717] text-[#333]">
                                        <Package className="h-8 w-8" />
                                    </div>
                                )}
                                {hasDiscount && (
                                    <span className="absolute left-3 top-3 rounded-md bg-[#FF4D00] px-2 py-1 text-[10px] font-bold text-white">
                                        {wi.product.discount_type === 'percentage' ? `-${wi.product.discount_value}%` : `-$${wi.product.discount_value}`}
                                    </span>
                                )}
                            </Link>
                            <div className="flex flex-1 flex-col p-4">
                                <Link href={`/product-details/${wi.product.slug}`}>
                                    <h3 className="font-['Montserrat'] text-xs font-bold text-white line-clamp-2 transition-colors hover:text-[#FF4D00]">{wi.product.name}</h3>
                                </Link>
                                <div className="mt-auto pt-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-[#FF4D00]">${salePrice.toFixed(2)}</span>
                                        {hasDiscount && <span className="text-xs text-[#555] line-through">${Number(wi.product.selling_price).toFixed(2)}</span>}
                                    </div>
                                    <button className="flex h-8 w-8 items-center justify-center rounded-md bg-[#FF4D00]/10 text-[#FF4D00] transition-colors hover:bg-[#FF4D00]/20">
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function CartSection() {
    const { items, count, subtotal, removeItem, updateQuantity } = useCart();

    if (!items.length) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <ShoppingCart className="h-12 w-12 text-[#333]" />
                <h3 className="mt-4 font-['Montserrat'] text-lg font-bold text-white">Your Cart is Empty</h3>
                <p className="mt-2 text-sm text-[#666]">Add products to get started.</p>
                <Link href="/collections/all" className="mt-6 inline-flex h-11 items-center rounded-lg bg-[#FF4D00] px-6 text-sm font-bold uppercase tracking-[0.1em] text-white hover:bg-[#FF4D00]/90">
                    Shop Now
                </Link>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="font-['Montserrat'] text-xl font-bold text-white">My Cart ({count})</h2>
                    <p className="mt-1 text-sm text-[#666]">Review and manage your cart items.</p>
                </div>
                <span className="text-lg font-bold text-[#FF4D00]">${subtotal.toFixed(2)}</span>
            </div>

            <div className="space-y-3">
                {items.map(ci => (
                    <div key={ci.product_id} className="flex items-center gap-4 rounded-lg border border-white/5 bg-[#0D0D0D] p-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-[#171717]">
                            {ci.image ? (
                                <img src={ci.image} alt={ci.name} className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-[#333]">
                                    <Package className="h-6 w-6" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <Link href={`/product-details/${ci.slug}`} className="text-sm font-semibold text-white hover:text-[#FF4D00] transition-colors">
                                {ci.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm font-bold text-[#FF4D00]">${ci.price.toFixed(2)}</span>
                                {ci.discount_value > 0 && <span className="text-xs text-[#555] line-through">${ci.selling_price.toFixed(2)}</span>}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center rounded-md border border-white/10">
                                <button
                                    onClick={() => updateQuantity(ci.product_id, ci.quantity - 1)}
                                    disabled={ci.quantity <= 1}
                                    className="flex h-8 w-8 items-center justify-center text-[#666] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                ><Minus className="h-3 w-3" /></button>
                                <span className="flex h-8 w-10 items-center justify-center text-xs font-semibold text-white border-x border-white/10">{ci.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(ci.product_id, ci.quantity + 1)}
                                    className="flex h-8 w-8 items-center justify-center text-[#666] hover:text-white"
                                ><Plus className="h-3 w-3" /></button>
                            </div>
                            <button
                                onClick={() => removeItem(ci.product_id)}
                                className="flex h-8 w-8 items-center justify-center text-[#666] hover:text-[#FF4D00] transition-colors"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                            <span className="text-sm font-bold text-white w-16 text-right">${(ci.price * ci.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end">
                <Link
                    href="/checkout"
                    className="inline-flex h-12 items-center gap-2 rounded-lg bg-[#FF4D00] px-8 text-sm font-bold uppercase tracking-[0.1em] text-white hover:bg-[#FF4D00]/90"
                >
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}

function BillingSection({ customerData }: { customerData: CustomerData | null }) {
    const [open, setOpen] = useState(false);

    if (!customerData) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <MapPin className="h-12 w-12 text-[#333]" />
                <p className="mt-4 text-[#666]">No billing information available.</p>
            </div>
        );
    }

    const { data, setData, put, processing, errors } = useForm({
        address: customerData.address || '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put('/my-account/update', {
            onSuccess: () => setOpen(false),
        });
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="font-['Montserrat'] text-xl font-bold text-white">Billing Address</h2>
                    <p className="mt-1 text-sm text-[#666]">Manage your billing and shipping address.</p>
                </div>
                <button
                    onClick={() => {
                        setData('address', customerData.address || '');
                        setOpen(true);
                    }}
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white"
                >
                    <PencilLine className="h-4 w-4" />
                    Edit
                </button>
            </div>

            <div className="rounded-lg border border-white/5 bg-[#0D0D0D] p-6">
                <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-[#FF4D00] mt-0.5" />
                    <div>
                        <p className="text-sm font-semibold text-white">{customerData.full_name}</p>
                        {customerData.address ? (
                            <p className="mt-2 text-sm text-[#B5B5B5] leading-relaxed">{customerData.address}</p>
                        ) : (
                            <p className="mt-2 text-sm text-[#666] italic">No address set. Please add your billing address.</p>
                        )}
                        <p className="mt-2 text-sm text-[#B5B5B5]">{customerData.phone || 'No phone number'}</p>
                        <p className="mt-1 text-sm text-[#B5B5B5]">{customerData.email}</p>
                    </div>
                </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="border border-white/10 bg-[#171717] text-white sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="font-['Montserrat'] text-lg font-bold text-white">Edit Billing Address</DialogTitle>
                        <DialogDescription className="text-[#666]">Update your billing and shipping address.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-[#666]">Address</label>
                                <textarea
                                    value={data.address}
                                    onChange={e => setData('address', e.target.value)}
                                    rows={4}
                                    className="flex w-full rounded-md border border-white/10 bg-[#0D0D0D] px-3 py-2 text-sm text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0 focus-visible:outline-none"
                                />
                                {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                className="border-white/10 text-[#B5B5B5] hover:bg-white/5 hover:text-white"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-[#FF4D00] text-white hover:bg-[#FF4D00]/90"
                            >
                                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Save Changes'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function NotificationsSection() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <Bell className="h-12 w-12 text-[#333]" />
            <h3 className="mt-4 font-['Montserrat'] text-lg font-bold text-white">No Notifications</h3>
            <p className="mt-2 text-sm text-[#666]">You're all caught up! Check back later for updates on your orders and account.</p>
        </div>
    );
}
