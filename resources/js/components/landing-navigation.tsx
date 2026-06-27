import { Link, usePage } from '@inertiajs/react';
import { register } from '@/routes';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCart } from '@/hooks/use-cart';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuContent,
    NavigationMenuTrigger,
    NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import {
    Search,
    Heart,
    User,
    ShoppingCart,
    Menu,
    X,
    Wrench,
    Trash2,
    Plus,
    Minus,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function LandingNavigation({
    isScrolled,
    mobileMenuOpen,
    onToggleMobileMenu,
    canRegister,
    categories = [],
    onSearch,
}: {
    isScrolled: boolean;
    mobileMenuOpen: boolean;
    onToggleMobileMenu: () => void;
    canRegister: boolean;
    categories?: { id: number; name: string; slug: string; image: string | null; description: string | null }[];
    onSearch?: (query: string) => void;
}) {
    const { auth } = usePage().props as { auth: { user: unknown | null } };
    const { wishlistItems: wishlistPopupItems, count: wishlistCount, toggleWishlist: toggleWishlistPopup } = useWishlist();
    const { items: cartItems, count: cartCount, subtotal: cartSubtotal, refresh: refreshCart, removeItem, updateQuantity } = useCart();
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [cartOpen, setCartOpen] = useState(false);
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchOpen) {
            searchInputRef.current?.focus();
            setSearchQuery('');
        }
    }, [searchOpen]);

    useEffect(() => {
        if (!searchOpen && !cartOpen) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSearchOpen(false);
                setCartOpen(false);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [searchOpen, cartOpen]);

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 right-0 left-0 z-50 transition-all duration-300 bg-[#0D0D0D]/95 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl',
                    isScrolled ? 'shadow-[0_1px_0_rgba(255,77,0,0.15)]' : ''
                )}
                style={{ height: isScrolled ? '64px' : '88px' }}
            >
                <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 lg:px-12">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center bg-[#FF4D00]">
                            <Wrench className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-['Montserrat'] text-lg font-bold tracking-tight text-white">
                            REV<span className="text-[#FF4D00]">AUTO</span>
                            <span className="ml-1 text-xs font-normal tracking-normal text-[#666]">CARE</span>
                        </span>
                    </Link>

                    <div className="hidden items-center gap-2 lg:flex">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-transparent text-[#B5B5B5] hover:bg-white/5 hover:text-white data-[state=open]:bg-white/5 data-[state=open]:text-white text-xs uppercase tracking-[0.15em] font-semibold">
                                        Shop All Categories
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="grid w-[500px] grid-cols-2 gap-3 p-4 bg-[#0D0D0D] border border-white/10">
                                            {categories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={`/collections/${cat.slug}`}
                                                    className="flex items-center gap-3 rounded-sm p-2 transition-colors hover:bg-white/5 group"
                                                >
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden bg-[#171717]">
                                                        {cat.image ? (
                                                            <img
                                                                src={`/storage/${cat.image}`}
                                                                alt={cat.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <Wrench className="h-5 w-5 text-[#FF4D00]" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="block text-sm font-semibold text-white group-hover:text-[#FF4D00]">{cat.name}</span>
                                                        {cat.description && (
                                                            <span className="block text-xs text-[#666] line-clamp-1">{cat.description}</span>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link
                                        href="/book-an-appointment"
                                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white"
                                    >
                                        Book an Appointment
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link
                                        href="/about-us"
                                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white"
                                    >
                                        About Us
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link
                                        href="/contact-us"
                                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white"
                                    >
                                        Contact Us
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="flex h-10 w-10 items-center justify-center rounded-sm text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white"
                        >
                            <Search className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setWishlistOpen(true)}
                            className="relative flex h-10 w-10 items-center justify-center rounded-sm text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white"
                        >
                            <Heart className="h-4 w-4" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center bg-[#FF4D00] text-[10px] font-bold text-white">
                                    {wishlistCount}
                                </span>
                            )}
                        </button>
                        {auth.user ? (
                            <Link href="/redirect-dashboard" className="flex h-10 w-10 items-center justify-center rounded-sm text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white">
                                <User className="h-4 w-4" />
                            </Link>
                        ) : (
                            <Link href="/customer/login" className="flex h-10 w-10 items-center justify-center rounded-sm text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white">
                                <User className="h-4 w-4" />
                            </Link>
                        )}
                        <button
                            onClick={() => setCartOpen(true)}
                            className="relative flex h-10 w-10 items-center justify-center rounded-sm text-white transition-colors hover:bg-white/5"
                        >
                            <ShoppingCart className="h-4 w-4" />
                            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center bg-[#FF4D00] text-[10px] font-bold text-white">{cartCount}</span>
                        </button>
                        <button
                            onClick={onToggleMobileMenu}
                            className="flex h-10 w-10 items-center justify-center rounded-sm text-white transition-colors hover:bg-white/5 lg:hidden"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {searchOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
                        <div className="relative w-full max-w-3xl px-6">
                            <div className="relative">
                                <Search className="pointer-events-none absolute left-6 top-1/2 h-8 w-8 -translate-y-1/2 text-[#FF4D00]" />
                                <Input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' && searchQuery.trim()) {
                                            setSearchOpen(false);
                                            if (onSearch) {
                                                onSearch(searchQuery.trim());
                                            } else {
                                                window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
                                            }
                                        }
                                    }}
                                    placeholder="Search services, products, brands..."
                                    className="h-20 w-full border border-white/10 bg-[#171717] pl-20 pr-16 font-['Inter'] text-xl text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0 rounded-none"
                                />
                                <button
                                    onClick={() => setSearchOpen(false)}
                                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-sm text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <p className="mt-4 font-['Inter'] text-sm text-[#666] text-center">
                                Press <kbd className="rounded border border-white/10 bg-[#171717] px-2 py-0.5 text-xs text-[#B5B5B5]">ENTER</kbd> to search or <kbd className="rounded border border-white/10 bg-[#171717] px-2 py-0.5 text-xs text-[#B5B5B5]">ESC</kbd> to close
                            </p>
                        </div>
                    </div>
                )}

                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full border-t border-white/10 bg-[#0D0D0D] px-6 py-6 lg:hidden">
                        <nav className="flex flex-col gap-4">
                            {['Services'].map((item) => (
                                <a key={item} href="#" className="text-sm font-semibold uppercase tracking-[0.15em] text-[#B5B5B5] transition-colors hover:text-white">{item}</a>
                            ))}
                            <a href="/about-us" className="text-sm font-semibold uppercase tracking-[0.15em] text-[#B5B5B5] transition-colors hover:text-white">About Us</a>
                            <a href="/contact-us" className="text-sm font-semibold uppercase tracking-[0.15em] text-[#B5B5B5] transition-colors hover:text-white">Contact Us</a>
                            <a href="/book-an-appointment" className="text-sm font-semibold uppercase tracking-[0.15em] text-[#B5B5B5] transition-colors hover:text-white">Book an Appointment</a>
                            <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                                {!auth.user && (
                                    <>
                                        <Link href="/customer/login" className="flex-1 text-center text-sm font-semibold text-white">Log In</Link>
                                        {canRegister && (
                                            <Link href={register()} className="flex-1 rounded-none bg-[#FF4D00] px-4 py-2 text-center text-sm font-semibold text-white">Register</Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            {wishlistOpen && (
                <>
                    <div
                        className="fixed inset-0 z-[90] bg-[#0D0D0D]/60 backdrop-blur-sm"
                        onClick={() => setWishlistOpen(false)}
                    />
                    <div
                        className="fixed top-0 right-0 z-[95] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0D0D0D] shadow-2xl"
                        style={{ animation: 'cartSlideIn 0.3s ease-out' }}
                    >
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                            <h2 className="font-['Montserrat'] text-lg font-bold text-white">Wishlist ({wishlistCount})</h2>
                            <button
                                onClick={() => setWishlistOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-sm text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-8">
                            {wishlistPopupItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Heart className="h-12 w-12 text-[#333]" />
                                    <p className="mt-4 font-['Inter'] text-sm text-[#666]">Your wishlist is empty</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {wishlistPopupItems.map(wi => {
                                        if (!wi.product) return null;
                                        const salePrice = wi.product.discount_value > 0
                                            ? (wi.product.discount_type === 'percentage'
                                                ? wi.product.selling_price - (wi.product.selling_price * wi.product.discount_value / 100)
                                                : wi.product.selling_price - wi.product.discount_value)
                                            : wi.product.selling_price;
                                        return (
                                            <div key={wi.id} className="flex gap-4 border-b border-white/5 pb-4">
                                                <Link
                                                    href={`/product-details/${wi.product.slug}`}
                                                    onClick={() => setWishlistOpen(false)}
                                                    className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden bg-[#171717]"
                                                >
                                                    {wi.product.image ? (
                                                        <img src={wi.product.image} alt={wi.product.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <Wrench className="h-6 w-6 text-[#FF4D00]" />
                                                    )}
                                                </Link>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between">
                                                        <Link
                                                            href={`/product-details/${wi.product.slug}`}
                                                            onClick={() => setWishlistOpen(false)}
                                                            className="font-['Inter'] text-sm font-semibold text-white truncate hover:text-[#FF4D00] transition-colors"
                                                        >
                                                            {wi.product.name}
                                                        </Link>
                                                        <button
                                                            onClick={() => toggleWishlistPopup(wi.product_id)}
                                                            className="ml-2 shrink-0 text-[#666] hover:text-[#FF4D00] transition-colors"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <p className="mt-0.5 font-['Inter'] text-sm text-[#FF4D00]">${salePrice.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="border-t border-white/10 px-6 py-5">
                            <Link
                                href={auth.user ? '/my-account' : '/customer/login'}
                                className="flex w-full items-center justify-center bg-[#FF4D00] px-6 py-3 font-['Inter'] text-sm font-semibold text-white transition-colors hover:bg-[#FF4D00]/90"
                                onClick={() => setWishlistOpen(false)}
                            >
                                View All Wishlist
                            </Link>
                            <button
                                onClick={() => setWishlistOpen(false)}
                                className="mt-2 flex w-full items-center justify-center px-6 py-3 font-['Inter'] text-sm text-[#B5B5B5] transition-colors hover:text-white"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </>
            )}

            {cartOpen && (
                <>
                    <div
                        className="fixed inset-0 z-[90] bg-[#0D0D0D]/60 backdrop-blur-sm"
                        onClick={() => setCartOpen(false)}
                    />
                    <div
                        className="fixed top-0 right-0 z-[95] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0D0D0D] shadow-2xl"
                        style={{ animation: 'cartSlideIn 0.3s ease-out' }}
                    >
                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                            <h2 className="font-['Montserrat'] text-lg font-bold text-white">Shopping Cart</h2>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="flex h-10 w-10 items-center justify-center rounded-sm text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-8">
                            {cartItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <ShoppingCart className="h-12 w-12 text-[#333]" />
                                    <p className="mt-4 font-['Inter'] text-sm text-[#666]">Your cart is empty</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-6">
                                        {cartItems.map((item) => (
                                            <div key={item.product_id} className="flex gap-4 border-b border-white/5 pb-4">
                                                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden bg-[#171717]">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <Wrench className="h-6 w-6 text-[#FF4D00]" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between">
                                                        <h4 className="font-['Inter'] text-sm font-semibold text-white truncate">{item.name}</h4>
                                                        <button
                                                            onClick={() => removeItem(item.product_id)}
                                                            className="ml-2 shrink-0 text-[#666] hover:text-[#FF4D00] transition-colors"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <p className="mt-0.5 font-['Inter'] text-sm text-[#FF4D00]">${item.price.toFixed(2)}</p>
                                                    <div className="mt-2 flex items-center gap-3">
                                                        <div className="flex items-center rounded-md border border-white/10">
                                                            <button
                                                                onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                                disabled={item.quantity <= 1}
                                                                className="flex h-7 w-7 items-center justify-center text-[#666] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                            <span className="flex h-7 w-8 items-center justify-center text-xs font-semibold text-white border-x border-white/10">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                                className="flex h-7 w-7 items-center justify-center text-[#666] hover:text-white"
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 space-y-3 pt-6 border-t border-white/10">
                                        <div className="flex justify-between font-['Inter'] text-sm text-[#B5B5B5]">
                                            <span>Subtotal</span>
                                            <span className="text-white">${cartSubtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between border-t border-white/10 pt-3 font-['Montserrat'] text-base font-bold text-white">
                                            <span>Total</span>
                                            <span>${cartSubtotal.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="border-t border-white/10 px-6 py-5">
                            <Link
                                href="/checkout"
                                className="flex w-full items-center justify-center bg-[#FF4D00] px-6 py-3 font-['Inter'] text-sm font-semibold text-white transition-colors hover:bg-[#FF4D00]/90"
                                onClick={() => setCartOpen(false)}
                            >
                                Checkout
                            </Link>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="mt-2 flex w-full items-center justify-center px-6 py-3 font-['Inter'] text-sm text-[#B5B5B5] transition-colors hover:text-white"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                </>
            )}

            <style>{`
                @keyframes cartSlideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
            `}</style>
        </>
    );
}
