import { Head, Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import LandingNavigation from '@/components/landing-navigation';
import LandingFooter from '@/components/landing-footer';
import {
    ChevronRight,
    Star,
    ArrowUpRight,
    Instagram,
    Wrench,
    Shield,
    Clock,
    Award,
    Settings,
    Gauge,
    Zap,
    Search,
} from 'lucide-react';
import { useEffect, useState, useRef, type ReactNode } from 'react';

const imgs = {
    heroRepair: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1920&q=80',
    heroResult: 'https://images.unsplash.com/photo-1503376780355-7e2f0b7c8c14?auto=format&fit=crop&w=1920&q=80',
    engine: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    brake: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
    oil: 'https://images.unsplash.com/photo-1583121274602-3e2820d2f5b6?auto=format&fit=crop&w=800&q=80',
    tire: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    electrical: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=800&q=80',
    tuning: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    transmission: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80',
    alignment: 'https://images.unsplash.com/photo-1526726538690-5cbf3ae4ed1b?auto=format&fit=crop&w=800&q=80',
    about: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1200&q=80',
    promo: 'https://images.unsplash.com/photo-1544639591-0f59f8a0c4f1?auto=format&fit=crop&w=1920&q=80',
    ig1: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=600&q=80',
    ig2: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80',
    ig3: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    ig4: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=600&q=80',
    ig5: 'https://images.unsplash.com/photo-1632733711679-529326f6db12?auto=format&fit=crop&w=600&q=80',
    ig6: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80',
    ig7: 'https://plus.unsplash.com/premium_photo-1674375348357-a25140a68bbd?auto=format&fit=crop&w=600&q=80',
    ig8: 'https://plus.unsplash.com/premium_photo-1663090140645-32b7d760853e?auto=format&fit=crop&w=600&q=80',
};

const heroSlides = [
    {
        image: imgs.heroRepair,
        alt: 'Professional auto repair service',
        badge: 'Auto Repair Service & Accessories',
        headline: 'Professional Auto Repair',
        headlineAccent: 'Service & Accessories',
        description: 'Expert diagnostics, quality repairs, and premium automotive accessories — all under one roof. Driven by passion, backed by expertise.',
        secondaryCta: 'Browse Accessories',
    },
    {
        image: 'https://images.unsplash.com/photo-1556448851-9359658faa54?auto=format&fit=crop&w=1920&q=80',
        alt: 'Premium automotive parts and accessories',
        badge: 'Premium Auto Care',
        headline: 'Make Your Car',
        headlineAccent: 'Hassle Free',
        description: 'Quality parts, certified technicians, and peace of mind guaranteed. Your vehicle deserves nothing less than the best care.',
        secondaryCta: 'Learn More',
    },
];

const services = [
    { name: 'Engine Diagnostics & Repair', price: 'From $189', rating: 5, reviews: 234, image: imgs.engine, tag: 'Most Popular' },
    { name: 'Brake Pad Replacement', price: 'From $349', rating: 5, reviews: 187, image: imgs.brake, tag: null },
    { name: 'Synthetic Oil Change', price: 'From $89', rating: 5, reviews: 412, image: imgs.oil, tag: 'Best Value' },
    { name: 'Tire Rotation & Balance', price: 'From $59', rating: 4, reviews: 156, image: imgs.tire, tag: null },
    { name: 'AC System Service', price: 'From $199', rating: 4, reviews: 98, image: imgs.electrical, tag: null },
    { name: 'Performance Tune-Up', price: 'From $599', rating: 5, reviews: 143, image: imgs.tuning, tag: 'Popular' },
    { name: 'Transmission Service', price: 'From $249', rating: 4, reviews: 76, image: imgs.transmission, tag: null },
    { name: 'Wheel Alignment', price: 'From $129', rating: 4, reviews: 112, image: imgs.alignment, tag: null },
];



const reviews = [
    { name: 'Michael Torres', car: 'Porsche 911 Carrera', rating: 5, text: 'Took my 911 in for a complete engine diagnostic. These guys really know their stuff. They found issues three other shops missed. My car runs better than ever.' },
    { name: 'Jennifer Adams', car: 'Mercedes-Benz S-Class', rating: 5, text: 'Exceptional service from start to finish. They treated my S-Class like it was their own. The attention to detail and transparency about pricing was refreshing.' },
    { name: 'Robert Kim', car: 'BMW X5 M50i', rating: 5, text: 'Had a performance tune-up done on my X5. The difference in throttle response and power is incredible. Fair pricing and they finished ahead of schedule.' },
    { name: 'Lisa Chen', car: 'Audi RS6 Avant', rating: 4, text: 'Best brake service I have ever had. They explained everything clearly, showed me the worn parts, and the new brakes feel phenomenal. Will be my go-to shop.' },
];

const instagramPosts = [imgs.ig1, imgs.ig2, imgs.ig3, imgs.ig4, imgs.ig5, imgs.ig6, imgs.ig7, imgs.ig8];

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

function ServiceCard({ service }: { service: typeof services[0] }) {
    return (
        <div className="group relative cursor-pointer">
            <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-sm bg-[#171717]">
                <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
                {service.tag && (
                    <span className="absolute left-3 top-3 z-10 bg-[#FF4D00] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                        {service.tag}
                    </span>
                )}
                <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-all duration-300 group-hover:translate-y-0">
                    <div className="flex gap-2">
                        <Link
                            href="/book-an-appointment"
                            className="flex-1 bg-[#FF4D00] text-white hover:bg-[#FF4D00]/90 text-[11px] uppercase tracking-wider font-semibold h-10 rounded-none inline-flex items-center justify-center"
                        >
                            Book Now
                        </Link>
                        <Button
                            size="icon"
                            variant="outline"
                            className="h-10 w-10 rounded-none border-white/20 bg-white/10 text-white hover:bg-white/20"
                        >
                            <Search className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={cn(
                                'h-3 w-3',
                                i < service.rating ? 'fill-[#FF4D00] text-[#FF4D00]' : 'text-[#333]'
                            )}
                        />
                    ))}
                    <span className="ml-1 text-[11px] text-[#B5B5B5]">({service.reviews})</span>
                </div>
                <h3 className="font-['Montserrat'] text-sm font-bold text-white">{service.name}</h3>
                <span className="font-['Inter'] text-base font-semibold text-[#FF4D00]">{service.price}</span>
            </div>
        </div>
    );
}

export default function Welcome({ canRegister = true, servicePackages = [], categories = [], popularProducts = [], brands = [] }: {
    canRegister?: boolean;
    servicePackages?: { id: number; name: string; description: string | null; price: number; duration: number | null }[];
    categories?: { id: number; name: string; slug: string; image: string | null; description: string | null }[];
    popularProducts?: { id: number; category_id: number; name: string; slug: string; description: string | null; selling_price: number; discount_type: string | null; discount_value: number; images: { image: string }[]; category: { name: string } | null; reviews_count: number }[];
    brands?: { id: number; name: string; slug: string; logo: string | null; description: string | null }[];
}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [paused, setPaused] = useState(false);
    const slide = heroSlides[currentSlide];

    const handleSlideChange = (index: number) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (paused) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [paused]);

    return (
        <>
            <Head title="RevPerformance - Auto Repair & Performance Service">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet" />
            </Head>

            <div className="relative min-h-screen bg-[#0D0D0D] font-['Inter'] antialiased selection:bg-[#FF4D00]/30">
                <LandingNavigation
                    isScrolled={isScrolled}
                    mobileMenuOpen={mobileMenuOpen}
                    onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
                    canRegister={canRegister}
                    categories={categories}
                />

                {/* Hero Slider - 2 slides */}
                <section
                    className="relative flex min-h-screen items-center overflow-hidden"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {heroSlides.map((s, i) => s.image ? (
                        <img
                            key={i}
                            src={s.image}
                            alt={s.alt}
                            loading={i === 0 ? undefined : 'lazy'}
                            className={cn(
                                'absolute inset-0 h-full w-full object-cover transition-all duration-1000',
                                i === currentSlide ? 'opacity-100' : 'opacity-0'
                            )}
                            style={i === currentSlide ? { animation: 'heroZoom 8s ease-out forwards' } : undefined}
                        />
                    ) : (
                        <div
                            key={i}
                            className={cn(
                                'absolute inset-0 transition-all duration-1000',
                                i === currentSlide ? 'opacity-100' : 'opacity-0'
                            )}
                        >
                            <div className="absolute inset-0 bg-[#0D0D0D]" />
                            <div className="absolute inset-0 opacity-30"
                                style={{
                                    backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(255,77,0,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(255,77,0,0.08) 0%, transparent 50%)',
                                }}
                            />
                        </div>
                    ))}
                    <div className={cn(
                        'absolute inset-0 transition-all duration-1000',
                        heroSlides[currentSlide].image ? 'bg-gradient-to-r from-[#0D0D0D]/90 via-[#0D0D0D]/60 to-transparent' : ''
                    )} />

                    <button
                        onClick={() => handleSlideChange((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
                        className="absolute left-4 z-20 flex h-12 w-12 items-center justify-center border border-white/10 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-[#FF4D00]/80 lg:left-8"
                        style={{ opacity: '0' }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                        aria-label="Previous slide"
                    >
                        <ChevronRight className="h-5 w-5 rotate-180" />
                    </button>
                    <button
                        onClick={() => handleSlideChange((currentSlide + 1) % heroSlides.length)}
                        className="absolute right-4 z-20 flex h-12 w-12 items-center justify-center border border-white/10 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-[#FF4D00]/80 lg:right-8"
                        style={{ opacity: '0' }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                        aria-label="Next slide"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>

                    <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
                        <div className="max-w-3xl">
                            <div key={`badge-${currentSlide}`} className="mb-4 inline-flex items-center gap-2 border border-[#FF4D00]/30 bg-[#FF4D00]/10 backdrop-blur-sm px-4 py-1.5">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF4D00]" />
                                <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">{slide.badge}</span>
                            </div>
                            <h1 key={`title-${currentSlide}`} className="font-['Montserrat'] text-6xl font-black leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl">
                                {slide.headline}
                                <br />
                                <span className="text-[#FF4D00]">{slide.headlineAccent}</span>
                            </h1>
                            <p key={`desc-${currentSlide}`} className="mt-6 max-w-xl font-['Inter'] text-lg leading-relaxed text-[#B5B5B5]">
                                {slide.description}
                            </p>
                            <div key={`cta-${currentSlide}`} className="mt-8 flex flex-wrap gap-4">
                                <Button variant="outline" className="h-14 rounded-none border-white/20 bg-transparent px-10 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-white/5 hover:border-white/40">
                                    {slide.secondaryCta}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Slide indicators */}
                    <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
                        {heroSlides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handleSlideChange(i)}
                                className={cn(
                                    'transition-all duration-500',
                                    i === currentSlide
                                        ? 'h-0.5 w-10 bg-[#FF4D00]'
                                        : 'h-0.5 w-6 bg-white/30 hover:bg-white/60'
                                )}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </section>

                {/* Section 1: Service Categories */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-24">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <FadeUp>
                            <div className="mb-12 flex items-end justify-between">
                                <div>
                                    <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Categories</span>
                                    <h2 className="mt-2 font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">Explore Our Services</h2>
                                </div>
                                <Link href="#" className="hidden items-center gap-2 text-sm font-semibold text-[#B5B5B5] transition-colors hover:text-white md:flex">
                                    View All <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </FadeUp>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {servicePackages.length > 0 ? servicePackages.slice(0, 6).map((pkg, i) => {
                                const IconComponent = [Wrench, Settings, Shield, Gauge, Zap, Clock, Award][i % 7];
                                return (
                                    <FadeUp key={pkg.id} delay={i * 80}>
                                        <Link
                                            href="/book-an-appointment"
                                            className="group flex flex-col items-center gap-4 rounded-lg border border-white/5 bg-[#171717] px-8 py-12 text-center transition-all duration-300 hover:border-[#FF4D00]/30 hover:shadow-[0_0_40px_rgba(255,77,0,0.08)]"
                                        >
                                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF4D00]/10 transition-colors duration-300 group-hover:bg-[#FF4D00]/20">
                                                <IconComponent className="h-7 w-7 text-[#FF4D00]" />
                                            </div>
                                            <h3 className="font-['Montserrat'] text-lg font-bold text-white">{pkg.name}</h3>
                                            {pkg.description && (
                                                <p className="font-['Inter'] text-sm leading-relaxed text-[#B5B5B5]">{pkg.description}</p>
                                            )}
                                            {pkg.duration && (
                                                <span className="font-['Inter'] text-xs text-[#B5B5B5]/60">{pkg.duration} min</span>
                                            )}
                                        </Link>
                                    </FadeUp>
                                );
                            }) : (
                                <div className="col-span-full py-12 text-center">
                                    <p className="font-['Inter'] text-base text-[#B5B5B5]">No service packages available yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Section 2: Shop by Category */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-24">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <FadeUp>
                            <div className="mb-12 flex items-end justify-between">
                                <div>
                                    <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Categories</span>
                                    <h2 className="mt-2 font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">Shop by Category</h2>
                                </div>
                                <Link href="#" className="hidden items-center gap-2 text-sm font-semibold text-[#B5B5B5] transition-colors hover:text-white md:flex">
                                    View All <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </FadeUp>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {categories.length > 0 ? categories.map((cat, i) => {
                                const fallbackImages = [imgs.engine, imgs.brake, imgs.oil, imgs.tire, imgs.electrical, imgs.tuning, imgs.transmission, imgs.alignment];
                                const catImage = cat.image && cat.image.length > 0 ? `/storage/${cat.image}` : fallbackImages[i % fallbackImages.length];
                                return (
                                    <FadeUp key={cat.id} delay={i * 80}>
                                        <Link
                                            href={`/collections/${cat.slug}`}
                                            className="group relative flex aspect-[4/5] flex-col items-center justify-end overflow-hidden bg-[#171717] text-center transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,77,0,0.1)]"
                                        >
                                            <img
                                                src={catImage}
                                                alt={cat.name}
                                                className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-[#0D0D0D]/40 to-transparent" />
                                            <div className="relative z-10 w-full p-6">
                                                <h3 className="font-['Montserrat'] text-lg font-bold text-white">{cat.name}</h3>
                                                {cat.description && (
                                                    <p className="mt-1 font-['Inter'] text-sm text-[#B5B5B5] line-clamp-2">{cat.description}</p>
                                                )}
                                            </div>
                                        </Link>
                                    </FadeUp>
                                );
                            }) : (
                                <div className="col-span-full py-12 text-center">
                                    <p className="font-['Inter'] text-base text-[#B5B5B5]">No categories available yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Section 3: Most Popular */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-24">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <FadeUp>
                            <div className="mb-12 flex items-end justify-between">
                                <div>
                                    <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Top Rated</span>
                                    <h2 className="mt-2 font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">Most Popular</h2>
                                </div>
                                <Link href="#" className="hidden items-center gap-2 text-sm font-semibold text-[#B5B5B5] transition-colors hover:text-white md:flex">
                                    View All <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </FadeUp>
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {popularProducts.length > 0 ? popularProducts.map((product, i) => (
                                <FadeUp key={product.id} delay={i * 100}>
                                    <Link href={`/product-details/${product.slug}`} className="group relative cursor-pointer">
                                        <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-sm bg-[#171717]">
                                            <img
                                                src={product.images.length > 0 ? `/storage/${product.images[0].image}` : imgs.engine}
                                                alt={product.name}
                                                loading="lazy"
                                                className="absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-0" />
                                            {product.discount_value > 0 && (
                                                <span className="absolute left-3 top-3 z-10 bg-[#FF4D00] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                                                    {product.discount_type === 'percentage' ? `${product.discount_value}% Off` : `$${product.discount_value} Off`}
                                                </span>
                                            )}
                                            <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-all duration-300 group-hover:translate-y-0">
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        className="flex-1 bg-[#FF4D00] text-white hover:bg-[#FF4D00]/90 text-[11px] uppercase tracking-wider font-semibold h-10 rounded-none"
                                                    >
                                                        Add to Cart
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            {product.category && (
                                                <span className="font-['Inter'] text-[11px] text-[#FF4D00]">{product.category.name}</span>
                                            )}
                                            <h3 className="font-['Montserrat'] text-sm font-bold text-white line-clamp-2">{product.name}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className="font-['Inter'] text-base font-semibold text-[#FF4D00]">
                                                    ${product.discount_value > 0
                                                        ? (Number(product.selling_price) - (product.discount_type === 'percentage' ? Number(product.selling_price) * product.discount_value / 100 : product.discount_value)).toFixed(2)
                                                        : Number(product.selling_price).toFixed(2)}
                                                </span>
                                                {product.discount_value > 0 && (
                                                    <span className="font-['Inter'] text-sm text-[#666] line-through">${Number(product.selling_price).toFixed(2)}</span>
                                                )}
                                            </div>
                                            {product.reviews_count > 0 && (
                                                <span className="font-['Inter'] text-xs text-[#B5B5B5]">({product.reviews_count} reviews)</span>
                                            )}
                                        </div>
                                    </Link>
                                </FadeUp>
                            )) : (
                                <div className="col-span-full py-12 text-center">
                                    <p className="font-['Inter'] text-base text-[#B5B5B5]">No popular products yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Section 4: Why Choose Us */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-24">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <FadeUp>
                            <div className="relative overflow-hidden bg-[#171717]">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00]/10 to-transparent" />
                                <div className="relative z-10 grid items-center gap-12 md:grid-cols-2 md:p-20 p-12">
                                    <div>
                                        <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Why Choose Us</span>
                                        <h2 className="mt-3 font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">Precision Auto Care</h2>
                                        <p className="mt-4 font-['Inter'] text-base leading-relaxed text-[#B5B5B5]">
                                            With over 20 years of experience, our certified technicians use state-of-the-art diagnostic equipment and premium parts to deliver exceptional service on every vehicle.
                                        </p>
                                        <div className="mt-8 grid grid-cols-2 gap-6">
                                            {[
                                                { icon: Wrench, label: 'Certified Technicians', desc: 'ASE-certified experts' },
                                                { icon: Shield, label: 'Quality Guarantee', desc: '12-month warranty on repairs' },
                                                { icon: Clock, label: 'Fast Turnaround', desc: 'Most services same-day' },
                                                { icon: Award, label: 'Premium Parts', desc: 'OEM & top-tier brands' },
                                            ].map(({ icon: Icon, label, desc }) => (
                                                <div key={label} className="flex items-start gap-3">
                                                    <Icon className="mt-1 h-5 w-5 shrink-0 text-[#FF4D00]" />
                                                    <div>
                                                        <div className="font-['Montserrat'] text-sm font-bold text-white">{label}</div>
                                                        <div className="font-['Inter'] text-xs text-[#B5B5B5]">{desc}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Link
                                            href="/book-an-appointment"
                                            className="mt-8 inline-flex h-12 items-center rounded-none bg-[#FF4D00] px-8 text-sm font-bold uppercase tracking-[0.15em] text-white hover:bg-[#FF4D00]/90"
                                        >
                                            Book an Appointment <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </div>
                                    <div className="relative hidden aspect-square overflow-hidden md:block">
                                        <img
                                            src={imgs.about}
                                            alt="Our auto repair shop"
                                            loading="lazy"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </section>

                {/* Section 5: Brand Partners */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-24">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <FadeUp>
                            <div className="mb-12 text-center">
                                <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Brands</span>
                                <h2 className="mt-2 font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">Parts Brands We Trust</h2>
                                <p className="mx-auto mt-4 max-w-xl font-['Inter'] text-base text-[#B5B5B5]">
                                    We use only the highest quality parts from the world's most respected manufacturers.
                                </p>
                            </div>
                        </FadeUp>
                        <div className="grid grid-cols-2 gap-px bg-white/5 md:grid-cols-4">
                            {brands.length > 0 ? brands.map((brand, i) => (
                                <FadeUp key={brand.id} delay={i * 60}>
                                    <div className="flex h-32 items-center justify-center bg-[#171717] transition-all hover:bg-[#1f1f1f] group">
                                        {brand.logo ? (
                                            <img
                                                src={`/storage/${brand.logo}`}
                                                alt={brand.name}
                                                className="max-h-12 max-w-[160px] object-contain opacity-40 transition-all group-hover:opacity-70"
                                            />
                                        ) : (
                                            <span className="font-['Montserrat'] text-xl font-bold tracking-wider text-white/20 transition-all group-hover:text-white/40">
                                                {brand.name}
                                            </span>
                                        )}
                                    </div>
                                </FadeUp>
                            )) : (
                                <div className="col-span-full py-12 text-center">
                                    <p className="font-['Inter'] text-base text-[#B5B5B5]">No brands available yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Section 6: Service Specials */}
                <section className="relative overflow-hidden border-t border-white/5 bg-[#0D0D0D]">
                    <div className="relative flex min-h-[450px] items-center justify-center px-6 py-24">
                        <img
                            src={imgs.promo}
                            alt="Service specials"
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#0D0D0D]/80" />
                        <FadeUp>
                            <div className="relative z-10 max-w-2xl text-center">
                                <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Limited Offer</span>
                                <h2 className="mt-4 font-['Montserrat'] text-5xl font-black leading-tight text-white md:text-6xl">
                                    Summer Service<br />
                                    <span className="text-[#FF4D00]">Specials — Up to 25% Off</span>
                                </h2>
                                <p className="mx-auto mt-4 max-w-lg font-['Inter'] text-base text-[#B5B5B5]">
                                    Oil changes, brake services, tire rotations, and more — premium care at exceptional value.
                                </p>
                                <div className="mt-8 flex items-center justify-center gap-4">
                                    <Button className="h-14 rounded-none bg-[#FF4D00] px-10 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#FF4D00]/90 hover:shadow-[0_0_40px_rgba(255,77,0,0.3)]">
                                        Claim Offer
                                    </Button>
                                    <span className="font-['Inter'] text-sm text-[#B5B5B5]">Ends August 31</span>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </section>

                {/* Section 8: Customer Reviews */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-24">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <FadeUp>
                            <div className="mb-12 text-center">
                                <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Testimonials</span>
                                <h2 className="mt-2 font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">What Our Customers Say</h2>
                            </div>
                        </FadeUp>
                        <div className="grid gap-6 md:grid-cols-2">
                            {reviews.map((review, i) => (
                                <FadeUp key={review.name} delay={i * 100}>
                                    <div className="border border-white/5 bg-[#171717] p-8 transition-all hover:border-white/10 hover:shadow-[0_0_30px_rgba(255,77,0,0.05)]">
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, j) => (
                                                <Star
                                                    key={j}
                                                    className={cn(
                                                        'h-4 w-4',
                                                        j < review.rating ? 'fill-[#FF4D00] text-[#FF4D00]' : 'text-[#333]'
                                                    )}
                                                />
                                            ))}
                                        </div>
                                        <p className="mt-4 font-['Inter'] text-base leading-relaxed text-[#B5B5B5]">"{review.text}"</p>
                                        <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-6">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF4D00]/20 text-sm font-bold text-[#FF4D00]">
                                                {review.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="font-['Inter'] text-sm font-semibold text-white">{review.name}</div>
                                                <div className="font-['Inter'] text-xs text-[#B5B5B5]">{review.car}</div>
                                            </div>
                                        </div>
                                    </div>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 9: Instagram Gallery */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-24">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <FadeUp>
                            <div className="mb-12 flex items-end justify-between">
                                <div>
                                    <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">@revautocare</span>
                                    <h2 className="mt-2 font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">Follow Our Work</h2>
                                </div>
                                <Link href="#" className="hidden items-center gap-2 text-sm font-semibold text-[#B5B5B5] transition-colors hover:text-white md:flex">
                                    <Instagram className="h-4 w-4" /> Follow Us
                                </Link>
                            </div>
                        </FadeUp>
                        <div className="grid grid-cols-2 gap-1 md:grid-cols-4">
                            {instagramPosts.map((src, i) => (
                                <FadeUp key={i} delay={i * 60}>
                                    <Link href="#" className="group relative block aspect-square overflow-hidden bg-[#171717]">
                                        <img
                                            src={src}
                                            alt={`Instagram post ${i + 1}`}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/40">
                                            <Instagram className="h-8 w-8 text-white opacity-0 transition-all group-hover:opacity-100" />
                                        </div>
                                    </Link>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section 10: Newsletter Signup */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-24">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <FadeUp>
                            <div className="mx-auto max-w-2xl text-center">
                                <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Newsletter</span>
                                <h2 className="mt-3 font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">Stay in the Loop</h2>
                                <p className="mx-auto mt-4 max-w-md font-['Inter'] text-base text-[#B5B5B5]">
                                    Get exclusive offers, maintenance tips, and service reminders straight to your inbox.
                                </p>
                                <form
                                    onSubmit={(e) => e.preventDefault()}
                                    className="mx-auto mt-8 flex max-w-md gap-3"
                                >
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="h-12 flex-1 rounded-none border-white/10 bg-[#171717] px-4 text-sm text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                    />
                                    <Button className="h-12 rounded-none bg-[#FF4D00] px-6 text-sm font-bold uppercase tracking-[0.15em] text-white hover:bg-[#FF4D00]/90">
                                        Subscribe
                                    </Button>
                                </form>
                            </div>
                        </FadeUp>
                    </div>
                </section>

                <LandingFooter />
            </div>

            <style>{`
                @keyframes heroZoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.08); }
                }
            `}</style>
        </>
    );
}
