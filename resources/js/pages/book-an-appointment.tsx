import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import LandingNavigation from '@/components/landing-navigation';
import LandingFooter from '@/components/landing-footer';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    CalendarDays,
    Clock,
    Wrench,
    CheckCircle,
    ArrowLeft,
    ChevronRight,
    Star,
    Phone,
    Mail,
    MapPin,
    Shield,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface ServicePackage {
    id: number;
    name: string;
    description: string | null;
    price: number;
    duration: number | null;
}

interface VehicleModel {
    id: number;
    name: string;
    make_id: number;
}

interface VehicleMake {
    id: number;
    name: string;
    models: VehicleModel[];
}

export default function BookAnAppointment({
    servicePackages = [],
    makes = [],
}: {
    servicePackages?: ServicePackage[];
    makes?: VehicleMake[];
}) {
    const { flash } = usePage().props as { flash?: { success?: string } };
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedMakeId, setSelectedMakeId] = useState('');

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        make_id: '',
        model_id: '',
        year: '',
        registration_number: '',
        service_type: '',
        booking_date: '',
        notes: '',
    });

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setData('model_id', '');
    }, [data.make_id]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/book-an-appointment');
    }

    const selectedMake = makes.find(m => String(m.id) === data.make_id);
    const currentYear = new Date().getFullYear();
    const minDate = new Date(Date.now() + 86400000).toISOString().slice(0, 16);
    const today = new Date().toISOString().slice(0, 10);

    return (
        <>
            <Head title="Book an Appointment - RevAuto Care">
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
                            <CalendarDays className="h-4 w-4 text-[#FF4D00]" />
                            <span className="font-['Inter'] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">Schedule Now</span>
                        </div>
                        <h1 className="font-['Montserrat'] text-5xl font-black leading-tight text-white md:text-6xl lg:text-7xl">
                            Book an <span className="text-[#FF4D00]">Appointment</span>
                        </h1>
                        <p className="mx-auto mt-4 max-w-xl font-['Inter'] text-lg leading-relaxed text-[#B5B5B5]">
                            Schedule your visit and let our expert technicians take care of your vehicle. Fast, reliable, and professional service.
                        </p>
                    </div>
                </section>

                {/* Form Section */}
                <section className="relative border-t border-white/5 bg-[#0D0D0D] py-16">
                    <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
                        <div className="grid gap-12 lg:grid-cols-5">
                            {/* Form */}
                            <div className="lg:col-span-3">
                                {flash?.success ? (
                                    <div className="flex flex-col items-center justify-center rounded-sm border border-[#FF4D00]/20 bg-[#FF4D00]/5 px-8 py-16 text-center">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FF4D00]/10">
                                            <CheckCircle className="h-10 w-10 text-[#FF4D00]" />
                                        </div>
                                        <h2 className="mt-6 font-['Montserrat'] text-2xl font-bold text-white">Booking Confirmed!</h2>
                                        <p className="mt-3 max-w-md font-['Inter'] text-base text-[#B5B5B5]">{flash.success}</p>
                                        <Button
                                            onClick={() => reset()}
                                            className="mt-8 h-12 rounded-none bg-[#FF4D00] px-8 text-sm font-bold uppercase tracking-[0.15em] text-white hover:bg-[#FF4D00]/90"
                                        >
                                            Book Another Appointment
                                        </Button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="rounded-sm border border-white/5 bg-[#171717] p-6 md:p-8">
                                            <h2 className="font-['Montserrat'] text-lg font-bold text-white">Your Information</h2>
                                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                                <div className="grid gap-2 sm:col-span-2">
                                                    <Label htmlFor="name" className="text-sm font-semibold text-[#B5B5B5]">Full Name *</Label>
                                                    <Input
                                                        id="name"
                                                        value={data.name}
                                                        onChange={e => setData('name', e.target.value)}
                                                        placeholder="John Doe"
                                                        className="h-11 rounded-none border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                                    />
                                                    <InputError message={errors.name} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="email" className="text-sm font-semibold text-[#B5B5B5]">Email Address *</Label>
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={data.email}
                                                        onChange={e => setData('email', e.target.value)}
                                                        placeholder="john@example.com"
                                                        className="h-11 rounded-none border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                                    />
                                                    <InputError message={errors.email} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="phone" className="text-sm font-semibold text-[#B5B5B5]">Phone Number *</Label>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        value={data.phone}
                                                        onChange={e => setData('phone', e.target.value)}
                                                        placeholder="+1 (555) 000-0000"
                                                        className="h-11 rounded-none border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                                    />
                                                    <InputError message={errors.phone} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-sm border border-white/5 bg-[#171717] p-6 md:p-8">
                                            <h2 className="font-['Montserrat'] text-lg font-bold text-white">Vehicle Details</h2>
                                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="make_id" className="text-sm font-semibold text-[#B5B5B5]">Make *</Label>
                                                    <Select value={data.make_id} onValueChange={v => setData('make_id', v)}>
                                                        <SelectTrigger className="h-11 rounded-none border-white/10 bg-[#0D0D0D] text-white focus:ring-[#FF4D00]">
                                                            <SelectValue placeholder="Select make" />
                                                        </SelectTrigger>
                                                        <SelectContent className="border-white/10 bg-[#0D0D0D] text-white">
                                                            {makes.map(m => (
                                                                <SelectItem key={m.id} value={String(m.id)} className="focus:bg-[#FF4D00]/10 focus:text-white">
                                                                    {m.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <InputError message={errors.make_id} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="model_id" className="text-sm font-semibold text-[#B5B5B5]">Model *</Label>
                                                    <Select value={data.model_id} onValueChange={v => setData('model_id', v)} disabled={!data.make_id}>
                                                        <SelectTrigger className="h-11 rounded-none border-white/10 bg-[#0D0D0D] text-white focus:ring-[#FF4D00]">
                                                            <SelectValue placeholder={data.make_id ? 'Select model' : 'Select make first'} />
                                                        </SelectTrigger>
                                                        <SelectContent className="border-white/10 bg-[#0D0D0D] text-white">
                                                            {selectedMake?.models.map(m => (
                                                                <SelectItem key={m.id} value={String(m.id)} className="focus:bg-[#FF4D00]/10 focus:text-white">
                                                                    {m.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <InputError message={errors.model_id} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="year" className="text-sm font-semibold text-[#B5B5B5]">Year *</Label>
                                                    <Select value={data.year} onValueChange={v => setData('year', v)}>
                                                        <SelectTrigger className="h-11 rounded-none border-white/10 bg-[#0D0D0D] text-white focus:ring-[#FF4D00]">
                                                            <SelectValue placeholder="Select year" />
                                                        </SelectTrigger>
                                                        <SelectContent className="border-white/10 bg-[#0D0D0D] text-white max-h-60">
                                                            {Array.from({ length: 35 }, (_, i) => currentYear - i).map(y => (
                                                                <SelectItem key={y} value={String(y)} className="focus:bg-[#FF4D00]/10 focus:text-white">
                                                                    {y}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <InputError message={errors.year} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="registration_number" className="text-sm font-semibold text-[#B5B5B5]">License Plate</Label>
                                                    <Input
                                                        id="registration_number"
                                                        value={data.registration_number}
                                                        onChange={e => setData('registration_number', e.target.value)}
                                                        placeholder="e.g. ABC 1234"
                                                        className="h-11 rounded-none border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                                    />
                                                    <InputError message={errors.registration_number} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-sm border border-white/5 bg-[#171717] p-6 md:p-8">
                                            <h2 className="font-['Montserrat'] text-lg font-bold text-white">Service & Schedule</h2>
                                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                                <div className="grid gap-2 sm:col-span-2">
                                                    <Label htmlFor="service_type" className="text-sm font-semibold text-[#B5B5B5]">Service Type *</Label>
                                                    <Select value={data.service_type} onValueChange={v => setData('service_type', v)}>
                                                        <SelectTrigger className="h-11 rounded-none border-white/10 bg-[#0D0D0D] text-white focus:ring-[#FF4D00]">
                                                            <SelectValue placeholder="Select a service" />
                                                        </SelectTrigger>
                                                        <SelectContent className="border-white/10 bg-[#0D0D0D] text-white">
                                                            {servicePackages.map(s => (
                                                                <SelectItem key={s.id} value={s.name} className="focus:bg-[#FF4D00]/10 focus:text-white">
                                                                    <span>{s.name}</span>
                                                                    {s.duration && <span className="ml-2 text-[#666]">({s.duration} min)</span>}
                                                                </SelectItem>
                                                            ))}
                                                            <SelectItem value="other" className="focus:bg-[#FF4D00]/10 focus:text-white">Other (specify in notes)</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <InputError message={errors.service_type} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="booking_date" className="text-sm font-semibold text-[#B5B5B5]">Preferred Date & Time *</Label>
                                                    <Input
                                                        id="booking_date"
                                                        type="datetime-local"
                                                        value={data.booking_date}
                                                        onChange={e => setData('booking_date', e.target.value)}
                                                        min={minDate}
                                                        className="h-11 rounded-none border-white/10 bg-[#0D0D0D] text-white focus-visible:border-[#FF4D00] focus-visible:ring-0 [color-scheme:dark]"
                                                    />
                                                    <InputError message={errors.booking_date} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label className="text-sm font-semibold text-[#B5B5B5]">Preferred Time</Label>
                                                    <div className="flex h-11 items-center gap-2 rounded-none border border-white/10 bg-[#0D0D0D] px-3 text-sm text-[#666]">
                                                        <Clock className="h-4 w-4 text-[#FF4D00]" />
                                                        Mon-Fri: 7AM - 7PM &bull; Sat: 8AM - 5PM
                                                    </div>
                                                </div>
                                                <div className="grid gap-2 sm:col-span-2">
                                                    <Label htmlFor="notes" className="text-sm font-semibold text-[#B5B5B5]">Additional Notes</Label>
                                                    <textarea
                                                        id="notes"
                                                        value={data.notes}
                                                        onChange={e => setData('notes', e.target.value)}
                                                        rows={3}
                                                        placeholder="Describe any issues or special requests..."
                                                        className="border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0 flex w-full rounded-none border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none"
                                                    />
                                                    <InputError message={errors.notes} />
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="h-14 w-full rounded-none bg-[#FF4D00] text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:bg-[#FF4D00]/90 hover:shadow-[0_0_40px_rgba(255,77,0,0.3)] disabled:opacity-50"
                                        >
                                            {processing ? 'Submitting...' : 'Confirm Appointment'}
                                        </Button>
                                    </form>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-2 space-y-6">
                                <div className="rounded-sm border border-white/5 bg-[#171717] p-6">
                                    <h3 className="font-['Montserrat'] text-base font-bold text-white">Why Book With Us?</h3>
                                    <ul className="mt-4 space-y-4">
                                        {[
                                            { icon: Wrench, text: 'ASE-certified master technicians' },
                                            { icon: Shield, text: '12-month warranty on all repairs' },
                                            { icon: Clock, text: 'Most services completed same-day' },
                                            { icon: Star, text: '4.9/5 average customer rating' },
                                        ].map(({ icon: Icon, text }) => (
                                            <li key={text} className="flex items-start gap-3">
                                                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#FF4D00]" />
                                                <span className="font-['Inter'] text-sm text-[#B5B5B5]">{text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="rounded-sm border border-white/5 bg-[#171717] p-6">
                                    <h3 className="font-['Montserrat'] text-base font-bold text-white">Our Services</h3>
                                    <div className="mt-4 space-y-3">
                                        {servicePackages.slice(0, 5).map(s => (
                                            <div key={s.id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                                                <span className="font-['Inter'] text-sm text-[#B5B5B5]">{s.name}</span>
                                                <span className="font-['Inter'] text-sm font-semibold text-[#FF4D00]">${Number(s.price).toFixed(2)}</span>
                                            </div>
                                        ))}
                                        {servicePackages.length === 0 && (
                                            <p className="font-['Inter'] text-sm text-[#666]">Contact us for service pricing.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-sm border border-white/5 bg-[#171717] p-6">
                                    <h3 className="font-['Montserrat'] text-base font-bold text-white">Contact Info</h3>
                                    <ul className="mt-4 space-y-3">
                                        {[
                                            { icon: MapPin, text: '123 Performance Blvd, Los Angeles, CA' },
                                            { icon: Phone, text: '+1 (800) 555-REV' },
                                            { icon: Mail, text: 'service@revauto.care' },
                                        ].map(({ icon: Icon, text }) => (
                                            <li key={text} className="flex items-start gap-3">
                                                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4D00]" />
                                                <span className="font-['Inter'] text-sm text-[#B5B5B5]">{text}</span>
                                            </li>
                                        ))}
                                    </ul>
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
