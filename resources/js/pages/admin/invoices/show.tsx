import { Head, Link, router } from '@inertiajs/react';
import { ProtectedRoute } from '@/components/protected-route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface InvoiceItem {
    id: number;
    item_type: string;
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
}

interface Payment {
    id: number;
    amount: number;
    payment_method: string;
    payment_date: string;
}

interface Invoice {
    id: number;
    invoice_number: string;
    customer: {
        id: number;
        full_name: string;
        email: string;
        phone: string;
        address: string;
    } | null;
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    status: string;
    due_date: string | null;
    items: InvoiceItem[];
    payments: Payment[];
    created_at: string;
}

const statusStyles: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    pending: 'secondary',
    paid: 'outline',
    cancelled: 'destructive',
};

export default function ShowInvoice({ invoice }: { invoice: Invoice }) {
    function handleDelete() {
        if (confirm(`Delete invoice "${invoice.invoice_number}"?`)) {
            router.delete(`/admin/invoices/${invoice.id}`, { preserveScroll: true });
        }
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={`Invoice ${invoice.invoice_number}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">{invoice.invoice_number}</h1>
                            <Badge variant={statusStyles[invoice.status] || 'secondary'}>
                                {invoice.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Created {invoice.created_at}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={`/admin/invoices/${invoice.id}/print`}>
                            <Button size="sm" variant="outline">Print</Button>
                        </Link>
                        <Button size="sm" variant="destructive" onClick={handleDelete}>Delete</Button>
                        <Link href="/admin/invoices">
                            <Button variant="outline" size="sm">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-3">Customer</h2>
                        {invoice.customer ? (
                            <div className="space-y-1 text-sm">
                                <p><span className="text-muted-foreground">Name:</span> {invoice.customer.full_name}</p>
                                <p><span className="text-muted-foreground">Phone:</span> {invoice.customer.phone || '\u2014'}</p>
                                <p><span className="text-muted-foreground">Email:</span> {invoice.customer.email || '\u2014'}</p>
                                <p><span className="text-muted-foreground">Address:</span> {invoice.customer.address || '\u2014'}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No customer</p>
                        )}
                    </div>

                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-3">Summary</h2>
                        <div className="space-y-1 text-sm">
                            <p><span className="text-muted-foreground">Subtotal:</span> ${invoice.subtotal.toLocaleString()}</p>
                            {invoice.discount > 0 && <p><span className="text-muted-foreground">Discount:</span> -${invoice.discount.toLocaleString()}</p>}
                            {invoice.tax > 0 && <p><span className="text-muted-foreground">Tax:</span> +${invoice.tax.toLocaleString()}</p>}
                            <hr className="my-1" />
                            <p className="font-medium"><span className="text-muted-foreground">Total:</span> ${invoice.total.toLocaleString()}</p>
                            {invoice.due_date && <p><span className="text-muted-foreground">Due Date:</span> {invoice.due_date}</p>}
                        </div>
                    </div>

                    {invoice.payments.length > 0 && (
                        <div className="rounded-xl border p-4">
                            <h2 className="font-semibold mb-3">Payments</h2>
                            <div className="space-y-2 text-sm">
                                {invoice.payments.map(p => (
                                    <div key={p.id} className="flex justify-between">
                                        <span>{p.payment_method} - {p.payment_date}</span>
                                        <span className="font-medium">${p.amount.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="rounded-xl border p-4">
                    <h2 className="font-semibold mb-3">Items</h2>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50 text-left">
                                <th className="p-3 font-medium">Description</th>
                                <th className="p-3 font-medium">Qty</th>
                                <th className="p-3 font-medium">Unit Price</th>
                                <th className="p-3 font-medium">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoice.items.map(item => (
                                <tr key={item.id} className="border-b last:border-0">
                                    <td className="p-3">{item.description || '\u2014'}</td>
                                    <td className="p-3">{item.quantity}</td>
                                    <td className="p-3">${item.unit_price.toLocaleString()}</td>
                                    <td className="p-3">${item.total.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ProtectedRoute>
    );
}

ShowInvoice.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Invoices', href: '/admin/invoices' },
        { title: 'Invoice Details', href: '' },
    ],
};
