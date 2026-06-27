import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Invoice {
    id: number;
    invoice_number: string;
    customer_name: string;
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    status: string;
    items_count: number;
    due_date: string | null;
    created_at: string;
}

const statusStyles: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
};

export default function InvoicesIndex({
    invoices,
    filters,
}: {
    invoices: { data: Invoice[]; links: any[]; from: number; to: number; total: number; last_page: number; current_page: number };
    filters: { search: string; status: string };
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    function applyFilters() {
        router.get('/admin/invoices', { search, status }, { preserveState: true, replace: true });
    }

    function resetFilters() {
        setSearch('');
        setStatus('');
        router.get('/admin/invoices', {}, { preserveState: true, replace: true });
    }

    function handleDelete(id: number, number: string) {
        if (confirm(`Delete invoice "${number}"? This cannot be undone.`)) {
            router.delete(`/admin/invoices/${id}`, { preserveScroll: true });
        }
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Invoices" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Invoices</h1>
                        <p className="text-sm text-muted-foreground">Manage invoices</p>
                    </div>
                    <Link href="/admin/invoices/create">
                        <Button size="sm">Create Invoice</Button>
                    </Link>
                </div>

                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Search</label>
                        <Input
                            placeholder="Search by invoice number or customer..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && applyFilters()}
                        />
                    </div>
                    <div className="w-[160px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Status</label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
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
                                <th className="p-3 font-medium">Invoice #</th>
                                <th className="p-3 font-medium">Customer</th>
                                <th className="p-3 font-medium">Items</th>
                                <th className="p-3 font-medium">Total</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium">Due Date</th>
                                <th className="p-3 font-medium">Created</th>
                                <th className="p-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.data.map((inv) => (
                                <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="p-3 font-medium">{inv.invoice_number}</td>
                                    <td className="p-3">{inv.customer_name || '\u2014'}</td>
                                    <td className="p-3">{inv.items_count}</td>
                                    <td className="p-3">${inv.total.toLocaleString()}</td>
                                    <td className="p-3">
                                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[inv.status] || 'bg-gray-100 text-gray-700'}`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="p-3">{inv.due_date || '\u2014'}</td>
                                    <td className="p-3 text-muted-foreground">{inv.created_at}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/invoices/${inv.id}`}>
                                                <Button variant="ghost" size="sm">View</Button>
                                            </Link>
                                            <Link href={`/admin/invoices/${inv.id}/print`}>
                                                <Button variant="ghost" size="sm">Print</Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive"
                                                onClick={() => handleDelete(inv.id, inv.invoice_number)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {invoices.data.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-muted-foreground">No invoices found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {invoices.from}\u2013{invoices.to} of {invoices.total}</span>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: invoices.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/invoices?page=${page}`}
                                preserveState
                                className={`inline-flex size-8 items-center justify-center rounded text-sm ${
                                    page === invoices.current_page
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

InvoicesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Invoices', href: '/admin/invoices' },
    ],
};
