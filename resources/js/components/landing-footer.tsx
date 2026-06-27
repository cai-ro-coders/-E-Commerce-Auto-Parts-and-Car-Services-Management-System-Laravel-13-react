import { Link } from '@inertiajs/react';
import {
    Wrench,
    Instagram,
    Facebook,
    Youtube,
    Twitter,
    MapPin,
    Phone,
    Mail,
    Clock,
} from 'lucide-react';

const footerLinks = {
    services: ['Engine Repair', 'Brake Service', 'Oil Change', 'Tire Service', 'AC Repair', 'Performance Tuning', 'Transmission', 'Alignment'],
    support: ['Contact Us', 'Service FAQ', 'Warranty', 'Financing', 'Customer Portal', 'Service History', 'Insurance'],
    bookAppointment: 'Book Appointment',
};

export default function LandingFooter() {
    return (
        <footer className="border-t border-white/5 bg-[#0D0D0D]">
            <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center bg-[#FF4D00]">
                                <Wrench className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-['Montserrat'] text-lg font-bold tracking-tight text-white">
                                REV<span className="text-[#FF4D00]">AUTO</span>
                                <span className="ml-1 text-xs font-normal tracking-normal text-[#666]">CARE</span>
                            </span>
                        </Link>
                        <p className="mt-4 font-['Inter'] text-sm leading-relaxed text-[#B5B5B5]">
                            Premium auto repair and performance service for discerning drivers. Quality you can feel, service you can trust.
                        </p>
                        <div className="mt-6 flex gap-3">
                            {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="flex h-10 w-10 items-center justify-center border border-white/10 text-[#B5B5B5] transition-all hover:border-[#FF4D00] hover:text-[#FF4D00]"
                                >
                                    <Icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-['Montserrat'] text-sm font-bold uppercase tracking-[0.15em] text-white">Services</h4>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.services.map((link) => (
                                <li key={link}>
                                    <Link href="#" className="font-['Inter'] text-sm text-[#B5B5B5] transition-colors hover:text-white">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-['Montserrat'] text-sm font-bold uppercase tracking-[0.15em] text-white">Support</h4>
                        <ul className="mt-4 space-y-3">
                            <li>
                                <Link href="/book-an-appointment" className="font-['Inter'] text-sm text-[#FF4D00] transition-colors hover:text-white font-semibold">
                                    {footerLinks.bookAppointment}
                                </Link>
                            </li>
                            {footerLinks.support.map((link) => (
                                <li key={link}>
                                    <Link href="#" className="font-['Inter'] text-sm text-[#B5B5B5] transition-colors hover:text-white">
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-['Montserrat'] text-sm font-bold uppercase tracking-[0.15em] text-white">Contact</h4>
                        <ul className="mt-4 space-y-3">
                            {[
                                { icon: MapPin, text: '123 Performance Blvd, Los Angeles, CA' },
                                { icon: Phone, text: '+1 (800) 555-REV' },
                                { icon: Mail, text: 'service@revauto.care' },
                                { icon: Clock, text: 'Mon-Fri: 7AM - 7PM • Sat: 8AM - 5PM' },
                            ].map(({ icon: Icon, text }) => (
                                <li key={text} className="flex items-start gap-3">
                                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4D00]" />
                                    <span className="font-['Inter'] text-sm text-[#B5B5B5]">{text}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6">
                            <p className="font-['Inter'] text-xs font-semibold uppercase tracking-wider text-white">We Accept</p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {['Visa', 'MC', 'Amex', 'PayPal', 'Apple Pay'].map((pm) => (
                                    <span key={pm} className="border border-white/10 bg-[#171717] px-3 py-1.5 font-['Inter'] text-[11px] font-semibold text-[#B5B5B5]">
                                        {pm}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/5 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="font-['Inter'] text-sm text-[#666]">
                            &copy; {new Date().getFullYear()} RevAuto Care. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                                <Link key={link} href="#" className="font-['Inter'] text-sm text-[#666] transition-colors hover:text-[#B5B5B5]">
                                    {link}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
