import { Head, Link, router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWishlist } from '@/hooks/use-wishlist';
import Pagination from '@/components/pagination';
import LandingNavigation from '@/components/landing-navigation';
import LandingFooter from '@/components/landing-footer';
import {
    ChevronDown,
    ChevronRight,
    Star,
    Heart,
    Search,
    Eye,
    ShoppingCart,
    Wrench,
    Grid3X3,
    List,
    SlidersHorizontal,
    X,
    Minus,
    Plus,
    ChevronUp,
} from 'lucide-react';
import { useEffect, useState, useRef, useMemo, useCallback, type ReactNode } from 'react';

const fallbackImages = [
    'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583121274602-3e2820d2f5b6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=800&q=80',
];

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    description: string | null;
    products_count?: number;
}

interface Brand {
    id: number;
    name: string;
    slug: string;
}

interface Product {
    id: number;
    category_id: number;
    brand_id: number | null;
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

interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    links: { url: string | null; label: string; active: boolean }[];
}

function calcPrice(product: Product) {
    if (product.discount_value > 0) {
        return product.discount_type === 'percentage'
            ? Number(product.selling_price) * (1 - product.discount_value / 100)
            : Number(product.selling_price) - product.discount_value;
    }
    return Number(product.selling_price);
}

function Accordion({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between py-3 text-sm font-semibold text-white"
            >
                {title}
                {open ? <ChevronUp className="h-4 w-4 text-[#666]" /> : <ChevronDown className="h-4 w-4 text-[#666]" />}
            </button>
            <div className={cn('space-y-2 pb-3', open ? 'block' : 'hidden')}>
                {children}
            </div>
            <div className="border-t border-white/5" />
        </div>
    );
}

export default function CollectionIndex({
    category,
    products,
    subcategories = [],
    allCategories = [],
    brands = [],
    priceRange = { min: 0, max: 1000 },
}: {
    category: Category;
    products: PaginatedResponse<Product>;
    subcategories: Category[];
    allCategories: Category[];
    brands: Brand[];
    priceRange: { min: number; max: number };
}) {
    const productList = products?.data ?? [];
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [sortBy, setSortBy] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
    const [priceMin, setPriceMin] = useState(priceRange.min);
    const [priceMax, setPriceMax] = useState(priceRange.max);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { wishlistIds, toggleWishlist: toggleWishlistGlobal } = useWishlist();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleNavSearch = useCallback((query: string) => {
        setSearchQuery(query);
        setTimeout(() => searchInputRef.current?.focus(), 100);
    }, []);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredProducts = useMemo(() => {
        let result = [...productList];

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
        }

        if (selectedBrands.length > 0) {
            result = result.filter(p => p.brand_id && selectedBrands.includes(p.brand_id));
        }

        result = result.filter(p => {
            const price = calcPrice(p);
            return price >= priceMin && price <= priceMax;
        });

        if (selectedRating) {
            result = result.filter(p => p.reviews_count >= selectedRating);
        }

        result.sort((a, b) => {
            switch (sortBy) {
                case 'price-asc': return calcPrice(a) - calcPrice(b);
                case 'price-desc': return calcPrice(b) - calcPrice(a);
                case 'name': return a.name.localeCompare(b.name);
                case 'rating': return (b.reviews_count || 0) - (a.reviews_count || 0);
                default: return 0;
            }
        });

        return result;
    }, [productList, searchQuery, selectedBrands, priceMin, priceMax, selectedRating, sortBy]);

    const handlePageChange = useCallback((page: number) => {
        router.get(window.location.pathname, { page }, { preserveState: true, preserveScroll: false });
    }, []);

    const toggleWishlist = (id: number) => {
        toggleWishlistGlobal(id);
    };

    const currentCategory = category;
    const categoryImage = category.image
        ? `/storage/${category.image}`
        : fallbackImages[0];

    const hasActiveFilters = searchQuery || selectedBrands.length > 0 || priceMin > priceRange.min || priceMax < priceRange.max || selectedRating;

    function clearFilters() {
        setSearchQuery('');
        setSelectedBrands([]);
        setPriceMin(priceRange.min);
        setPriceMax(priceRange.max);
        setSelectedRating(null);
    }

    return (
        <>
            <Head title={`${category.name} - RevAuto Care`}>
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
                    onSearch={handleNavSearch}
                />

                {/* Breadcrumb Bar */}
                <div className="pt-24 border-b border-white/5 bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#666]">
                            <Link href="/" className="transition-colors hover:text-white">Home</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="text-[#FF4D00] font-medium">{category.name}</span>
                            <span className="ml-auto text-[#B5B5B5]">{products?.total ?? filteredProducts.length} product{(products?.total ?? filteredProducts.length) !== 1 ? 's' : ''}</span>
                        </div>
                    </div>
                </div>

                {/* Subcategories Strip */}
                {subcategories.length > 0 && (
                    <div className="border-b border-white/5 bg-[#0D0D0D]">
                        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-4">
                            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                                <Grid3X3 className="h-4 w-4 shrink-0 text-[#FF4D00]" />
                                <span className="mr-2 shrink-0 font-['Inter'] text-xs font-semibold uppercase tracking-wider text-[#666]">Subcategories:</span>
                                {subcategories.map(sub => (
                                    <Link
                                        key={sub.id}
                                        href={`/collections/${sub.slug}`}
                                        className="shrink-0 rounded-full border border-white/10 bg-[#171717] px-4 py-1.5 text-xs text-[#B5B5B5] transition-all hover:border-[#FF4D00]/30 hover:text-white"
                                    >
                                        {sub.name}
                                        {sub.products_count !== undefined && (
                                            <span className="ml-1 text-[#666]">({sub.products_count})</span>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content: Sidebar + Products */}
                <section className="bg-[#0D0D0D] py-8">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <div className="flex gap-8">

                            {/* Mobile filter overlay */}
                            {sidebarOpen && (
                                <div className="fixed inset-0 z-50 lg:hidden">
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
                                    <div className="absolute left-0 top-0 h-full w-[300px] max-w-[85vw] overflow-y-auto bg-[#0D0D0D] border-r border-white/10 p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="font-['Montserrat'] text-base font-bold text-white">Filters</span>
                                            <button onClick={() => setSidebarOpen(false)} className="text-[#666] hover:text-white">
                                                <X className="h-5 w-5" />
                                            </button>
                                        </div>
                                        <SidebarContent
                                            allCategories={allCategories}
                                            currentCategory={currentCategory}
                                            brands={brands}
                                            priceRange={priceRange}
                                            priceMin={priceMin}
                                            priceMax={priceMax}
                                            selectedBrands={selectedBrands}
                                            selectedRating={selectedRating}
                                            onBrandToggle={id => setSelectedBrands(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])}
                                            onPriceMinChange={setPriceMin}
                                            onPriceMaxChange={setPriceMax}
                                            onRatingChange={setSelectedRating}
                                            hasActiveFilters={hasActiveFilters}
                                            onClearFilters={clearFilters}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Desktop Sidebar */}
                            <div className="hidden lg:block w-[280px] shrink-0">
                                <div className="sticky top-24">
                                    <SidebarContent
                                        allCategories={allCategories}
                                        currentCategory={currentCategory}
                                        brands={brands}
                                        priceRange={priceRange}
                                        priceMin={priceMin}
                                        priceMax={priceMax}
                                        selectedBrands={selectedBrands}
                                        selectedRating={selectedRating}
                                        onBrandToggle={id => setSelectedBrands(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])}
                                        onPriceMinChange={setPriceMin}
                                        onPriceMaxChange={setPriceMax}
                                        onRatingChange={setSelectedRating}
                                        hasActiveFilters={hasActiveFilters}
                                        onClearFilters={clearFilters}
                                    />
                                </div>
                            </div>

                            {/* Products Area */}
                            <div className="flex-1 min-w-0">
                                {/* Toolbar */}
                                <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-white/5 bg-[#171717] px-4 py-3 mb-6">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setSidebarOpen(true)}
                                            className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-[#B5B5B5] hover:text-white lg:hidden"
                                        >
                                            <SlidersHorizontal className="h-3.5 w-3.5" />
                                            Filters
                                            {hasActiveFilters && <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF4D00] text-[10px] text-white font-bold">!</span>}
                                        </button>
                                        <div className="hidden sm:flex items-center gap-2">
                                            <button
                                                onClick={() => setViewMode('grid')}
                                                className={cn('rounded-md p-1.5 transition-colors', viewMode === 'grid' ? 'bg-[#FF4D00]/10 text-[#FF4D00]' : 'text-[#666] hover:text-white')}
                                            >
                                                <Grid3X3 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => setViewMode('list')}
                                                className={cn('rounded-md p-1.5 transition-colors', viewMode === 'list' ? 'bg-[#FF4D00]/10 text-[#FF4D00]' : 'text-[#666] hover:text-white')}
                                            >
                                                <List className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <span className="hidden sm:block text-sm text-[#B5B5B5]">
                                            {filteredProducts.length} of {products?.total ?? 0} products
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="relative hidden md:block">
                                            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#666]" />
                                            <Input
                                                ref={searchInputRef}
                                                value={searchQuery}
                                                onChange={e => setSearchQuery(e.target.value)}
                                                placeholder="Search products..."
                                                className="h-9 w-[200px] rounded-md border-white/10 bg-[#0D0D0D] pl-9 text-xs text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                            />
                                        </div>
                                        <select
                                            value={sortBy}
                                            onChange={e => setSortBy(e.target.value)}
                                            className="h-9 rounded-md border border-white/10 bg-[#0D0D0D] px-3 text-xs text-[#B5B5B5] focus:border-[#FF4D00] focus:outline-none"
                                        >
                                            <option value="name">Sort: Name</option>
                                            <option value="price-asc">Price: Low to High</option>
                                            <option value="price-desc">Price: High to Low</option>
                                            <option value="rating">Top Rated</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Products */}
                                {filteredProducts.length > 0 ? (
                                    viewMode === 'grid' ? (
                                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                            {filteredProducts.map((product, i) => (
                                                <ProductCard
                                                    key={product.id}
                                                    product={product}
                                                    index={i}
                                                    wishlisted={wishlistIds.includes(product.id)}
                                                    onToggleWishlist={() => toggleWishlist(product.id)}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {filteredProducts.map((product, i) => (
                                                <ProductRow
                                                    key={product.id}
                                                    product={product}
                                                    index={i}
                                                    wishlisted={wishlistIds.includes(product.id)}
                                                    onToggleWishlist={() => toggleWishlist(product.id)}
                                                />
                                            ))}
                                        </div>
                                    )
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20 text-center">
                                        <Wrench className="h-12 w-12 text-[#333]" />
                                        <h3 className="mt-4 font-['Montserrat'] text-xl font-bold text-white">No Products Found</h3>
                                        <p className="mt-2 font-['Inter'] text-sm text-[#B5B5B5]">
                                            Try adjusting your filters or search terms.
                                        </p>
                                        {hasActiveFilters && (
                                            <Button onClick={clearFilters} className="mt-6 rounded-md bg-[#FF4D00] px-6 text-sm font-semibold text-white hover:bg-[#FF4D00]/90">
                                                Clear Filters
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {products && products.last_page > 1 && (
                    <Pagination
                        links={products.links}
                        lastPage={products.last_page}
                        from={products.from}
                        to={products.to}
                        total={products.total}
                        onPageChange={handlePageChange}
                    />
                )}

                <LandingFooter />
            </div>
        </>
    );
}

/* Sidebar Content */
function SidebarContent({
    allCategories,
    currentCategory,
    brands,
    priceRange,
    priceMin,
    priceMax,
    selectedBrands,
    selectedRating,
    onBrandToggle,
    onPriceMinChange,
    onPriceMaxChange,
    onRatingChange,
    hasActiveFilters,
    onClearFilters,
}: {
    allCategories: Category[];
    currentCategory: Category;
    brands: Brand[];
    priceRange: { min: number; max: number };
    priceMin: number;
    priceMax: number;
    selectedBrands: number[];
    selectedRating: number | null;
    onBrandToggle: (id: number) => void;
    onPriceMinChange: (v: number) => void;
    onPriceMaxChange: (v: number) => void;
    onRatingChange: (r: number | null) => void;
    hasActiveFilters: boolean;
    onClearFilters: () => void;
}) {
    return (
        <div className="rounded-lg border border-white/5 bg-[#171717] p-5">
            <div className="flex items-center justify-between mb-1">
                <h3 className="font-['Montserrat'] text-sm font-bold text-white">Filters</h3>
                {hasActiveFilters && (
                    <button onClick={onClearFilters} className="text-xs text-[#FF4D00] hover:underline">
                        Clear all
                    </button>
                )}
            </div>

            {/* Categories */}
            <Accordion title="Categories">
                <div className="space-y-1">
                    {allCategories.map(cat => (
                        <Link
                            key={cat.id}
                            href={`/collections/${cat.slug}`}
                            className={cn(
                                'flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                                cat.id === currentCategory.id
                                    ? 'bg-[#FF4D00]/10 text-[#FF4D00] font-semibold'
                                    : 'text-[#B5B5B5] hover:bg-white/5 hover:text-white'
                            )}
                        >
                            <span>{cat.name}</span>
                            <ChevronRight className="h-3 w-3" />
                        </Link>
                    ))}
                </div>
            </Accordion>

            {/* Price Range */}
            <Accordion title="Price Range">
                <div className="space-y-3 pt-1">
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#666]">$</span>
                            <input
                                type="number"
                                value={Math.round(priceMin)}
                                onChange={e => onPriceMinChange(Number(e.target.value))}
                                min={priceRange.min}
                                max={priceRange.max}
                                className="h-9 w-full rounded-md border border-white/10 bg-[#0D0D0D] pl-6 pr-2 text-xs text-white focus:border-[#FF4D00] focus:outline-none"
                            />
                        </div>
                        <span className="text-xs text-[#666]">—</span>
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#666]">$</span>
                            <input
                                type="number"
                                value={Math.round(priceMax)}
                                onChange={e => onPriceMaxChange(Number(e.target.value))}
                                min={priceRange.min}
                                max={priceRange.max}
                                className="h-9 w-full rounded-md border border-white/10 bg-[#0D0D0D] pl-6 pr-2 text-xs text-white focus:border-[#FF4D00] focus:outline-none"
                            />
                        </div>
                    </div>
                    <input
                        type="range"
                        min={priceRange.min}
                        max={priceRange.max}
                        value={priceMax}
                        onChange={e => onPriceMaxChange(Number(e.target.value))}
                        className="w-full accent-[#FF4D00] h-1.5"
                    />
                </div>
            </Accordion>

            {/* Brands */}
            {brands.length > 0 && (
                <Accordion title="Brands">
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                        {brands.map(brand => (
                            <label
                                key={brand.id}
                                className="flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer transition-colors hover:bg-white/5"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedBrands.includes(brand.id)}
                                    onChange={() => onBrandToggle(brand.id)}
                                    className="h-4 w-4 rounded border-white/20 bg-[#0D0D0D] text-[#FF4D00] focus:ring-[#FF4D00] focus:ring-offset-0"
                                />
                                <span className="text-sm text-[#B5B5B5]">{brand.name}</span>
                            </label>
                        ))}
                    </div>
                </Accordion>
            )}

            {/* Rating */}
            <Accordion title="Rating" defaultOpen={false}>
                <div className="space-y-1">
                    {[5, 4, 3, 2, 1].map(rating => (
                        <button
                            key={rating}
                            onClick={() => onRatingChange(selectedRating === rating ? null : rating)}
                            className={cn(
                                'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                                selectedRating === rating ? 'bg-[#FF4D00]/10' : 'hover:bg-white/5'
                            )}
                        >
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn(
                                            'h-3.5 w-3.5',
                                            i < rating ? 'fill-[#FF4D00] text-[#FF4D00]' : 'text-[#333]'
                                        )}
                                    />
                                ))}
                            </div>
                            <span className={cn('text-xs', selectedRating === rating ? 'text-[#FF4D00]' : 'text-[#B5B5B5]')}>
                                &amp; up
                            </span>
                        </button>
                    ))}
                </div>
            </Accordion>
        </div>
    );
}

/* Product Card (Grid) */
function ProductCard({ product, index, wishlisted, onToggleWishlist }: { product: Product; index: number; wishlisted: boolean; onToggleWishlist: () => void }) {
    const [imgIndex, setImgIndex] = useState(0);
    const hasTwoImages = product.images.length >= 2;

    return (
        <div
            className="group relative flex flex-col rounded-lg border border-white/5 bg-[#171717] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-[#FF4D00]/20 overflow-hidden"
        >
            {/* Image Container */}
            <Link href={`/product-details/${product.slug}`} className="relative aspect-square overflow-hidden bg-[#0D0D0D]">
                <img
                    src={product.images.length > 0 ? `/storage/${product.images[0].image}` : fallbackImages[index % fallbackImages.length]}
                    alt={product.name}
                    loading="lazy"
                    className={cn(
                        'h-full w-full object-cover transition-all duration-500',
                        hasTwoImages ? 'group-hover:opacity-0' : 'group-hover:scale-110'
                    )}
                />
                {hasTwoImages && (
                    <img
                        src={`/storage/${product.images[1].image}`}
                        alt={product.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100"
                    />
                )}
                <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />

                {/* Sale Badge */}
                {product.discount_value > 0 && (
                    <span className="absolute left-3 top-3 z-10 rounded-md bg-[#FF4D00] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                        {product.discount_type === 'percentage' ? `-${product.discount_value}%` : `-$${product.discount_value}`}
                    </span>
                )}

                {/* Wishlist */}
                <button
                    onClick={e => { e.preventDefault(); onToggleWishlist(); }}
                    className={cn(
                        'absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100',
                        wishlisted ? 'bg-[#FF4D00] text-white' : 'bg-black/40 text-white hover:bg-[#FF4D00]'
                    )}
                >
                    <Heart className={cn('h-4 w-4', wishlisted && 'fill-white')} />
                </button>

                {/* Quick View */}
                <button className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-md bg-black/60 px-4 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-[#FF4D00] group-hover:opacity-100">
                    <Eye className="mr-1.5 inline h-3.5 w-3.5" />
                    Quick View
                </button>

                {/* Add to Cart Overlay */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-all duration-300 group-hover:translate-y-0">
                    <Button className="w-full rounded-md bg-[#FF4D00] py-2 text-[11px] font-bold uppercase tracking-wider text-white hover:bg-[#FF4D00]/90 h-9">
                        <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                        Add to Cart
                    </Button>
                </div>
            </Link>

            {/* Info */}
            <div className="flex flex-1 flex-col p-4">
                {product.brand && (
                    <span className="font-['Inter'] text-[10px] font-semibold uppercase tracking-wider text-[#FF4D00]">{product.brand.name}</span>
                )}
                <Link href={`/product-details/${product.slug}`}>
                    <h3 className="mt-1 font-['Montserrat'] text-sm font-bold text-white line-clamp-2 transition-colors hover:text-[#FF4D00]">
                        {product.name}
                    </h3>
                </Link>

                {/* Ratings */}
                {product.reviews_count > 0 ? (
                    <div className="mt-1.5 flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-[#FF4D00] text-[#FF4D00]" />
                            ))}
                        </div>
                        <span className="text-[10px] text-[#666]">({product.reviews_count})</span>
                    </div>
                ) : (
                    <div className="mt-1.5 flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-[#333]" />
                        ))}
                        <span className="ml-1 text-[10px] text-[#666]">(0)</span>
                    </div>
                )}

                <div className="mt-auto pt-3 flex items-center gap-2">
                    <span className="font-['Inter'] text-base font-bold text-[#FF4D00]">
                        ${calcPrice(product).toFixed(2)}
                    </span>
                    {product.discount_value > 0 && (
                        <span className="font-['Inter'] text-sm text-[#555] line-through">${Number(product.selling_price).toFixed(2)}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

/* Product Row (List View) */
function ProductRow({ product, index, wishlisted, onToggleWishlist }: { product: Product; index: number; wishlisted: boolean; onToggleWishlist: () => void }) {
    return (
        <div className="group flex gap-5 rounded-lg border border-white/5 bg-[#171717] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:border-[#FF4D00]/20">
            <Link href={`/product-details/${product.slug}`} className="relative w-[180px] shrink-0 overflow-hidden rounded-md bg-[#0D0D0D] aspect-square">
                <img
                    src={product.images.length > 0 ? `/storage/${product.images[0].image}` : fallbackImages[index % fallbackImages.length]}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                {product.discount_value > 0 && (
                    <span className="absolute left-2 top-2 rounded-md bg-[#FF4D00] px-2 py-0.5 text-[10px] font-bold text-white">
                        {product.discount_type === 'percentage' ? `-${product.discount_value}%` : `-$${product.discount_value}`}
                    </span>
                )}
            </Link>
            <div className="flex flex-1 flex-col justify-center min-w-0">
                {product.brand && (
                    <span className="font-['Inter'] text-[10px] font-semibold uppercase tracking-wider text-[#FF4D00]">{product.brand.name}</span>
                )}
                <Link href={`/product-details/${product.slug}`}>
                    <h3 className="mt-1 font-['Montserrat'] text-base font-bold text-white transition-colors hover:text-[#FF4D00]">{product.name}</h3>
                </Link>
                {product.description && (
                    <p className="mt-1 font-['Inter'] text-sm text-[#B5B5B5] line-clamp-2">{product.description}</p>
                )}
                {product.reviews_count > 0 && (
                    <div className="mt-2 flex items-center gap-1.5">
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-[#FF4D00] text-[#FF4D00]" />
                            ))}
                        </div>
                        <span className="text-xs text-[#666]">({product.reviews_count})</span>
                    </div>
                )}
                <div className="mt-3 flex items-center gap-3">
                    <span className="font-['Inter'] text-lg font-bold text-[#FF4D00]">${calcPrice(product).toFixed(2)}</span>
                    {product.discount_value > 0 && (
                        <span className="font-['Inter'] text-sm text-[#555] line-through">${Number(product.selling_price).toFixed(2)}</span>
                    )}
                </div>
                <div className="mt-3 flex items-center gap-2">
                    <Button className="rounded-md bg-[#FF4D00] px-5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#FF4D00]/90 h-9">
                        <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                        Add to Cart
                    </Button>
                    <button
                        onClick={onToggleWishlist}
                        className={cn(
                            'flex h-9 w-9 items-center justify-center rounded-md border transition-colors',
                            wishlisted ? 'border-[#FF4D00] bg-[#FF4D00]/10 text-[#FF4D00]' : 'border-white/10 text-[#666] hover:text-white hover:border-white/20'
                        )}
                    >
                        <Heart className={cn('h-4 w-4', wishlisted && 'fill-[#FF4D00]')} />
                    </button>
                </div>
            </div>
        </div>
    );
}
