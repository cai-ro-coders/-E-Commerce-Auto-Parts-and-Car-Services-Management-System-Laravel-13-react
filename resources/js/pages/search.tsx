import { Head, Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import LandingNavigation from '@/components/landing-navigation';
import LandingFooter from '@/components/landing-footer';
import {
    ChevronRight,
    Star,
    Search as SearchIcon,
    Wrench,
    ShoppingCart,
    Eye,
    Heart,
} from 'lucide-react';
import { useEffect, useState, useRef, type ReactNode } from 'react';

const fallbackImages = [
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583121274602-3e2820d2f5b6?auto=format&fit=crop&w=800&q=80',
];

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    description: string | null;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    selling_price: number;
    discount_type: string | null;
    discount_value: number;
    images: { image: string }[];
    category: { name: string } | null;
    brand: { name: string } | null;
    reviews_count: number;
}

function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setVisible(true), delay);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className={cn(
                'transition-all duration-700',
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            )}
        >
            {children}
        </div>
    );
}

export default function SearchPage({
    query = '',
    products = [],
    categories = [],
    allCategories = [],
}: {
    query: string;
    products: Product[];
    categories: Category[];
    allCategories: Category[];
}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [wishlist, setWishlist] = useState<number[]>([]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const hasResults = products.length > 0 || categories.length > 0;

    return (
        <>
            <Head title={`${query ? `Search: ${query}` : 'Search'} - RevAuto Care`}>
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
                            <span className="text-[#FF4D00] font-medium">{query ? `Search: ${query}` : 'Search'}</span>
                            {query && <span className="ml-auto text-[#B5B5B5]">{products.length} result{products.length !== 1 ? 's' : ''}</span>}
                        </div>
                    </div>
                </div>

                <section className="bg-[#0D0D0D] py-12">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        {!query ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <SearchIcon className="h-16 w-16 text-[#333]" />
                                <h2 className="mt-6 font-['Montserrat'] text-3xl font-bold text-white">Search Our Store</h2>
                                <p className="mt-3 font-['Inter'] text-base text-[#B5B5B5]">
                                    Use the search bar at the top of the page to find products, services, and more.
                                </p>
                            </div>
                        ) : !hasResults ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <SearchIcon className="h-16 w-16 text-[#333]" />
                                <h2 className="mt-6 font-['Montserrat'] text-3xl font-bold text-white">No Results Found</h2>
                                <p className="mt-3 font-['Inter'] text-base text-[#B5B5B5]">
                                    We couldn't find anything matching "<span className="text-[#FF4D00]">{query}</span>".
                                </p>
                                <p className="mt-1 font-['Inter'] text-sm text-[#666]">
                                    Try different keywords or browse our categories.
                                </p>
                                <Link
                                    href="/"
                                    className="mt-8 inline-flex h-12 items-center rounded-none bg-[#FF4D00] px-8 text-sm font-bold uppercase tracking-[0.15em] text-white hover:bg-[#FF4D00]/90"
                                >
                                    Browse All Categories
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-12">
                                {/* Category Matches */}
                                {categories.length > 0 && (
                                    <FadeUp>
                                        <div>
                                            <h2 className="font-['Montserrat'] text-2xl font-bold text-white mb-6">Categories</h2>
                                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                                {categories.map((cat, i) => (
                                                    <Link
                                                        key={cat.id}
                                                        href={`/collections/${cat.slug}`}
                                                        className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-lg bg-[#171717] border border-white/5 transition-all hover:-translate-y-0.5 hover:border-[#FF4D00]/20 hover:shadow-lg"
                                                    >
                                                        {cat.image && (
                                                            <img
                                                                src={`/storage/${cat.image}`}
                                                                alt={cat.name}
                                                                loading="lazy"
                                                                className="absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                                                            />
                                                        )}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-[#0D0D0D]/30 to-transparent" />
                                                        <div className="relative z-10 w-full p-5">
                                                            <h3 className="font-['Montserrat'] text-lg font-bold text-white">{cat.name}</h3>
                                                            {cat.description && (
                                                                <p className="mt-1 font-['Inter'] text-sm text-[#B5B5B5] line-clamp-1">{cat.description}</p>
                                                            )}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </FadeUp>
                                )}

                                {/* Product Matches */}
                                {products.length > 0 && (
                                    <FadeUp>
                                        <div>
                                            <h2 className="font-['Montserrat'] text-2xl font-bold text-white mb-6">Products ({products.length})</h2>
                                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                                {products.map((product, i) => (
                                                    <div
                                                        key={product.id}
                                                        className="group relative flex flex-col rounded-lg border border-white/5 bg-[#171717] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-[#FF4D00]/20 overflow-hidden"
                                                    >
                                                        <Link href={`/product-details/${product.slug}`} className="relative aspect-square overflow-hidden bg-[#0D0D0D]">
                                                            <img
                                                                src={product.images.length > 0 ? `/storage/${product.images[0].image}` : fallbackImages[i % fallbackImages.length]}
                                                                alt={product.name}
                                                                loading="lazy"
                                                                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                                                            />
                                                            {product.discount_value > 0 && (
                                                                <span className="absolute left-3 top-3 z-10 rounded-md bg-[#FF4D00] px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
                                                                    {product.discount_type === 'percentage' ? `-${product.discount_value}%` : `-$${product.discount_value}`}
                                                                </span>
                                                            )}
                                                        </Link>
                                                        <div className="flex flex-1 flex-col p-4">
                                                            {product.brand && (
                                                                <span className="font-['Inter'] text-[10px] font-semibold uppercase tracking-wider text-[#FF4D00]">{product.brand.name}</span>
                                                            )}
                                                            <Link href={`/products/${product.slug}`}>
                                                                <h3 className="mt-1 font-['Montserrat'] text-sm font-bold text-white line-clamp-2 transition-colors hover:text-[#FF4D00]">{product.name}</h3>
                                                            </Link>
                                                            <div className="mt-auto pt-3 flex items-center gap-2">
                                                                <span className="font-['Inter'] text-base font-bold text-[#FF4D00]">
                                                                    ${product.discount_value > 0
                                                                        ? (Number(product.selling_price) - (product.discount_type === 'percentage' ? Number(product.selling_price) * product.discount_value / 100 : product.discount_value)).toFixed(2)
                                                                        : Number(product.selling_price).toFixed(2)}
                                                                </span>
                                                                {product.discount_value > 0 && (
                                                                    <span className="font-['Inter'] text-sm text-[#555] line-through">${Number(product.selling_price).toFixed(2)}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </FadeUp>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                <LandingFooter />
            </div>
        </>
    );
}
