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

interface Customer {
    id: number;
    customer_code: string;
    full_name: string;
    email: string;
    phone: string;
    loyalty_points: number;
    wallet_balance: number;
    orders_count: number;
    total_spent: number;
    status: boolean;
    created_at: string;
}

export default function CustomersIndex({
    customers,
    filters,
}: {
    customers: { data: Customer[]; links: any[]; from: number; to: number; total: number; last_page: number; current_page: number };
    filters: { search: string; status: string };
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status ?? '');

    function applyFilters() {
        router.get('/admin/customers', {
            search,
            status: status === 'all' ? '' : status,
        }, { preserveState: true, replace: true });
    }

    function resetFilters() {
        setSearch('');
        setStatus('');
        router.get('/admin/customers', {}, { preserveState: true, replace: true });
    }

    function handleDelete(id: number, name: string) {
        if (confirm(`Delete customer "${name}"? This cannot be undone.`)) {
            router.delete(`/admin/customers/${id}`, {
                preserveScroll: true,
            });
        }
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Customers" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Customers</h1>
                        <p className="text-sm text-muted-foreground">Manage your customers</p>
                    </div>
                    <Link href="/admin/customers/create">
                        <Button size="sm">Add Customer</Button>
                    </Link>
                </div>

                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Search</label>
                        <Input
                            placeholder="Search by name, email, code or phone..."
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
                                <th className="p-3 font-medium">Customer</th>
                                <th className="p-3 font-medium">Contact</th>
                                <th className="p-3 font-medium">Orders</th>
                                <th className="p-3 font-medium">Total Spent</th>
                                <th className="p-3 font-medium">Points</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium">Created</th>
                                <th className="p-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.data.map((customer) => (
                                <tr key={customer.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="p-3">
                                        <Link href={`/admin/customers/${customer.id}`} className="flex items-center gap-3">
                                            <span className="font-medium hover:underline">{customer.full_name}</span>
                                        </Link>
                                    </td>
                                    <td className="p-3">
                                        <div className="text-muted-foreground">{customer.email || '—'}</div>
                                        <div className="text-xs text-muted-foreground">{customer.phone || '—'}</div>
                                    </td>
                                    <td className="p-3">{customer.orders_count}</td>
                                    <td className="p-3 font-medium">${customer.total_spent.toFixed(2)}</td>
                                    <td className="p-3">{customer.loyalty_points}</td>
                                    <td className="p-3">
                                        <Badge variant={customer.status ? 'default' : 'secondary'}>
                                            {customer.status ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="p-3 text-muted-foreground">{customer.created_at}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/customers/${customer.id}`}>
                                                <Button variant="ghost" size="sm">View</Button>
                                            </Link>
                                            <Link href={`/admin/customers/${customer.id}/edit`}>
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(customer.id, customer.full_name)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {customers.data.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-muted-foreground">
                                        No customers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {customers.from}–{customers.to} of {customers.total}</span>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: customers.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/customers?page=${page}`}
                                preserveState
                                className={`inline-flex size-8 items-center justify-center rounded text-sm ${
                                    page === customers.current_page
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

CustomersIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Customers', href: '/admin/customers' },
    ],
};
