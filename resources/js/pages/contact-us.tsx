import { Head, Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import LandingNavigation from '@/components/landing-navigation';
import LandingFooter from '@/components/landing-footer';
import {
    ArrowUpRight,
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    CheckCircle,
    Wrench,
} from 'lucide-react';
import { useEffect, useState, useRef, type ReactNode } from 'react';

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

export default function ContactUs() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <>
            <Head title="Contact Us - RevAuto Care">
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
                <section className="relative flex min-h-[40vh] items-center overflow-hidden pt-24">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FF4D00]/5 to-transparent" />
                    <div className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(255,77,0,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(255,77,0,0.06) 0%, transparent 50%)',
                        }}
                    />
                    <div className="relative mx-auto max-w-[1440px] px-6 py-20 lg:px-12 text-center">
                        <div className="mb-4 inline-flex items-center gap-2 border border-[#FF4D00]/30 bg-[#FF4D00]/10 backdrop-blur-sm px-4 py-1.5">
                            <Phone className="h-4 w-4 text-[#FF4D00]" />
                            <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Get in Touch</span>
                        </div>
                        <h1 className="font-['Montserrat'] text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
                            Contact <span className="text-[#FF4D00]">Us</span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl font-['Inter'] text-lg leading-relaxed text-[#B5B5B5]">
                            Have a question, need a quote, or ready to book? We are here to help. Reach out to us anytime.
                        </p>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-16">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <div className="grid gap-12 lg:grid-cols-5">

                            {/* Form */}
                            <div className="lg:col-span-3">
                                {submitted ? (
                                    <FadeUp>
                                        <div className="flex flex-col items-center justify-center rounded-sm border border-[#FF4D00]/20 bg-[#FF4D00]/5 px-8 py-16 text-center">
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FF4D00]/10">
                                                <CheckCircle className="h-10 w-10 text-[#FF4D00]" />
                                            </div>
                                            <h2 className="mt-6 font-['Montserrat'] text-2xl font-bold text-white">Message Sent!</h2>
                                            <p className="mt-3 max-w-md font-['Inter'] text-base text-[#B5B5B5]">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                                            <Button
                                                onClick={() => setSubmitted(false)}
                                                className="mt-8 h-12 rounded-none bg-[#FF4D00] px-8 text-sm font-bold uppercase tracking-[0.15em] text-white hover:bg-[#FF4D00]/90"
                                            >
                                                Send Another Message
                                            </Button>
                                        </div>
                                    </FadeUp>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="rounded-sm border border-white/5 bg-[#171717] p-6 md:p-8">
                                            <h2 className="font-['Montserrat'] text-lg font-bold text-white">Send Us a Message</h2>
                                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                                <div className="grid gap-2 sm:col-span-2">
                                                    <Label htmlFor="name" className="text-sm font-semibold text-[#B5B5B5]">Full Name *</Label>
                                                    <Input
                                                        id="name"
                                                        required
                                                        placeholder="John Doe"
                                                        className="h-11 rounded-none border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="email" className="text-sm font-semibold text-[#B5B5B5]">Email Address *</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        required
                                                        placeholder="john@example.com"
                                                        className="h-11 rounded-none border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="phone" className="text-sm font-semibold text-[#B5B5B5]">Phone Number</Label>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="+1 (555) 000-0000"
                                                        className="h-11 rounded-none border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                                    />
                                                </div>
                                                <div className="grid gap-2 sm:col-span-2">
                                                    <Label htmlFor="subject" className="text-sm font-semibold text-[#B5B5B5]">Subject *</Label>
                                                    <Input
                                                        id="subject"
                                                        required
                                                        placeholder="How can we help you?"
                                                        className="h-11 rounded-none border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                                    />
                                                </div>
                                                <div className="grid gap-2 sm:col-span-2">
                                                    <Label htmlFor="message" className="text-sm font-semibold text-[#B5B5B5]">Message *</Label>
                                                    <textarea
                                                        id="message"
                                                        required
                                                        rows={5}
                                                        placeholder="Tell us about your inquiry..."
                                                        className="border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0 flex w-full rounded-none border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            type="submit"
                                            className="h-14 w-full rounded-none bg-[#FF4D00] text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#FF4D00]/90 hover:shadow-[0_0_40px_rgba(255,77,0,0.3)]"
                                        >
                                            Send Message <Send className="ml-2 h-4 w-4" />
                                        </Button>
                                    </form>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-2 space-y-6">
                                <FadeUp delay={100}>
                                    <div className="rounded-sm border border-white/5 bg-[#171717] p-6">
                                        <h3 className="font-['Montserrat'] text-base font-bold text-white">Contact Information</h3>
                                        <ul className="mt-4 space-y-4">
                                            {[
                                                { icon: MapPin, label: 'Address', text: '123 Performance Blvd\nLos Angeles, CA 90001' },
                                                { icon: Phone, label: 'Phone', text: '+1 (800) 555-REV\n+1 (800) 555-7338' },
                                                { icon: Mail, label: 'Email', text: 'service@revauto.care\nsupport@revauto.care' },
                                            ].map(({ icon: Icon, label, text }) => (
                                                <li key={label} className="flex items-start gap-3">
                                                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#FF4D00]" />
                                                    <div>
                                                        <span className="block font-['Inter'] text-xs font-semibold uppercase tracking-wider text-[#666]">{label}</span>
                                                        <span className="mt-0.5 block font-['Inter'] text-sm text-[#B5B5B5] whitespace-pre-line">{text}</span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </FadeUp>

                                <FadeUp delay={200}>
                                    <div className="rounded-sm border border-white/5 bg-[#171717] p-6">
                                        <h3 className="font-['Montserrat'] text-base font-bold text-white">Business Hours</h3>
                                        <ul className="mt-4 space-y-3">
                                            {[
                                                { day: 'Monday - Friday', hours: '7:00 AM - 7:00 PM' },
                                                { day: 'Saturday', hours: '8:00 AM - 5:00 PM' },
                                                { day: 'Sunday', hours: 'Closed' },
                                            ].map(({ day, hours }) => (
                                                <li key={day} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                                    <span className="font-['Inter'] text-sm text-[#B5B5B5]">{day}</span>
                                                    <span className={cn(
                                                        "font-['Inter'] text-sm font-semibold",
                                                        hours === 'Closed' ? 'text-[#FF4D00]' : 'text-white'
                                                    )}>{hours}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </FadeUp>

                                <FadeUp delay={300}>
                                    <div className="rounded-sm border border-white/5 bg-[#171717] p-6">
                                        <h3 className="font-['Montserrat'] text-base font-bold text-white">Quick Links</h3>
                                        <div className="mt-4 space-y-3">
                                            {[
                                                { href: '/book-an-appointment', label: 'Book an Appointment' },
                                                { href: '/about-us', label: 'About Us' },
                                            ].map(({ href, label }) => (
                                                <Link
                                                    key={href}
                                                    href={href}
                                                    className="flex items-center justify-between rounded-sm px-3 py-2 font-['Inter'] text-sm text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white"
                                                >
                                                    {label} <ArrowUpRight className="h-3.5 w-3.5" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </FadeUp>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-16">
                        <FadeUp>
                            <div className="text-center">
                                <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Visit Us</span>
                                <h2 className="mt-3 font-['Montserrat'] text-4xl font-bold text-white md:text-5xl">Find Our Shop</h2>
                            </div>
                        </FadeUp>
                        <FadeUp delay={100}>
                            <div className="mt-10 aspect-[21/9] max-h-[450px] w-full overflow-hidden bg-[#171717]">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.041343166527!2d-118.243686!3d34.052235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22b2c7f3e5b5b!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, minHeight: '400px' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="RevAuto Care Location"
                                    className="opacity-70 grayscale contrast-125"
                                />
                            </div>
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-center">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-[#FF4D00]" />
                                    <span className="font-['Inter'] text-sm text-[#B5B5B5]">123 Performance Blvd, Los Angeles, CA 90001</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-[#FF4D00]" />
                                    <span className="font-['Inter'] text-sm text-[#B5B5B5]">+1 (800) 555-REV</span>
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
