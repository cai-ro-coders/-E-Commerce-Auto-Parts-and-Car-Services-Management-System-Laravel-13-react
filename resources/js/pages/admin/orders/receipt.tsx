import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';

interface OrderItem {
    product_name: string;
    quantity: number;
    unit_price: number;
    total: number;
}

interface Customer {
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
    items: OrderItem[];
    created_at: string;
}

export default function PrintReceipt({ order }: { order: Order }) {
    useEffect(() => {
        setTimeout(() => window.print(), 500);
    }, []);

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={`Receipt - ${order.order_number}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="no-print flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Receipt</h1>
                        <p className="text-sm text-muted-foreground">Print preview for {order.order_number}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={() => window.print()}>Print</Button>
                        <Link href={`/admin/orders/${order.id}`}>
                            <Button variant="outline">Back to Order</Button>
                        </Link>
                    </div>
                </div>

                <div className="mx-auto w-full max-w-lg rounded-xl border p-8 print:border-0 print:p-0">
                    <div className="text-center border-b pb-4 mb-4">
                        <h2 className="text-xl font-bold">Receipt</h2>
                        <p className="text-sm text-muted-foreground">{order.order_number}</p>
                        <p className="text-xs text-muted-foreground">{order.created_at}</p>
                    </div>

                    {order.customer && (
                        <div className="mb-4 text-sm">
                            <p className="font-medium">{order.customer.full_name}</p>
                            <p className="text-muted-foreground">{order.customer.email}</p>
                            {order.customer.phone && <p className="text-muted-foreground">{order.customer.phone}</p>}
                            {order.customer.address && <p className="text-muted-foreground">{order.customer.address}</p>}
                        </div>
                    )}

                    <table className="w-full text-sm mb-4">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="pb-2 font-medium">Item</th>
                                <th className="pb-2 font-medium text-right">Qty</th>
                                <th className="pb-2 font-medium text-right">Price</th>
                                <th className="pb-2 font-medium text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, idx) => (
                                <tr key={idx} className="border-b last:border-0">
                                    <td className="py-2">{item.product_name}</td>
                                    <td className="py-2 text-right">{item.quantity}</td>
                                    <td className="py-2 text-right">${item.unit_price.toFixed(2)}</td>
                                    <td className="py-2 text-right">${item.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="border-t pt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${order.subtotal.toFixed(2)}</span>
                        </div>
                        {order.discount > 0 && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Discount</span>
                                <span className="text-destructive">-${order.discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Tax</span>
                            <span>${order.tax.toFixed(2)}</span>
                        </div>
                        {order.shipping_fee > 0 && (
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                <span>${order.shipping_fee.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between border-t pt-2 font-bold">
                            <span>Total</span>
                            <span>${order.total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-xs text-muted-foreground">
                        <p>Thank you for your business!</p>
                        <p>Payment: {order.payment_status}</p>
                    </div>
                </div>
            </div>

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                }
            `}</style>
        </ProtectedRoute>
    );
}

PrintReceipt.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Orders', href: '/admin/orders' },
        { title: 'Receipt', href: '' },
    ],
};
