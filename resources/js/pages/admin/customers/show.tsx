import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { ProtectedRoute } from '@/components/protected-route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Customer {
    id: number;
    customer_code: string;
    full_name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    loyalty_points: number;
    wallet_balance: number;
    notes: string | null;
    status: boolean;
    orders_count: number;
    created_at: string;
    updated_at: string;
}

interface Order {
    id: number;
    order_number: string;
    total: number;
    order_status: string;
    payment_status: string;
    items_count: number;
    created_at: string;
}

export default function ShowCustomer({ customer, orders }: { customer: Customer; orders: Order[] }) {
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
            <Head title={customer.full_name} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading title={customer.full_name} description={`Code: ${customer.customer_code}`} />
                    <div className="flex items-center gap-2">
                        <Link href={`/admin/customers/${customer.id}/edit`}>
                            <Button>Edit Customer</Button>
                        </Link>
                        <Link href="/admin/customers">
                            <Button variant="outline">Back to Customers</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-6">
                        <div className="rounded-xl border p-5">
                            <h3 className="mb-4 text-lg font-semibold">Customer Details</h3>
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Code</dt>
                                    <dd className="font-medium">{customer.customer_code}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Email</dt>
                                    <dd>{customer.email || '—'}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Phone</dt>
                                    <dd>{customer.phone || '—'}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Status</dt>
                                    <dd>
                                        <Badge variant={customer.status ? 'default' : 'secondary'}>
                                            {customer.status ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Member Since</dt>
                                    <dd>{customer.created_at}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="rounded-xl border p-5">
                            <h3 className="mb-4 text-lg font-semibold">Statistics</h3>
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Total Orders</dt>
                                    <dd className="font-medium">{customer.orders_count}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Loyalty Points</dt>
                                    <dd className="font-medium">{customer.loyalty_points}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Wallet Balance</dt>
                                    <dd className="font-medium">${customer.wallet_balance.toFixed(2)}</dd>
                                </div>
                            </dl>
                        </div>

                        {customer.address && (
                            <div className="rounded-xl border p-5">
                                <h3 className="mb-4 text-lg font-semibold">Address</h3>
                                <p className="text-sm text-muted-foreground">{customer.address}</p>
                            </div>
                        )}

                        {customer.notes && (
                            <div className="rounded-xl border p-5">
                                <h3 className="mb-4 text-lg font-semibold">Notes</h3>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{customer.notes}</p>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-2">
                        <div className="rounded-xl border p-5">
                            <h3 className="mb-4 text-lg font-semibold">Order History ({orders.length})</h3>
                            {orders.length > 0 ? (
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b text-left">
                                            <th className="pb-2 font-medium">Order</th>
                                            <th className="pb-2 font-medium text-right">Total</th>
                                            <th className="pb-2 font-medium">Status</th>
                                            <th className="pb-2 font-medium">Payment</th>
                                            <th className="pb-2 font-medium">Date</th>
                                            <th className="pb-2 font-medium text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order) => (
                                            <tr key={order.id} className="border-b last:border-0">
                                                <td className="py-2 font-medium">{order.order_number}</td>
                                                <td className="py-2 text-right">${order.total.toFixed(2)}</td>
                                                <td className="py-2">
                                                    <Badge variant={statusBadgeVariant[order.order_status] || 'secondary'}>
                                                        {order.order_status}
                                                    </Badge>
                                                </td>
                                                <td className="py-2">
                                                    <Badge variant={paymentBadgeVariant[order.payment_status] || 'secondary'}>
                                                        {order.payment_status}
                                                    </Badge>
                                                </td>
                                                <td className="py-2 text-muted-foreground">{order.created_at}</td>
                                                <td className="py-2 text-right">
                                                    <Link href={`/admin/orders/${order.id}`}>
                                                        <Button variant="ghost" size="sm">View</Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="py-8 text-center text-sm text-muted-foreground">No orders yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

ShowCustomer.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Customers', href: '/admin/customers' },
        { title: 'Customer Details', href: '' },
    ],
};
