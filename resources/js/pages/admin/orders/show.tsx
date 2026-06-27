import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import { ProtectedRoute } from '@/components/protected-route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OrderItem {
    id: number;
    product_name: string;
    product_sku: string;
    quantity: number;
    unit_price: number;
    total: number;
}

interface Customer {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    address: string;
}

interface Order {
    id: number;
    order_number: string;
    customer: Customer | null;
    subtotal: number;
    discount: number;
    tax: number;
    shipping_fee: number;
    total: number;
    order_status: string;
    payment_status: string;
    payment_method: string | null;
    items: OrderItem[];
    created_at: string;
    updated_at: string;
}

export default function ShowOrder({ order }: { order: Order }) {
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

    const paymentMethodLabel: Record<string, string> = {
        cod: 'Cash on Delivery',
        card: 'Credit Card',
    };

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={`Order ${order.order_number}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading title={`Order ${order.order_number}`} description={`Placed on ${order.created_at}`} />
                    <div className="flex items-center gap-2">
                        <Link href={`/admin/orders/${order.id}/tracking`}>
                            <Button variant="outline">Track Order</Button>
                        </Link>
                        <Link href={`/admin/orders/${order.id}/print-receipt`}>
                            <Button variant="outline">Print Receipt</Button>
                        </Link>
                        <Link href={`/admin/orders/${order.id}/edit`}>
                            <Button>Edit Order</Button>
                        </Link>
                        <Link href="/admin/orders">
                            <Button variant="outline">Back to Orders</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-xl border p-5">
                            <h3 className="mb-4 text-lg font-semibold">Order Items</h3>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="pb-2 font-medium">Product</th>
                                        <th className="pb-2 font-medium">SKU</th>
                                        <th className="pb-2 font-medium text-right">Qty</th>
                                        <th className="pb-2 font-medium text-right">Unit Price</th>
                                        <th className="pb-2 font-medium text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item) => (
                                        <tr key={item.id} className="border-b last:border-0">
                                            <td className="py-2 font-medium">{item.product_name}</td>
                                            <td className="py-2 text-muted-foreground">{item.product_sku}</td>
                                            <td className="py-2 text-right">{item.quantity}</td>
                                            <td className="py-2 text-right">${item.unit_price.toFixed(2)}</td>
                                            <td className="py-2 text-right font-medium">${item.total.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-xl border p-5">
                            <h3 className="mb-4 text-lg font-semibold">Customer</h3>
                            {order.customer ? (
                                <div className="space-y-2 text-sm">
                                    <p className="font-medium">{order.customer.full_name}</p>
                                    <p className="text-muted-foreground">{order.customer.email}</p>
                                    {order.customer.phone && <p className="text-muted-foreground">{order.customer.phone}</p>}
                                    {order.customer.address && <p className="text-muted-foreground">{order.customer.address}</p>}
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground">No customer data</p>
                            )}
                        </div>

                        <div className="rounded-xl border p-5">
                            <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
                            <dl className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Subtotal</dt>
                                    <dd>${order.subtotal.toFixed(2)}</dd>
                                </div>
                                {order.discount > 0 && (
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Discount</dt>
                                        <dd className="text-destructive">-${order.discount.toFixed(2)}</dd>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Tax</dt>
                                    <dd>${order.tax.toFixed(2)}</dd>
                                </div>
                                {order.shipping_fee > 0 && (
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Shipping</dt>
                                        <dd>${order.shipping_fee.toFixed(2)}</dd>
                                    </div>
                                )}
                                <div className="flex justify-between border-t pt-2 font-semibold">
                                    <dt>Total</dt>
                                    <dd>${order.total.toFixed(2)}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="rounded-xl border p-5">
                            <h3 className="mb-4 text-lg font-semibold">Status</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Order</span>
                                    <Badge variant={statusBadgeVariant[order.order_status] || 'secondary'}>
                                        {order.order_status}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Payment</span>
                                    <Badge variant={paymentBadgeVariant[order.payment_status] || 'secondary'}>
                                        {order.payment_status}
                                    </Badge>
                                </div>
                                {order.payment_method && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Method</span>
                                        <span className="font-medium text-white">
                                            {paymentMethodLabel[order.payment_method] || order.payment_method}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

ShowOrder.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Orders', href: '/admin/orders' },
        { title: 'Order Details', href: '' },
    ],
};
