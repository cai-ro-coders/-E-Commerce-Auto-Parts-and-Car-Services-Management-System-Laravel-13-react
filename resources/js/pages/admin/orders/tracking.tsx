import { Head, Link } from '@inertiajs/react';
import { ProtectedRoute } from '@/components/protected-route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    order_status: string;
    payment_status: string;
    total: number;
    created_at: string;
    current_step: number;
    status_flow: string[];
}

export default function OrderTracking({ order }: { order: Order }) {
    const stepLabels: Record<string, string> = {
        pending: 'Order Placed',
        processing: 'Processing',
        shipped: 'Shipped',
        completed: 'Delivered',
    };

    const paymentBadgeVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
        pending: 'secondary',
        paid: 'default',
        failed: 'destructive',
        refunded: 'outline',
    };

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={`Track ${order.order_number}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Order Tracking</h1>
                        <p className="text-sm text-muted-foreground">{order.order_number}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={`/admin/orders/${order.id}`}>
                            <Button variant="outline">Back to Order</Button>
                        </Link>
                        <Link href="/admin/orders">
                            <Button variant="outline">All Orders</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="rounded-xl border p-6">
                            <h3 className="mb-8 text-lg font-semibold">Order Progress</h3>
                            <div className="relative">
                                {order.status_flow.map((step, index) => {
                                    const isCompleted = index <= order.current_step;
                                    const isCurrent = index === order.current_step;
                                    const isCancelled = order.order_status === 'cancelled';

                                    return (
                                        <div key={step} className="flex items-start gap-4 pb-8 last:pb-0">
                                            <div className="flex flex-col items-center">
                                                <div
                                                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                                        isCancelled
                                                            ? 'bg-destructive text-destructive-foreground'
                                                            : isCompleted
                                                                ? 'bg-primary text-primary-foreground'
                                                                : 'bg-muted text-muted-foreground'
                                                    } ${isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                                                >
                                                    {isCompleted && !isCancelled ? '✓' : index + 1}
                                                </div>
                                                {index < order.status_flow.length - 1 && (
                                                    <div
                                                        className={`mt-1 h-full w-0.5 ${
                                                            isCancelled
                                                                ? 'bg-destructive/30'
                                                                : isCompleted && index < order.status_flow.length - 1
                                                                    ? 'bg-primary'
                                                                    : 'bg-muted'
                                                        }`}
                                                    />
                                                )}
                                            </div>
                                            <div className="pt-1">
                                                <p
                                                    className={`font-medium ${
                                                        isCancelled
                                                            ? 'text-destructive'
                                                            : isCompleted
                                                                ? 'text-foreground'
                                                                : 'text-muted-foreground'
                                                    }`}
                                                >
                                                    {stepLabels[step] || step}
                                                </p>
                                                {isCurrent && !isCancelled && (
                                                    <p className="text-xs text-muted-foreground mt-1">Current status</p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                                {order.order_status === 'cancelled' && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                                                ✕
                                            </div>
                                        </div>
                                        <div className="pt-1">
                                            <p className="font-medium text-destructive">Cancelled</p>
                                            <p className="text-xs text-muted-foreground mt-1">This order has been cancelled</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-xl border p-5">
                            <h3 className="mb-4 text-lg font-semibold">Order Info</h3>
                            <dl className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Customer</dt>
                                    <dd className="font-medium">{order.customer_name}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Total</dt>
                                    <dd className="font-medium">${order.total.toFixed(2)}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Payment</dt>
                                    <dd>
                                        <Badge variant={paymentBadgeVariant[order.payment_status] || 'secondary'}>
                                            {order.payment_status}
                                        </Badge>
                                    </dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-muted-foreground">Date</dt>
                                    <dd className="text-xs">{order.created_at}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

OrderTracking.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Orders', href: '/admin/orders' },
        { title: 'Tracking', href: '' },
    ],
};
