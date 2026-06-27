import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Calendar, Car, ClipboardList, DollarSign, FolderGit2, LayoutGrid, List, Package, Percent, Settings, ShoppingBag, Star, Tag, UserCog, Users, Wrench } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem, User } from '@/types';

const adminPlatformItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Products',
        href: '/admin/products',
        icon: Package,
    },
    {
        title: 'Customers',
        href: '/admin/customers',
        icon: Users,
    },
    {
        title: 'Orders',
        href: '/admin/orders',
        icon: ShoppingBag,
    },
    {
        title: 'Categories',
        href: '/admin/categories',
        icon: List,
    },
    {
        title: 'Brands',
        href: '/admin/brands',
        icon: Tag,
    },
    {
        title: 'Coupons',
        href: '/admin/coupons',
        icon: Percent,
    },
    {
        title: 'Reviews',
        href: '/admin/reviews',
        icon: Star,
    },
    {
        title: 'Employees',
        href: '/admin/employees',
        icon: UserCog,
    },
    {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings,
    },
];

const adminServiceItems: NavItem[] = [
    {
        title: 'Services',
        href: '/admin/services',
        icon: Wrench,
    },
    {
        title: 'Work Orders',
        href: '/admin/work-orders',
        icon: ClipboardList,
    },
    {
        title: 'Bookings',
        href: '/admin/bookings',
        icon: Calendar,
    },
];

const staffNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/staff/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Service',
        href: '/staff/service',
        icon: Wrench,
    },
    {
        title: 'Vehicles',
        href: '/staff/vehicles',
        icon: Car,
    },
];

const customerNavItems: NavItem[] = [
    {
        title: 'My Account',
        href: '/my-account',
        icon: LayoutGrid,
    },
    {
        title: 'My Vehicles',
        href: '/my-vehicles',
        icon: Car,
    },
    {
        title: 'My Orders',
        href: '/my-orders',
        icon: ShoppingBag,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const role = auth.user?.role;
    const { isCurrentUrl } = useCurrentUrl();

    const otherNavItems = role === 'staff' ? staffNavItems : role === 'customer' ? customerNavItems : [];

    const homeHref = role === 'admin' ? '/admin/dashboard'
        : role === 'staff' ? '/staff/dashboard'
        : '/my-account';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={homeHref} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {role === 'admin' ? (
                    <>
                        <NavMain items={adminPlatformItems} />
                        <SidebarGroup className="px-2 py-0">
                            <SidebarGroupLabel>SERVICES</SidebarGroupLabel>
                            <SidebarMenu>
                                {adminServiceItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isCurrentUrl(item.href)}
                                            tooltip={{ children: item.title }}
                                        >
                                            <Link href={item.href} prefetch>
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                        <SidebarGroup className="px-2 py-0">
                            <SidebarGroupLabel>BILLING</SidebarGroupLabel>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isCurrentUrl('/admin/point-of-sales')}
                                        tooltip={{ children: 'POS' }}
                                    >
                                        <Link href="/admin/point-of-sales" prefetch>
                                            <DollarSign />
                                            <span>POS</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={isCurrentUrl('/admin/invoices')}
                                        tooltip={{ children: 'Invoices' }}
                                    >
                                        <Link href="/admin/invoices" prefetch>
                                            <DollarSign />
                                            <span>Invoices</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroup>
                    </>
                ) : (
                    <NavMain items={otherNavItems} />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
