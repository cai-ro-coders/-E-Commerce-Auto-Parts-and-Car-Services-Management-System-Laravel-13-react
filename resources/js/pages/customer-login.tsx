import { Head, Link, useForm } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import LandingNavigation from '@/components/landing-navigation';
import LandingFooter from '@/components/landing-footer';
import {
    ChevronRight,
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    LoaderCircle,
    ArrowRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

export default function CustomerLogin({
    canRegister = false,
    status,
}: {
    canRegister?: boolean;
    status?: string;
}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [showPassword, setShowPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const login = useForm({ email: '', password: '', remember: false });
    const register = useForm({ name: '', email: '', password: '', password_confirmation: '' });

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function submitLogin(e: FormEvent) {
        e.preventDefault();
        login.post('/login', {
            onSuccess: () => login.reset('password'),
        });
    }

    function submitRegister(e: FormEvent) {
        e.preventDefault();
        register.post('/register', {
            onSuccess: () => register.reset('password', 'password_confirmation'),
        });
    }

    return (
        <>
            <Head title="Customer Login - RevAuto Care" />

            <div className="relative min-h-screen bg-[#0D0D0D] font-['Inter'] antialiased selection:bg-[#FF4D00]/30">
                <LandingNavigation
                    isScrolled={isScrolled}
                    mobileMenuOpen={mobileMenuOpen}
                    onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
                    canRegister={false}
                />

                {/* Breadcrumb */}
                <div className="pt-24 border-b border-white/5 bg-[#0D0D0D]">
                    <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-4">
                        <div className="flex items-center gap-2 text-sm text-[#666]">
                            <Link href="/" className="transition-colors hover:text-white">Home</Link>
                            <ChevronRight className="h-3.5 w-3.5" />
                            <span className="text-[#FF4D00] font-medium">My Account</span>
                        </div>
                    </div>
                </div>

                {/* Auth Section */}
                <section className="bg-[#0D0D0D] py-16 lg:py-24">
                    <div className="mx-auto max-w-[500px] px-6">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h1 className="font-['Montserrat'] text-3xl lg:text-4xl font-bold text-white">
                                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                            </h1>
                            <p className="mt-3 font-['Inter'] text-base text-[#B5B5B5]">
                                {activeTab === 'login'
                                    ? 'Sign in to access your account and orders.'
                                    : 'Register to enjoy a faster checkout experience.'}
                            </p>
                        </div>

                        {status && (
                            <div className="mb-6 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-500 text-center">
                                {status}
                            </div>
                        )}

                        {/* Tab Switcher */}
                        <div className="flex rounded-lg border border-white/10 bg-[#171717] p-1 mb-8">
                            <button
                                onClick={() => setActiveTab('login')}
                                className={cn(
                                    'flex-1 rounded-md py-2.5 text-sm font-semibold transition-all',
                                    activeTab === 'login'
                                        ? 'bg-[#FF4D00] text-white shadow-lg'
                                        : 'text-[#666] hover:text-white'
                                )}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setActiveTab('register')}
                                className={cn(
                                    'flex-1 rounded-md py-2.5 text-sm font-semibold transition-all',
                                    activeTab === 'register'
                                        ? 'bg-[#FF4D00] text-white shadow-lg'
                                        : 'text-[#666] hover:text-white'
                                )}
                            >
                                Create Account
                            </button>
                        </div>

                        {/* Login Form */}
                        {activeTab === 'login' && (
                            <form onSubmit={submitLogin} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email" className="text-sm font-semibold text-[#B5B5B5]">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
                                        <Input
                                            id="login-email"
                                            type="email"
                                            name="email"
                                            value={login.data.email}
                                            onChange={e => login.setData('email', e.target.value)}
                                            placeholder="you@example.com"
                                            className="h-12 rounded-lg border-white/10 bg-[#171717] pl-11 text-sm text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                            required
                                            autoFocus
                                            autoComplete="email"
                                        />
                                    </div>
                                    {login.errors.email && (
                                        <p className="text-xs text-red-500">{login.errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="login-password" className="text-sm font-semibold text-[#B5B5B5]">
                                            Password
                                        </Label>
                                        <Link
                                            href="/forgot-password"
                                            className="text-xs text-[#FF4D00] hover:underline"
                                        >
                                            Forgot?
                                        </Link>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
                                        <Input
                                            id="login-password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={login.data.password}
                                            onChange={e => login.setData('password', e.target.value)}
                                            placeholder="Enter your password"
                                            className="h-12 rounded-lg border-white/10 bg-[#171717] pl-11 pr-11 text-sm text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                            required
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#666] hover:text-white"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {login.errors.password && (
                                        <p className="text-xs text-red-500">{login.errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="remember"
                                        checked={login.data.remember}
                                        onCheckedChange={(checked) => login.setData('remember', !!checked)}
                                        className="border-white/10 data-[state=checked]:bg-[#FF4D00] data-[state=checked]:border-[#FF4D00]"
                                    />
                                    <Label htmlFor="remember" className="text-sm text-[#B5B5B5] cursor-pointer">
                                        Remember me
                                    </Label>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={login.processing}
                                    className="h-12 w-full rounded-lg bg-[#FF4D00] text-sm font-bold uppercase tracking-[0.15em] text-white hover:bg-[#FF4D00]/90 disabled:opacity-50"
                                >
                                    {login.processing ? (
                                        <LoaderCircle className="h-5 w-5 animate-spin" />
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>

                                <p className="text-center text-sm text-[#666]">
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('register')}
                                        className="text-[#FF4D00] font-semibold hover:underline"
                                    >
                                        Create one here
                                    </button>
                                </p>
                            </form>
                        )}

                        {/* Register Form */}
                        {activeTab === 'register' && (
                            <form onSubmit={submitRegister} className="space-y-5">
                                <div className="space-y-2">
                                    <Label htmlFor="reg-name" className="text-sm font-semibold text-[#B5B5B5]">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
                                        <Input
                                            id="reg-name"
                                            type="text"
                                            name="name"
                                            value={register.data.name}
                                            onChange={e => register.setData('name', e.target.value)}
                                            placeholder="John Doe"
                                            className="h-12 rounded-lg border-white/10 bg-[#171717] pl-11 text-sm text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                            required
                                            autoFocus
                                            autoComplete="name"
                                        />
                                    </div>
                                    {register.errors.name && (
                                        <p className="text-xs text-red-500">{register.errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reg-email" className="text-sm font-semibold text-[#B5B5B5]">
                                        Email Address
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
                                        <Input
                                            id="reg-email"
                                            type="email"
                                            name="email"
                                            value={register.data.email}
                                            onChange={e => register.setData('email', e.target.value)}
                                            placeholder="you@example.com"
                                            className="h-12 rounded-lg border-white/10 bg-[#171717] pl-11 text-sm text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                            required
                                            autoComplete="email"
                                        />
                                    </div>
                                    {register.errors.email && (
                                        <p className="text-xs text-red-500">{register.errors.email}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reg-password" className="text-sm font-semibold text-[#B5B5B5]">
                                        Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
                                        <Input
                                            id="reg-password"
                                            type={showRegisterPassword ? 'text' : 'password'}
                                            name="password"
                                            value={register.data.password}
                                            onChange={e => register.setData('password', e.target.value)}
                                            placeholder="Create a password"
                                            className="h-12 rounded-lg border-white/10 bg-[#171717] pl-11 pr-11 text-sm text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                            required
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#666] hover:text-white"
                                        >
                                            {showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {register.errors.password && (
                                        <p className="text-xs text-red-500">{register.errors.password}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="reg-password-confirm" className="text-sm font-semibold text-[#B5B5B5]">
                                        Confirm Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666]" />
                                        <Input
                                            id="reg-password-confirm"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="password_confirmation"
                                            value={register.data.password_confirmation}
                                            onChange={e => register.setData('password_confirmation', e.target.value)}
                                            placeholder="Confirm your password"
                                            className="h-12 rounded-lg border-white/10 bg-[#171717] pl-11 pr-11 text-sm text-white placeholder:text-[#666] focus-visible:border-[#FF4D00] focus-visible:ring-0"
                                            required
                                            autoComplete="new-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#666] hover:text-white"
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                    {register.errors.password_confirmation && (
                                        <p className="text-xs text-red-500">{register.errors.password_confirmation}</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={register.processing}
                                    className="h-12 w-full rounded-lg bg-[#FF4D00] text-sm font-bold uppercase tracking-[0.15em] text-white hover:bg-[#FF4D00]/90 disabled:opacity-50"
                                >
                                    {register.processing ? (
                                        <LoaderCircle className="h-5 w-5 animate-spin" />
                                    ) : (
                                        'Create Account'
                                    )}
                                </Button>

                                <p className="text-center text-sm text-[#666]">
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('login')}
                                        className="text-[#FF4D00] font-semibold hover:underline"
                                    >
                                        Sign in here
                                    </button>
                                </p>
                            </form>
                        )}

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/5" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="bg-[#0D0D0D] px-4 text-xs text-[#666]">OR CONTINUE AS GUEST</span>
                            </div>
                        </div>

                        {/* Guest CTA */}
                        <Link
                            href="/"
                            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-transparent text-sm font-semibold text-[#B5B5B5] transition-colors hover:bg-white/5 hover:text-white"
                        >
                            Browse Products
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </section>

                <LandingFooter />
            </div>
        </>
    );
}
