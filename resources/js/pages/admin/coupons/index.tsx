import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Coupon {
    id: number;
    code: string;
    discount_type: string;
    discount_value: number;
    start_date: string | null;
    end_date: string | null;
    usage_limit: number | null;
    used_count: number;
    status: boolean;
    created_at: string;
}

export default function CouponsIndex({
    coupons,
    filters,
}: {
    coupons: { data: Coupon[]; links: any[]; from: number; to: number; total: number; last_page: number; current_page: number };
    filters: { search: string; status: string };
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status ?? '');

    function applyFilters() {
        router.get('/admin/coupons', {
            search,
            status: status === 'all' ? '' : status,
        }, { preserveState: true, replace: true });
    }

    function resetFilters() {
        setSearch('');
        setStatus('');
        router.get('/admin/coupons', {}, { preserveState: true, replace: true });
    }

    function handleDelete(id: number, code: string) {
        if (confirm(`Delete coupon "${code}"? This cannot be undone.`)) {
            router.delete(`/admin/coupons/${id}`, {
                preserveScroll: true,
            });
        }
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Coupons" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Coupons</h1>
                        <p className="text-sm text-muted-foreground">Manage discount coupons</p>
                    </div>
                    <Link href="/admin/coupons/create">
                        <Button size="sm">Add Coupon</Button>
                    </Link>
                </div>

                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Search</label>
                        <Input
                            placeholder="Search by coupon code..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && applyFilters()}
                        />
                    </div>
                    <div className="w-[140px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Status</label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button variant="secondary" size="sm" onClick={applyFilters}>Filter</Button>
                    <Button variant="ghost" size="sm" onClick={resetFilters}>Reset</Button>
                </div>

                <div className="rounded-xl border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50 text-left">
                                <th className="p-3 font-medium">Code</th>
                                <th className="p-3 font-medium">Discount</th>
                                <th className="p-3 font-medium">Valid Period</th>
                                <th className="p-3 font-medium">Usage</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium">Created</th>
                                <th className="p-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.data.map((coupon) => (
                                <tr key={coupon.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="p-3 font-medium">{coupon.code}</td>
                                    <td className="p-3">
                                        {coupon.discount_type === 'percentage'
                                            ? `${coupon.discount_value}%`
                                            : `$${coupon.discount_value.toFixed(2)}`}
                                    </td>
                                    <td className="p-3 text-muted-foreground">
                                        {coupon.start_date && coupon.end_date
                                            ? `${coupon.start_date} – ${coupon.end_date}`
                                            : coupon.start_date
                                                ? `From ${coupon.start_date}`
                                                : coupon.end_date
                                                    ? `Until ${coupon.end_date}`
                                                    : 'No expiry'}
                                    </td>
                                    <td className="p-3">
                                        {coupon.used_count}{coupon.usage_limit ? ` / ${coupon.usage_limit}` : ''}
                                    </td>
                                    <td className="p-3">
                                        <Badge variant={coupon.status ? 'default' : 'secondary'}>
                                            {coupon.status ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="p-3 text-muted-foreground">{coupon.created_at}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/coupons/${coupon.id}/edit`}>
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(coupon.id, coupon.code)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {coupons.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                                        No coupons found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {coupons.from}–{coupons.to} of {coupons.total}</span>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: coupons.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/coupons?page=${page}`}
                                preserveState
                                className={`inline-flex size-8 items-center justify-center rounded text-sm ${
                                    page === coupons.current_page
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

CouponsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Coupons', href: '/admin/coupons' },
    ],
};
