import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Heading from '@/components/heading';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface OrderItem {
    id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
    total: number;
}

interface Order {
    id: number;
    order_number: string;
    customer_name: string;
    subtotal: number;
    discount: number;
    tax: number;
    shipping_fee: number;
    total: number;
    order_status: string;
    payment_status: string;
    items: OrderItem[];
}

export default function EditOrder({ order }: { order: Order }) {
    const [orderStatus, setOrderStatus] = useState(order.order_status);
    const [paymentStatus, setPaymentStatus] = useState(order.payment_status);

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={`Edit ${order.order_number}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading title={`Edit: ${order.order_number}`} description={`Customer: ${order.customer_name}`} />

                <Form
                    action={`/admin/orders/${order.id}`}
                    method="PUT"
                    className="space-y-6 max-w-xl"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="rounded-xl border p-5">
                                <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
                                <dl className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Subtotal</dt>
                                        <dd>${order.subtotal.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Discount</dt>
                                        <dd>${order.discount.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Tax</dt>
                                        <dd>${order.tax.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex justify-between">
                                        <dt className="text-muted-foreground">Shipping</dt>
                                        <dd>${order.shipping_fee.toFixed(2)}</dd>
                                    </div>
                                    <div className="flex justify-between border-t pt-2 font-semibold">
                                        <dt>Total</dt>
                                        <dd>${order.total.toFixed(2)}</dd>
                                    </div>
                                </dl>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Order Status</label>
                                    <Select value={orderStatus} onValueChange={setOrderStatus}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="processing">Processing</SelectItem>
                                            <SelectItem value="shipped">Shipped</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <input type="hidden" name="order_status" value={orderStatus} />
                                    {errors.order_status && <p className="text-sm text-destructive">{errors.order_status}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium">Payment Status</label>
                                    <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="failed">Failed</SelectItem>
                                            <SelectItem value="refunded">Refunded</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <input type="hidden" name="payment_status" value={paymentStatus} />
                                    {errors.payment_status && <p className="text-sm text-destructive">{errors.payment_status}</p>}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Update Order</Button>
                                <Link href="/admin/orders">
                                    <Button variant="outline" type="button">Cancel</Button>
                                </Link>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </ProtectedRoute>
    );
}

EditOrder.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Orders', href: '/admin/orders' },
        { title: 'Edit Order', href: '' },
    ],
};
