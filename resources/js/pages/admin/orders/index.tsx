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

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    customer_email: string;
    subtotal: number;
    discount: number;
    tax: number;
    shipping_fee: number;
    total: number;
    order_status: string;
    payment_status: string;
    items_count: number;
    created_at: string;
}

export default function OrdersIndex({
    orders,
    filters,
}: {
    orders: { data: Order[]; links: any[]; from: number; to: number; total: number; last_page: number; current_page: number };
    filters: { search: string; status: string; payment_status: string };
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [paymentStatus, setPaymentStatus] = useState(filters.payment_status || '');

    function applyFilters() {
        router.get('/admin/orders', {
            search,
            status: status === 'all' ? '' : status,
            payment_status: paymentStatus === 'all' ? '' : paymentStatus,
        }, { preserveState: true, replace: true });
    }

    function resetFilters() {
        setSearch('');
        setStatus('');
        setPaymentStatus('');
        router.get('/admin/orders', {}, { preserveState: true, replace: true });
    }

    function handleExport() {
        window.open('/admin/orders/export', '_blank');
    }

    function handleDelete(id: number, orderNumber: string) {
        if (confirm(`Delete order "${orderNumber}"? This cannot be undone.`)) {
            router.delete(`/admin/orders/${id}`, {
                preserveScroll: true,
            });
        }
    }

    const statusBadgeVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        pending: 'secondary',
        processing: 'default',
        shipped: 'outline',
        completed: 'default',
        cancelled: 'destructive',
    };

    const paymentBadgeVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        pending: 'secondary',
        paid: 'default',
        failed: 'destructive',
        refunded: 'outline',
    };

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Orders" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Orders</h1>
                        <p className="text-sm text-muted-foreground">Manage customer orders</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleExport}>
                            Export CSV
                        </Button>
                    </div>
                </div>

                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Search</label>
                        <Input
                            placeholder="Search by order number or customer..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && applyFilters()}
                        />
                    </div>
                    <div className="w-[160px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Order Status</label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-[160px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Payment</label>
                        <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="failed">Failed</SelectItem>
                                <SelectItem value="refunded">Refunded</SelectItem>
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
                                <th className="p-3 font-medium">Order</th>
                                <th className="p-3 font-medium">Customer</th>
                                <th className="p-3 font-medium">Items</th>
                                <th className="p-3 font-medium">Total</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium">Payment</th>
                                <th className="p-3 font-medium">Date</th>
                                <th className="p-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.data.map((order) => (
                                <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="p-3">
                                        <Link href={`/admin/orders/${order.id}`} className="font-medium hover:underline">
                                            {order.order_number}
                                        </Link>
                                    </td>
                                    <td className="p-3">
                                        <div className="font-medium">{order.customer_name}</div>
                                        <div className="text-xs text-muted-foreground">{order.customer_email}</div>
                                    </td>
                                    <td className="p-3">{order.items_count}</td>
                                    <td className="p-3 font-medium">${order.total.toFixed(2)}</td>
                                    <td className="p-3">
                                        <Badge variant={statusBadgeVariant[order.order_status] || 'secondary'}>
                                            {order.order_status}
                                        </Badge>
                                    </td>
                                    <td className="p-3">
                                        <Badge variant={paymentBadgeVariant[order.payment_status] || 'secondary'}>
                                            {order.payment_status}
                                        </Badge>
                                    </td>
                                    <td className="p-3 text-muted-foreground">{order.created_at}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/orders/${order.id}`}>
                                                <Button variant="ghost" size="sm">View</Button>
                                            </Link>
                                            <Link href={`/admin/orders/${order.id}/edit`}>
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(order.id, order.order_number)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {orders.data.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-muted-foreground">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {orders.from}–{orders.to} of {orders.total}</span>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: orders.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/orders?page=${page}`}
                                preserveState
                                className={`inline-flex size-8 items-center justify-center rounded text-sm ${
                                    page === orders.current_page
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

OrdersIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Orders', href: '/admin/orders' },
    ],
};
