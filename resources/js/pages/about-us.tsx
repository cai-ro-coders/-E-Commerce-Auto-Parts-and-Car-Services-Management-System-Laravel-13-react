import { Head, Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import LandingNavigation from '@/components/landing-navigation';
import LandingFooter from '@/components/landing-footer';
import {
    ChevronRight,
    Star,
    ArrowUpRight,
    Wrench,
    Shield,
    Clock,
    Award,
    Users,
    MapPin,
    Phone,
    Mail,
    CheckCircle,
    Quote,
} from 'lucide-react';
import { useEffect, useState, useRef, type ReactNode } from 'react';

const imgs = {
    about: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1920&q=80',
    team: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1920&q=80',
    workshop: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1920&q=80',
    tools: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1200&q=80',
    team2: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=1200&q=80',
    hero: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?auto=format&fit=crop&w=1920&q=80',
};

const team = [
    { name: 'James Mitchell', role: 'Founder & Master Technician', experience: '25+ years', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', bio: 'ASE Master Certified with a passion for precision engineering.' },
    { name: 'Sarah Chen', role: 'Lead Diagnostic Specialist', experience: '18+ years', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', bio: 'Expert in modern vehicle diagnostics and electronic systems.' },
    { name: 'Marcus Williams', role: 'Performance Shop Manager', experience: '20+ years', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', bio: 'Specializes in high-performance builds and custom tuning.' },
    { name: 'Emily Rodriguez', role: 'Service Advisor', experience: '12+ years', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80', bio: 'Dedicated to providing transparent and personalized customer care.' },
];

const milestones = [
    { year: '2004', title: 'Founded', desc: 'Opened our first 2-bay garage with a focus on quality.' },
    { year: '2010', title: 'Expanded', desc: 'Moved to a 12-bay facility with state-of-the-art equipment.' },
    { year: '2016', title: 'Certified', desc: 'All technicians achieved ASE Master certification.' },
    { year: '2020', title: 'Performance Division', desc: 'Launched dedicated performance tuning department.' },
    { year: '2024', title: 'Today', desc: 'Serving 5000+ satisfied customers annually.' },
];

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

export default function AboutUs() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="About Us - RevAuto Care">
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

                {/* Hero */}
                <section className="relative flex min-h-[50vh] items-center overflow-hidden">
                    <img src={imgs.hero} alt="About RevAuto Care" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D]/95 via-[#0D0D0D]/80 to-[#0D0D0D]/60" />
                    <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12 pt-24">
                        <FadeUp>
                            <div className="mb-4 inline-flex items-center gap-2 border border-[#FF4D00]/30 bg-[#FF4D00]/10 backdrop-blur-sm px-4 py-1.5">
                                <Users className="h-4 w-4 text-[#FF4D00]" />
                                <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">About Us</span>
                            </div>
                            <h1 className="font-['Montserrat'] text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
                                Driven by Passion,<br />
                                <span className="text-[#FF4D00]">Built on Trust</span>
                            </h1>
                            <p className="mt-4 max-w-xl font-['Inter'] text-lg leading-relaxed text-[#B5B5B5]">
                                For over two decades, RevAuto Care has been the gold standard in automotive service — combining technical expertise with genuine customer care.
                            </p>
                        </FadeUp>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <div className="grid grid-cols-2 divide-x divide-white/5 border-b border-white/5 md:grid-cols-4">
                            {[
                                { number: '20+', label: 'Years Experience' },
                                { number: '50K+', label: 'Vehicles Serviced' },
                                { number: '4.9', label: 'Customer Rating' },
                                { number: '12', label: 'Month Warranty' },
                            ].map((stat, i) => (
                                <FadeUp key={stat.label} delay={i * 100}>
                                    <div className="flex flex-col items-center justify-center py-12 md:py-16">
                                        <span className="font-['Montserrat'] text-4xl font-black text-[#FF4D00] md:text-5xl">{stat.number}</span>
                                        <span className="mt-2 font-['Inter'] text-sm font-semibold uppercase tracking-[0.1em] text-[#B5B5B5]">{stat.label}</span>
                                    </div>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-24">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <FadeUp>
                                <div className="relative">
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <img src={imgs.workshop} alt="Our workshop" loading="lazy" className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/60 to-transparent" />
                                    </div>
                                    <div className="absolute -bottom-6 -right-6 flex items-center gap-4 border border-[#FF4D00]/20 bg-[#0D0D0D] p-6">
                                        <Quote className="h-8 w-8 text-[#FF4D00]" />
                                        <p className="max-w-[200px] font-['Inter'] text-sm italic text-[#B5B5B5]">Quality is not an act, it is a habit.</p>
                                    </div>
                                </div>
                            </FadeUp>
                            <div className="lg:pl-8">
                                <FadeUp delay={100}>
                                    <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Our Story</span>
                                    <h2 className="mt-3 font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">Two Decades of<br />Automotive Excellence</h2>
                                </FadeUp>
                                <FadeUp delay={200}>
                                    <p className="mt-6 font-['Inter'] text-base leading-relaxed text-[#B5B5B5]">
                                        Founded in 2004 by Master Technician James Mitchell, RevAuto Care started as a small two-bay garage with a simple mission: provide honest, high-quality automotive service that puts the customer first.
                                    </p>
                                    <p className="mt-4 font-['Inter'] text-base leading-relaxed text-[#B5B5B5]">
                                        Today, we've grown into a premier 12-bay facility serving thousands of satisfied customers each year. Our team of ASE-certified technicians combines decades of experience with cutting-edge diagnostic technology to deliver service that exceeds expectations.
                                    </p>
                                    <p className="mt-4 font-['Inter'] text-base leading-relaxed text-[#B5B5B5]">
                                        From routine maintenance to high-performance builds, every vehicle that leaves our shop is a testament to our commitment to quality, transparency, and craftsmanship.
                                    </p>
                                </FadeUp>
                                <FadeUp delay={300}>
                                    <div className="mt-8 flex flex-wrap gap-6">
                                        {[
                                            { icon: CheckCircle, text: 'ASE Certified Technicians' },
                                            { icon: CheckCircle, text: 'State-of-the-Art Diagnostics' },
                                            { icon: CheckCircle, text: 'Premium Parts & Materials' },
                                        ].map(({ icon: Icon, text }) => (
                                            <div key={text} className="flex items-center gap-2">
                                                <Icon className="h-4 w-4 text-[#FF4D00]" />
                                                <span className="font-['Inter'] text-sm text-[#B5B5B5]">{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </FadeUp>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Values */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-24">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <FadeUp>
                            <div className="text-center">
                                <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Our Values</span>
                                <h2 className="mt-3 font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">What We Stand For</h2>
                            </div>
                        </FadeUp>
                        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {[
                                { icon: Wrench, title: 'Expertise', desc: 'Continuous training and certification keep our team at the forefront of automotive technology.' },
                                { icon: Shield, title: 'Integrity', desc: 'Honest diagnostics, transparent pricing, and recommendations that put your needs first.' },
                                { icon: Clock, title: 'Efficiency', desc: 'We respect your time with accurate estimates, timely service, and proactive updates.' },
                                { icon: Award, title: 'Quality', desc: 'Every repair is backed by our 12-month warranty and a commitment to lasting results.' },
                            ].map(({ icon: Icon, title, desc }, i) => (
                                <FadeUp key={title} delay={i * 100}>
                                    <div className="group border border-white/5 bg-[#171717] p-8 transition-all duration-300 hover:border-[#FF4D00]/30 hover:shadow-[0_0_40px_rgba(255,77,0,0.08)]">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF4D00]/10 transition-colors group-hover:bg-[#FF4D00]/20">
                                            <Icon className="h-7 w-7 text-[#FF4D00]" />
                                        </div>
                                        <h3 className="mt-6 font-['Montserrat'] text-lg font-bold text-white">{title}</h3>
                                        <p className="mt-3 font-['Inter'] text-sm leading-relaxed text-[#B5B5B5]">{desc}</p>
                                    </div>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Timeline */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-24">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <FadeUp>
                            <div className="text-center">
                                <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Milestones</span>
                                <h2 className="mt-3 font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">Our Journey</h2>
                            </div>
                        </FadeUp>
                        <div className="relative mt-16">
                            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-[#FF4D00]/40 via-[#FF4D00]/20 to-transparent" />
                            <div className="space-y-12">
                                {milestones.map((m, i) => (
                                    <FadeUp key={m.year} delay={i * 100}>
                                        <div className={cn('relative flex items-center gap-8', i % 2 === 0 ? 'flex-row' : 'flex-row-reverse')}>
                                            <div className={cn('flex-1', i % 2 === 0 ? 'text-right' : 'text-left')}>
                                                <div className={cn('inline-block border border-white/5 bg-[#171717] p-6', i % 2 === 0 ? 'mr-8' : 'ml-8')}>
                                                    <span className="font-['Montserrat'] text-2xl font-black text-[#FF4D00]">{m.year}</span>
                                                    <h3 className="mt-1 font-['Montserrat'] text-lg font-bold text-white">{m.title}</h3>
                                                    <p className="mt-1 font-['Inter'] text-sm text-[#B5B5B5]">{m.desc}</p>
                                                </div>
                                            </div>
                                            <div className="absolute left-1/2 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#FF4D00] bg-[#0D0D0D]" />
                                            <div className="flex-1" />
                                        </div>
                                    </FadeUp>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-24">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <FadeUp>
                            <div className="text-center">
                                <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Our Team</span>
                                <h2 className="mt-3 font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">Meet the Experts</h2>
                                <p className="mx-auto mt-4 max-w-xl font-['Inter'] text-base text-[#B5B5B5]">
                                    Our certified technicians bring decades of combined experience and a genuine passion for automotive excellence.
                                </p>
                            </div>
                        </FadeUp>
                        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {team.map((member, i) => (
                                <FadeUp key={member.name} delay={i * 100}>
                                    <div className="group relative overflow-hidden">
                                        <div className="relative aspect-[3/4] overflow-hidden bg-[#171717]">
                                            <img
                                                src={member.image}
                                                alt={member.name}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/90 via-[#0D0D0D]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                        </div>
                                        <div className="mt-4">
                                            <h3 className="font-['Montserrat'] text-base font-bold text-white">{member.name}</h3>
                                            <p className="font-['Inter'] text-sm text-[#FF4D00]">{member.role}</p>
                                            <p className="mt-1 font-['Inter'] text-xs text-[#666]">{member.experience} experience</p>
                                            <p className="mt-2 font-['Inter'] text-sm leading-relaxed text-[#B5B5B5]">{member.bio}</p>
                                        </div>
                                    </div>
                                </FadeUp>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonial */}
                <section className="relative overflow-hidden border-t border-white/5 bg-[#0D0D0D]">
                    <div className="relative flex min-h-[400px] items-center justify-center px-6 py-24">
                        <img src={imgs.tools} alt="Tools" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 bg-[#0D0D0D]/85" />
                        <FadeUp>
                            <div className="relative z-10 max-w-3xl text-center">
                                <Quote className="mx-auto h-10 w-10 text-[#FF4D00]" />
                                <blockquote className="mt-6 font-['Inter'] text-xl leading-relaxed text-[#B5B5B5] italic md:text-2xl">
                                    "RevAuto Care has been maintaining my fleet for over a decade. Their attention to detail, fair pricing, and technical expertise are unmatched. I wouldn't trust my vehicles with anyone else."
                                </blockquote>
                                <div className="mt-8 flex items-center justify-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FF4D00]/20 text-lg font-bold text-[#FF4D00]">
                                        DT
                                    </div>
                                    <div className="text-left">
                                        <div className="font-['Inter'] text-sm font-semibold text-white">David Thompson</div>
                                        <div className="font-['Inter'] text-xs text-[#B5B5B5]">Fleet Manager, Thompson Logistics</div>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-center gap-1">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <Star key={j} className="h-5 w-5 fill-[#FF4D00] text-[#FF4D00]" />
                                    ))}
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </section>

                {/* CTA */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-24">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <FadeUp>
                            <div className="relative overflow-hidden bg-[#171717] p-12 text-center md:p-20">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF4D00]/5 to-transparent" />
                                <div className="relative z-10">
                                    <h2 className="font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">Ready to Experience the Difference?</h2>
                                    <p className="mx-auto mt-4 max-w-lg font-['Inter'] text-base text-[#B5B5B5]">
                                        Schedule your appointment today and discover why thousands of drivers trust RevAuto Care.
                                    </p>
                                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                                        <Link
                                            href="/book-an-appointment"
                                            className="inline-flex h-14 items-center rounded-none bg-[#FF4D00] px-10 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#FF4D00]/90 hover:shadow-[0_0_40px_rgba(255,77,0,0.3)]"
                                        >
                                            Book an Appointment <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Link>
                                        <Link
                                            href="/contact-us"
                                            className="inline-flex h-14 items-center rounded-none border border-white/20 px-10 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-white/5"
                                        >
                                            Contact Us
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </section>

                <LandingFooter />
            </div>
        </>
    );
}
