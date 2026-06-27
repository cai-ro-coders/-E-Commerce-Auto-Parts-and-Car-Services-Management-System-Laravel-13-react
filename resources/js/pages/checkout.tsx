import { Head, Link, router, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import LandingNavigation from '@/components/landing-navigation';
import LandingFooter from '@/components/landing-footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ChevronRight,
    ShoppingBag,
    Package,
    MapPin,
    User,
    Shield,
    CreditCard,
    ArrowLeft,
    Loader2,
    Banknote,
} from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

interface CartItem {
    product_id: number;
    name: string;
    slug: string;
    selling_price: number;
    discount_type: string | null;
    discount_value: number;
    image: string | null;
    quantity: number;
    price: number;
}

interface CustomerData {
    full_name: string;
    email: string;
    phone: string;
    address: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    description: string | null;
}

function CheckoutForm({ clientSecret }: { clientSecret: string }) {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
    const [paymentError, setPaymentError] = useState('');
    const [processing, setProcessing] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const formRef = useRef<HTMLFormElement>(null);

    const page = usePage<{
        cartItems: CartItem[];
        subtotal: number;
        tax: number;
        total: number;
        customerData: CustomerData;
    }>().props;

    const { cartItems, subtotal, tax, total, customerData } = page;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!formRef.current) return;

        const formData = new FormData(formRef.current);

        setProcessing(true);
        setPaymentError('');
        setFieldErrors({});

        if (paymentMethod === 'card') {
            if (!stripe || !elements) {
                setPaymentError('Payment system is not ready. Please try again.');
                setProcessing(false);
                return;
            }

            const { error: submitError } = await elements.submit();
            if (submitError) {
                setPaymentError(submitError.message || 'Payment validation failed.');
                setProcessing(false);
                return;
            }

                            const cardholderName = formData.get('cardholder_name') as string || formData.get('full_name') as string;
                            const email = formData.get('email') as string;
                            const phone = formData.get('phone') as string;

                            const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
                                elements,
                                redirect: 'if_required',
                                confirmParams: {
                                    payment_method_data: {
                                        billing_details: {
                                            name: cardholderName,
                                            email: email,
                                            phone: phone,
                                        },
                                    },
                                },
                            });

            if (confirmError) {
                setPaymentError(confirmError.message || 'Payment failed.');
                setProcessing(false);
                return;
            }

            if (paymentIntent.status !== 'succeeded') {
                setPaymentError('Payment was not successful. Please try again.');
                setProcessing(false);
                return;
            }

            formData.set('payment_intent_id', paymentIntent.id);
        }

        router.post('/checkout', Object.fromEntries(formData), {
            onError: (errors) => {
                setFieldErrors(errors);
                setProcessing(false);
            },
        });
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Left Column - Contact & Shipping */}
                <div className="flex-1 space-y-8">
                    {/* Contact Information */}
                    <div className="rounded-lg border border-white/5 bg-[#171717] p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <User className="h-5 w-5 text-[#FF4D00]" />
                            <h2 className="font-['Montserrat'] text-lg font-bold text-white">Contact Information</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold uppercase tracking-wider text-[#666] mb-1.5 block">Full Name</label>
                                <Input
                                    name="full_name"
                                    defaultValue={customerData.full_name || ''}
                                    placeholder="John Doe"
                                    className="border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                />
                                {fieldErrors.full_name && <p className="mt-1 text-xs text-red-500">{fieldErrors.full_name}</p>}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-[#666] mb-1.5 block">Email</label>
                                    <Input
                                        type="email"
                                        name="email"
                                        defaultValue={customerData.email || ''}
                                        placeholder="john@example.com"
                                        className="border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                    />
                                    {fieldErrors.email && <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p>}
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-[#666] mb-1.5 block">Phone</label>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        defaultValue={customerData.phone || ''}
                                        placeholder="+1 (555) 123-4567"
                                        className="border-white/10 bg-[#0D0D0D] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                    />
                                    {fieldErrors.phone && <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="rounded-lg border border-white/5 bg-[#171717] p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <MapPin className="h-5 w-5 text-[#FF4D00]" />
                            <h2 className="font-['Montserrat'] text-lg font-bold text-white">Shipping Address</h2>
                        </div>
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-[#666] mb-1.5 block">Address</label>
                            <textarea
                                name="address"
                                defaultValue={customerData.address || ''}
                                rows={3}
                                placeholder="123 Main Street, Apt 4B, New York, NY 10001"
                                className="flex w-full rounded-md border border-white/10 bg-[#0D0D0D] px-3 py-2 text-sm text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0 focus-visible:outline-none"
                            />
                            {fieldErrors.address && <p className="mt-1 text-xs text-red-500">{fieldErrors.address}</p>}
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="rounded-lg border border-white/5 bg-[#171717] p-6 lg:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <CreditCard className="h-5 w-5 text-[#FF4D00]" />
                            <h2 className="font-['Montserrat'] text-lg font-bold text-white">Payment Method</h2>
                        </div>

                        <div className="space-y-3">
                            {/* COD Option */}
                            <label
                                onClick={() => setPaymentMethod('cod')}
                                className={cn(
                                    'flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-all',
                                    paymentMethod === 'cod'
                                        ? 'border-[#FF4D00] bg-[#FF4D00]/5'
                                        : 'border-white/10 bg-[#0D0D0D] hover:border-white/20'
                                )}
                            >
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="cod"
                                    checked={paymentMethod === 'cod'}
                                    onChange={() => setPaymentMethod('cod')}
                                    className="accent-[#FF4D00]"
                                />
                                <Banknote className="h-5 w-5 text-[#FF4D00]" />
                                <div>
                                    <p className="text-sm font-semibold text-white">Cash on Delivery</p>
                                    <p className="text-xs text-[#666]">Pay when you receive your order.</p>
                                </div>
                            </label>

                            {/* Card Option */}
                            <label
                                onClick={() => setPaymentMethod('card')}
                                className={cn(
                                    'flex items-center gap-4 rounded-lg border p-4 cursor-pointer transition-all',
                                    paymentMethod === 'card'
                                        ? 'border-[#FF4D00] bg-[#FF4D00]/5'
                                        : 'border-white/10 bg-[#0D0D0D] hover:border-white/20'
                                )}
                            >
                                <input
                                    type="radio"
                                    name="payment_method"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={() => setPaymentMethod('card')}
                                    className="accent-[#FF4D00]"
                                />
                                <CreditCard className="h-5 w-5 text-[#FF4D00]" />
                                <div>
                                    <p className="text-sm font-semibold text-white">Credit / Debit Card</p>
                                    <p className="text-xs text-[#666]">Pay securely with your card.</p>
                                </div>
                            </label>
                        </div>

                        {paymentMethod === 'card' && (
                            <div className="mt-4 rounded-lg border border-white/5 bg-[#0D0D0D] p-4 space-y-4">
                                <div>
                                    <label className="text-xs font-semibold uppercase tracking-wider text-[#666] mb-1.5 block">Cardholder Name</label>
                                    <Input
                                        name="cardholder_name"
                                        placeholder="John Doe"
                                        className="border-white/10 bg-[#171717] text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                    />
                                </div>
                                <PaymentElement
                                    options={{
                                        layout: 'tabs',
                                    }}
                                />
                            </div>
                        )}

                        {paymentError && (
                            <p className="mt-3 text-sm text-red-500">{paymentError}</p>
                        )}
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:w-[420px]">
                    <div className="sticky top-28 rounded-lg border border-white/5 bg-[#171717] overflow-hidden">
                        <div className="p-6 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="h-5 w-5 text-[#FF4D00]" />
                                <h2 className="font-['Montserrat'] text-lg font-bold text-white">Order Summary</h2>
                            </div>
                        </div>

                        <div className="divide-y divide-white/5 max-h-[400px] overflow-y-auto">
                            {cartItems.map(item => (
                                <div key={item.product_id} className="flex items-center gap-4 p-4">
                                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-[#0D0D0D]">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-[#333]">
                                                <Package className="h-6 w-6" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-white truncate">{item.name}</p>
                                        <p className="text-xs text-[#666]">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-sm font-bold text-[#FF4D00]">${(item.price * item.quantity).toFixed(2)}</p>
                                        {item.discount_value > 0 && (
                                            <p className="text-xs text-[#555] line-through">${(item.selling_price * item.quantity).toFixed(2)}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 space-y-3 border-t border-white/5">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#666]">Subtotal</span>
                                <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#666]">Shipping</span>
                                <span className="text-green-500 font-medium">Free</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#666]">Tax (10%)</span>
                                <span className="text-white font-medium">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                                <span className="text-base font-bold text-white">Total</span>
                                <span className="text-xl font-bold text-[#FF4D00]">${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="p-6 pt-0 space-y-4">
                            <input type="hidden" name="payment_intent_id" value="" />

                            <Button
                                type="submit"
                                disabled={(paymentMethod === 'card' && !stripe) || processing}
                                className="w-full h-13 bg-[#FF4D00] text-white hover:bg-[#FF4D00]/90 text-sm font-bold uppercase tracking-[0.1em] rounded-lg"
                            >
                                {processing ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Processing...
                                    </span>
                                ) : paymentMethod === 'cod' ? (
                                    `Place Order — $${total.toFixed(2)}`
                                ) : (
                                    `Pay — $${total.toFixed(2)}`
                                )}
                            </Button>

                            {paymentMethod === 'card' && (
                                <div className="flex items-center justify-center gap-2 text-xs text-[#666]">
                                    <Shield className="h-3.5 w-3.5" />
                                    <span>Payments are secure and encrypted</span>
                                </div>
                            )}

                            {paymentMethod === 'card' && (
                                <div className="flex items-center justify-center gap-4">
                                    {['Visa', 'MC', 'Amex', 'PayPal', 'Apple Pay'].map(pm => (
                                        <span key={pm} className="text-[10px] font-semibold uppercase tracking-wider text-[#444] bg-white/5 px-2 py-1 rounded">
                                            {pm}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Cart */}
            <div className="mt-8">
                <Link
                    href="/cart"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#B5B5B5] transition-colors hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Cart
                </Link>
            </div>
        </form>
    );
}

export default function Checkout() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [stripePromise, setStripePromise] = useState<ReturnType<typeof loadStripe> | null>(null);

    const page = usePage<{
        cartItems: CartItem[];
        subtotal: number;
        tax: number;
        total: number;
        customerData: CustomerData;
        allCategories?: Category[];
        stripeKey: string;
        clientSecret: string;
    }>().props;

    const { allCategories, stripeKey, clientSecret } = page;

    useEffect(() => {
        if (stripeKey) {
            setStripePromise(loadStripe(stripeKey));
        }
    }, [stripeKey]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <Head title="Checkout - RevAuto Care">
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
                    categories={allCategories || []}
                />

                {/* Breadcrumb */}
                <div className="pt-24 border-b border-white/5 bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#666]">
                            <Link href="/" className="transition-colors hover:text-white">Home</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <Link href="/cart" className="transition-colors hover:text-white">Cart</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="text-[#FF4D00] font-medium">Checkout</span>
                        </div>
                    </div>
                </div>

                {/* Checkout Content */}
                <section className="bg-[#0D0D0D] py-10 lg:py-14">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
                        <div className="mb-8">
                            <h1 className="font-['Montserrat'] text-3xl font-bold text-white">Checkout</h1>
                            <p className="mt-2 text-sm text-[#666]">Complete your order by filling in your details below.</p>
                        </div>

                        {stripePromise && clientSecret ? (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm clientSecret={clientSecret} />
                            </Elements>
                        ) : (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="h-8 w-8 animate-spin text-[#FF4D00]" />
                            </div>
                        )}
                    </div>
                </section>

                <LandingFooter />
            </div>
        </>
    );
}
