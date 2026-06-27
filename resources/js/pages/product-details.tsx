import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCart } from '@/hooks/use-cart';
import LandingNavigation from '@/components/landing-navigation';
import LandingFooter from '@/components/landing-footer';
import {
    ChevronRight,
    Star,
    Heart,
    ShoppingCart,
    Eye,
    Minus,
    Plus,
    Share2,
    GitCompare,
    Check,
    Truck,
    ShieldCheck,
    RotateCcw,
} from 'lucide-react';
import { useEffect, useState, useRef, useCallback, type ReactNode } from 'react';

const fallbackImages = [
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583121274602-3e2820d2f5b6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
];

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    description: string | null;
}

interface ProductImage {
    id: number;
    image: string;
    sort_order: number;
}

interface Specification {
    id: number;
    specification_name: string;
    specification_value: string;
}

interface Review {
    id: number;
    rating: number;
    review: string | null;
    customer: { id: number; full_name: string } | null;
    created_at: string;
}

interface Compatibility {
    id: number;
    make: { id: number; name: string } | null;
    model: { id: number; name: string } | null;
    year_from: number | null;
    year_to: number | null;
}

interface Product {
    id: number;
    category_id: number;
    brand_id: number | null;
    sku: string;
    name: string;
    slug: string;
    description: string | null;
    selling_price: number;
    discount_type: string | null;
    discount_value: number;
    has_vehicle_compatibility: boolean;
    category: Category | null;
    brand: { id: number; name: string; slug: string } | null;
    images: ProductImage[];
    specifications: Specification[];
    compatibilities: Compatibility[];
    reviews: Review[];
    reviews_count: number;
}

interface RelatedProduct {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    description: string | null;
    selling_price: number;
    discount_type: string | null;
    discount_value: number;
    images: ProductImage[];
    category: Category | null;
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

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
    const sizeClass = size === 'lg' ? 'h-5 w-5' : size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5';
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <Star
                    key={i}
                    className={cn(
                        sizeClass,
                        i <= Math.round(rating) ? 'fill-[#FF4D00] text-[#FF4D00]' : 'fill-[#333] text-[#333]'
                    )}
                />
            ))}
        </div>
    );
}

function calcPrice(product: { selling_price: number; discount_type: string | null; discount_value: number }): number {
    if (product.discount_value > 0) {
        if (product.discount_type === 'percentage') {
            return Number(product.selling_price) - (Number(product.selling_price) * product.discount_value / 100);
        }
        return Number(product.selling_price) - product.discount_value;
    }
    return Number(product.selling_price);
}

function InteractiveStarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(i => (
                <button
                    key={i}
                    type="button"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => onChange(i)}
                    className="transition-transform hover:scale-110"
                >
                    <Star
                        className={cn(
                            'h-7 w-7',
                            i <= (hovered || value) ? 'fill-[#FF4D00] text-[#FF4D00]' : 'text-[#444]'
                        )}
                    />
                </button>
            ))}
        </div>
    );
}

export default function ProductDetailsPage({
    product,
    relatedProducts = [],
    allCategories = [],
    avgRating = 0,
    canReview = false,
    hasReviewed = false,
}: {
    product: Product;
    relatedProducts: RelatedProduct[];
    allCategories: Category[];
    avgRating: number;
    canReview: boolean;
    hasReviewed: boolean;
}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'reviews'>('description');
    const { wishlistIds, toggleWishlist: toggleWishlistGlobal } = useWishlist();
    const { refresh: refreshCart } = useCart();
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const [isZooming, setIsZooming] = useState(false);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const { auth, flash } = usePage<{ auth: { user: unknown | null }; flash: { success?: string; error?: string } }>().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product.id,
        rating: 0,
        review: '',
    });

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash?.success, flash?.error]);

    function handleReviewSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (data.rating === 0) {
            toast.error('Please select a rating.');
            return;
        }
        setData('product_id', product.id);
        post('/reviews', {
            preserveScroll: true,
            onSuccess: () => {
                reset('rating', 'review');
            },
        });
    }

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setSelectedImage(0);
    }, [product.slug]);

    const allImages = product.images.length > 0
        ? product.images
        : fallbackImages.map((url, i) => ({ id: -i, image: url, sort_order: i }));

    const currentImage = allImages[selectedImage];
    const currentImageUrl = currentImage
        ? (product.images.length > 0 ? `/storage/${currentImage.image}` : currentImage.image)
        : fallbackImages[0];

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageContainerRef.current) return;
        const rect = imageContainerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setZoomPos({ x, y });
    }, []);

    const salePrice = calcPrice(product);
    const hasDiscount = product.discount_value > 0;
    const hasSpecs = product.specifications.length > 0;
    const hasReviews = product.reviews.length > 0;

    const toggleWishlist = () => {
        if (!auth.user) {
            window.location.href = '/customer/login';
            return;
        }
        toggleWishlistGlobal(product.id);
    };

    function formatDate(dateStr: string) {
        return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    const socialShareLinks = [
        { name: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
        { name: 'Twitter', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(product.name)}&url=${encodeURIComponent(window.location.href)}` },
        { name: 'Pinterest', href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(product.name)}` },
    ];

    return (
        <>
            <Head title={`${product.name} - RevAuto Care`}>
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
                            {product.category && (
                                <>
                                    <Link href={`/collections/${product.category.slug}`} className="transition-colors hover:text-white">
                                        {product.category.name}
                                    </Link>
                                    <ChevronRight className="h-3.5 w-3.5" />
                                </>
                            )}
                            <span className="text-[#FF4D00] font-medium truncate max-w-[300px]">{product.name}</span>
                        </div>
                    </div>
                </div>

                {/* Product Showcase Section */}
                <section className="bg-[#0D0D0D] py-10 lg:py-14">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <div className="grid gap-10 lg:grid-cols-2">
                            {/* Left: Product Gallery */}
                            <div className="lg:sticky lg:top-28 lg:self-start">
                                <div className="flex gap-4">
                                    {/* Thumbnails */}
                                    <div className="flex flex-col gap-2">
                                        {allImages.map((img, i) => (
                                            <button
                                                key={img.id}
                                                onClick={() => setSelectedImage(i)}
                                                className={cn(
                                                    'h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all',
                                                    i === selectedImage
                                                        ? 'border-[#FF4D00]'
                                                        : 'border-white/10 hover:border-white/30'
                                                )}
                                            >
                                                <img
                                                    src={product.images.length > 0 ? `/storage/${img.image}` : img.image}
                                                    alt={`${product.name} ${i + 1}`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Main Image */}
                                    <div
                                        ref={imageContainerRef}
                                        className="relative flex-1 aspect-square overflow-hidden rounded-lg bg-[#171717] cursor-crosshair"
                                        onMouseEnter={() => setIsZooming(true)}
                                        onMouseLeave={() => setIsZooming(false)}
                                        onMouseMove={handleMouseMove}
                                    >
                                        <img
                                            src={currentImageUrl}
                                            alt={product.name}
                                            className={cn(
                                                'h-full w-full object-cover transition-opacity duration-300',
                                                isZooming ? 'opacity-0' : 'opacity-100'
                                            )}
                                        />
                                        {hasDiscount && (
                                            <span className="absolute left-4 top-4 z-10 rounded-md bg-[#FF4D00] px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                                                {product.discount_type === 'percentage' ? `-${product.discount_value}%` : `-$${product.discount_value}`}
                                            </span>
                                        )}
                                        {isZooming && (
                                            <div
                                                className="absolute inset-0"
                                                style={{
                                                    backgroundImage: `url(${currentImageUrl})`,
                                                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                                                    backgroundSize: '200%',
                                                    backgroundRepeat: 'no-repeat',
                                                }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right: Product Information */}
                            <div className="flex flex-col">
                                {/* Category */}
                                {product.category && (
                                    <Link
                                        href={`/collections/${product.category.slug}`}
                                        className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-[#FF4D00] mb-2 hover:underline"
                                    >
                                        {product.category.name}
                                    </Link>
                                )}

                                {/* Title */}
                                <h1 className="font-['Montserrat'] text-3xl lg:text-4xl font-bold text-white leading-tight">
                                    {product.name}
                                </h1>

                                {/* Rating */}
                                <div className="flex items-center gap-3 mt-4">
                                    <StarRating rating={avgRating} size="md" />
                                    <span className="text-sm text-[#B5B5B5]">
                                        {avgRating > 0 ? avgRating.toFixed(1) : '0.0'} ({product.reviews_count} review{product.reviews_count !== 1 ? 's' : ''})
                                    </span>
                                </div>

                                {/* Pricing */}
                                <div className="flex items-baseline gap-3 mt-6">
                                    <span className="font-['Montserrat'] text-3xl font-bold text-[#FF4D00]">
                                        ${salePrice.toFixed(2)}
                                    </span>
                                    {hasDiscount && (
                                        <span className="font-['Inter'] text-xl text-[#555] line-through">
                                            ${Number(product.selling_price).toFixed(2)}
                                        </span>
                                    )}
                                </div>

                                {/* Short Description */}
                                {product.description && (
                                    <p className="mt-6 font-['Inter'] text-base text-[#B5B5B5] leading-relaxed">
                                        {product.description.length > 300
                                            ? `${product.description.slice(0, 300)}...`
                                            : product.description}
                                    </p>
                                )}

                                {/* Divider */}
                                <div className="my-6 border-t border-white/5" />

                                {/* Quantity + Add to Cart */}
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center rounded-md border border-white/10 bg-[#171717]">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="flex h-12 w-12 items-center justify-center text-[#B5B5B5] transition-colors hover:text-white hover:bg-white/5"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="flex h-12 w-16 items-center justify-center font-['Inter'] text-base font-semibold text-white border-x border-white/10">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="flex h-12 w-12 items-center justify-center text-[#B5B5B5] transition-colors hover:text-white hover:bg-white/5"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>

                                    <Button
                                        onClick={() => {
                                            router.post('/cart/add', {
                                                product_id: product.id,
                                                quantity,
                                            }, {
                                                onSuccess: () => refreshCart(),
                                            });
                                        }}
                                        className="h-12 flex-1 min-w-[180px] rounded-none bg-[#FF4D00] px-8 text-sm font-bold uppercase tracking-[0.15em] text-white hover:bg-[#FF4D00]/90"
                                    >
                                        <ShoppingCart className="mr-2 h-4 w-4" />
                                        Add to Cart
                                    </Button>

                                </div>

                                {/* Wishlist + Compare */}
                                <div className="flex items-center gap-6 mt-5">
                                    <button
                                        onClick={toggleWishlist}
                                        className={cn(
                                            'flex items-center gap-2 text-sm transition-colors',
                                            wishlistIds.includes(product.id) ? 'text-[#FF4D00]' : 'text-[#666] hover:text-white'
                                        )}
                                    >
                                        <Heart className={cn('h-4 w-4', wishlistIds.includes(product.id) && 'fill-[#FF4D00]')} />
                                        {wishlistIds.includes(product.id) ? 'Saved' : 'Add to Wishlist'}
                                    </button>
                                    <button className="flex items-center gap-2 text-sm text-[#666] transition-colors hover:text-white">
                                        <GitCompare className="h-4 w-4" />
                                        Compare
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="my-6 border-t border-white/5" />

                                {/* SKU / Meta */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[#666] w-24">SKU:</span>
                                        <span className="text-[#B5B5B5]">{product.sku}</span>
                                    </div>
                                    {product.category && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#666] w-24">Category:</span>
                                            <Link href={`/collections/${product.category.slug}`} className="text-[#FF4D00] hover:underline">
                                                {product.category.name}
                                            </Link>
                                        </div>
                                    )}
                                    {product.brand && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#666] w-24">Brand:</span>
                                            <span className="text-[#B5B5B5]">{product.brand.name}</span>
                                        </div>
                                    )}
                                    {product.has_vehicle_compatibility && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#666] w-24">Compatibility:</span>
                                            <span className="flex items-center gap-1 text-green-500">
                                                <Check className="h-3.5 w-3.5" />
                                                Vehicle specific
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Social Sharing */}
                                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/5">
                                    <span className="text-sm text-[#666] flex items-center gap-2">
                                        <Share2 className="h-4 w-4" />
                                        Share:
                                    </span>
                                    {socialShareLinks.map(link => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="rounded-md bg-[#171717] px-3 py-1.5 text-xs font-medium text-[#B5B5B5] transition-colors hover:text-white hover:bg-white/10"
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                </div>

                                {/* Trust Badges */}
                                <div className="mt-6 grid grid-cols-3 gap-4 rounded-lg border border-white/5 bg-[#171717] p-5">
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <Truck className="h-5 w-5 text-[#FF4D00]" />
                                        <span className="text-xs text-[#B5B5B5]">Free Shipping</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <ShieldCheck className="h-5 w-5 text-[#FF4D00]" />
                                        <span className="text-xs text-[#B5B5B5]">2 Year Warranty</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 text-center">
                                        <RotateCcw className="h-5 w-5 text-[#FF4D00]" />
                                        <span className="text-xs text-[#B5B5B5]">30 Day Returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product Details Tabs Section */}
                <section className="bg-[#0D0D0D] py-14 border-t border-white/5">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <FadeUp>
                            {/* Tab Navigation */}
                            <div className="flex border-b border-white/10">
                                {(['description', 'additional', 'reviews'] as const).map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={cn(
                                            'relative px-6 py-4 text-sm font-semibold uppercase tracking-[0.1em] transition-colors',
                                            activeTab === tab
                                                ? 'text-[#FF4D00]'
                                                : 'text-[#666] hover:text-white'
                                        )}
                                    >
                                        {tab === 'description' ? 'Description' : tab === 'additional' ? 'Additional Information' : `Reviews (${product.reviews_count})`}
                                        {activeTab === tab && (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4D00]" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="py-10">
                                {activeTab === 'description' && (
                                    <div className="max-w-3xl">
                                        <h3 className="font-['Montserrat'] text-xl font-bold text-white mb-4">Product Description</h3>
                                        <div className="font-['Inter'] text-base text-[#B5B5B5] leading-relaxed space-y-4">
                                            {product.description ? (
                                                product.description.split('\n').map((line, i) => (
                                                    <p key={i}>{line || '\u00A0'}</p>
                                                ))
                                            ) : (
                                                <p>No description available for this product.</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'additional' && (
                                    <div className="max-w-3xl space-y-10">
                                        <div>
                                            <h3 className="font-['Montserrat'] text-xl font-bold text-white mb-4">Additional Information</h3>
                                            {hasSpecs ? (
                                                <div className="overflow-hidden rounded-lg border border-white/5">
                                                    <table className="w-full">
                                                        <tbody>
                                                            {product.specifications.map((spec, i) => (
                                                                <tr key={spec.id} className={cn(i % 2 === 0 ? 'bg-[#171717]' : 'bg-transparent')}>
                                                                    <td className="px-6 py-4 text-sm font-medium text-[#B5B5B5] w-1/3">{spec.specification_name}</td>
                                                                    <td className="px-6 py-4 text-sm text-white">{spec.specification_value}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            ) : (
                                                <p className="font-['Inter'] text-base text-[#666]">No additional information available.</p>
                                            )}
                                        </div>

                                        {product.has_vehicle_compatibility && product.compatibilities.length > 0 && (
                                            <div>
                                                <h3 className="font-['Montserrat'] text-xl font-bold text-white mb-4">Vehicle Compatibility</h3>
                                                <div className="overflow-hidden rounded-lg border border-white/5">
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className="bg-[#171717]">
                                                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#666]">Make</th>
                                                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#666]">Model</th>
                                                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-[#666]">Year Range</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {product.compatibilities.map((comp, i) => (
                                                                <tr key={comp.id} className={cn(i % 2 === 0 ? 'bg-[#0D0D0D]' : 'bg-transparent')}>
                                                                    <td className="px-6 py-4 text-sm text-white">{comp.make?.name || '—'}</td>
                                                                    <td className="px-6 py-4 text-sm text-white">{comp.model?.name || '—'}</td>
                                                                    <td className="px-6 py-4 text-sm text-[#B5B5B5]">
                                                                        {comp.year_from && comp.year_to
                                                                            ? `${comp.year_from} - ${comp.year_to}`
                                                                            : comp.year_from
                                                                            ? `From ${comp.year_from}`
                                                                            : comp.year_to
                                                                            ? `Up to ${comp.year_to}`
                                                                            : 'All years'}
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div className="max-w-3xl">
                                        <div className="flex items-center gap-6 mb-8">
                                            <div className="flex flex-col items-center">
                                                <span className="font-['Montserrat'] text-5xl font-bold text-white">{avgRating > 0 ? avgRating.toFixed(1) : '0.0'}</span>
                                                <StarRating rating={avgRating} size="md" />
                                                <span className="mt-1 text-xs text-[#666]">{product.reviews_count} review{product.reviews_count !== 1 ? 's' : ''}</span>
                                            </div>
                                        </div>

                                        {/* Review Form */}
                                        {auth.user ? (
                                            hasReviewed ? (
                                                <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-4 mb-8 text-center">
                                                    <p className="text-sm text-green-500 font-medium">You have already reviewed this product.</p>
                                                </div>
                                            ) : canReview ? (
                                                <div className="rounded-lg border border-white/5 bg-[#171717] p-6 mb-8">
                                                    <h4 className="font-['Montserrat'] text-base font-bold text-white mb-4">Write a Review</h4>
                                                    <form onSubmit={handleReviewSubmit}>
                                                        <div className="mb-4">
                                                            <label className="text-xs font-semibold uppercase tracking-wider text-[#666] mb-2 block">Your Rating</label>
                                                            <InteractiveStarRating
                                                                value={data.rating}
                                                                onChange={v => setData('rating', v)}
                                                            />
                                                            {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating}</p>}
                                                        </div>
                                                        <div className="mb-4">
                                                            <label className="text-xs font-semibold uppercase tracking-wider text-[#666] mb-2 block">Your Review</label>
                                                            <textarea
                                                                value={data.review}
                                                                onChange={e => setData('review', e.target.value)}
                                                                rows={4}
                                                                placeholder="Share your experience with this product..."
                                                                className="flex w-full rounded-md border border-white/10 bg-[#0D0D0D] px-3 py-2 text-sm text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0 focus-visible:outline-none"
                                                            />
                                                            {errors.review && <p className="mt-1 text-xs text-red-500">{errors.review}</p>}
                                                        </div>
                                                        <Button
                                                            type="submit"
                                                            disabled={processing}
                                                            className="bg-[#FF4D00] text-white hover:bg-[#FF4D00]/90 text-sm font-bold uppercase tracking-[0.1em]"
                                                        >
                                                            {processing ? 'Submitting...' : 'Submit Review'}
                                                        </Button>
                                                    </form>
                                                </div>
                                            ) : (
                                                <div className="rounded-lg border border-white/5 bg-[#171717] p-6 mb-8 text-center">
                                                    <p className="text-sm text-[#666]">You can only review products you have purchased and received.</p>
                                                </div>
                                            )
                                        ) : (
                                            <div className="rounded-lg border border-white/5 bg-[#171717] p-6 mb-8 text-center">
                                                <p className="text-sm text-[#666]">
                                                    <Link href="/customer/login" className="text-[#FF4D00] hover:underline">Sign in</Link> to leave a review.
                                                </p>
                                            </div>
                                        )}

                                        {hasReviews ? (
                                            <div className="space-y-6">
                                                {product.reviews.map(review => (
                                                    <div key={review.id} className="rounded-lg border border-white/5 bg-[#171717] p-6">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF4D00]/10 text-sm font-bold text-[#FF4D00]">
                                                                    {review.customer?.full_name?.charAt(0)?.toUpperCase() || 'A'}
                                                                </div>
                                                                <div>
                                                                    <span className="text-sm font-semibold text-white">{review.customer?.full_name || 'Anonymous'}</span>
                                                                    <span className="block text-xs text-[#666]">{formatDate(review.created_at)}</span>
                                                                </div>
                                                            </div>
                                                            <StarRating rating={review.rating} size="sm" />
                                                        </div>
                                                        {review.review && (
                                                            <p className="font-['Inter'] text-sm text-[#B5B5B5] leading-relaxed">{review.review}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center py-12 text-center">
                                                <Star className="h-12 w-12 text-[#333]" />
                                                <p className="mt-4 font-['Inter'] text-base text-[#666]">No reviews yet for this product.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </FadeUp>
                    </div>
                </section>

                {/* You Might Also Like Section */}
                {relatedProducts.length > 0 && (
                    <section className="bg-[#0D0D0D] py-14 border-t border-white/5">
                        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                            <FadeUp>
                                <div className="flex items-center justify-between mb-10">
                                    <h2 className="font-['Montserrat'] text-2xl lg:text-3xl font-bold text-white">
                                        You Might Also Like
                                    </h2>
                                    {product.category && (
                                        <Link
                                            href={`/collections/${product.category.slug}`}
                                            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#FF4D00] hover:underline"
                                        >
                                            View All
                                            <ChevronRight className="h-4 w-4" />
                                        </Link>
                                    )}
                                </div>

                                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                    {relatedProducts.map((rp, i) => {
                                        const rpImages = rp.images.length > 0 ? rp.images : [];
                                        const firstImg = rpImages.length > 0 ? `/storage/${rpImages[0].image}` : fallbackImages[i % fallbackImages.length];
                                        const secondImg = rpImages.length > 1 ? `/storage/${rpImages[1].image}` : firstImg;
                                        const rpSalePrice = calcPrice(rp);
                                        const rpHasDiscount = rp.discount_value > 0;

                                        return (
                                            <div
                                                key={rp.id}
                                                className="group relative flex flex-col rounded-lg border border-white/5 bg-[#171717] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-[#FF4D00]/20 overflow-hidden"
                                            >
                                                <Link href={`/product-details/${rp.slug}`} className="relative aspect-square overflow-hidden bg-[#0D0D0D]">
                                                    <img
                                                        src={firstImg}
                                                        alt={rp.name}
                                                        loading="lazy"
                                                        className="h-full w-full object-cover transition-all duration-500 group-hover:opacity-0"
                                                    />
                                                    <img
                                                        src={secondImg}
                                                        alt={rp.name}
                                                        loading="lazy"
                                                        className="absolute inset-0 h-full w-full object-cover transition-all duration-500 opacity-0 group-hover:opacity-100"
                                                    />
                                                    {rpHasDiscount && (
                                                        <span className="absolute left-3 top-3 z-10 rounded-md bg-[#FF4D00] px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
                                                            {rp.discount_type === 'percentage' ? `-${rp.discount_value}%` : `-$${rp.discount_value}`}
                                                        </span>
                                                    )}

                                                    {/* Floating action buttons on hover */}
                                                    <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 transition-all duration-300 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100">
                                                        <button
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                if (!auth.user) { window.location.href = '/customer/login'; return; }
                                                                toggleWishlistGlobal(rp.id);
                                                            }}
                                                            className={cn(
                                                                'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                                                                wishlistIds.includes(rp.id)
                                                                    ? 'bg-[#FF4D00] text-white'
                                                                    : 'bg-[#0D0D0D]/80 text-white hover:bg-[#FF4D00]'
                                                            )}
                                                        >
                                                            <Heart className={cn('h-4 w-4', wishlistIds.includes(rp.id) && 'fill-white')} />
                                                        </button>
                                                        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D0D0D]/80 text-white transition-colors hover:bg-[#FF4D00]">
                                                            <Eye className="h-4 w-4" />
                                                        </button>
                                                    </div>

                                                    {/* Add to cart overlay on hover */}
                                                    <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-all duration-300 group-hover:translate-y-0">
                                                        <button className="flex w-full items-center justify-center gap-2 bg-[#FF4D00] py-3 text-xs font-bold uppercase tracking-[0.1em] text-white hover:bg-[#FF4D00]/90">
                                                            <ShoppingCart className="h-3.5 w-3.5" />
                                                            Add to Cart
                                                        </button>
                                                    </div>
                                                </Link>

                                                <div className="flex flex-1 flex-col p-4">
                                                    <Link href={`/product-details/${rp.slug}`}>
                                                        <h3 className="font-['Montserrat'] text-sm font-bold text-white line-clamp-2 transition-colors hover:text-[#FF4D00]">
                                                            {rp.name}
                                                        </h3>
                                                    </Link>
                                                    <div className="mt-auto pt-3 flex items-center gap-2">
                                                        <span className="font-['Inter'] text-base font-bold text-[#FF4D00]">
                                                            ${rpSalePrice.toFixed(2)}
                                                        </span>
                                                        {rpHasDiscount && (
                                                            <span className="font-['Inter'] text-sm text-[#555] line-through">
                                                                ${Number(rp.selling_price).toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </FadeUp>
                        </div>
                    </section>
                )}

                <LandingFooter />
            </div>
        </>
    );
}
