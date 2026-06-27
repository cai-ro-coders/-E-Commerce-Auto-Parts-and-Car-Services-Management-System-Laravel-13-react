import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Product {
    id: number;
    name: string;
    sku: string;
    selling_price: number;
    image: string | null;
}

interface Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
}

interface CartItem {
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
}

export default function CreateInvoice({ customers, products }: { customers: Customer[]; products: Product[] }) {
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [status, setStatus] = useState('pending');
    const [dueDate, setDueDate] = useState('');
    const [discount, setDiscount] = useState('0');
    const [tax, setTax] = useState('0');

    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [itemQty, setItemQty] = useState('1');

    const subtotal = cart.reduce((s, i) => s + i.quantity * i.unit_price, 0);
    const discountNum = parseFloat(discount) || 0;
    const taxNum = parseFloat(tax) || 0;
    const total = subtotal - discountNum + taxNum;

    function addItem() {
        if (!selectedProduct) return;
        const product = products.find(p => String(p.id) === selectedProduct);
        if (!product) return;

        setCart(prev => {
            const existing = prev.find(i => i.product_id === product.id);
            if (existing) {
                return prev.map(i =>
                    i.product_id === product.id
                        ? { ...i, quantity: i.quantity + (parseInt(itemQty) || 1) }
                        : i
                );
            }
            return [...prev, {
                product_id: product.id,
                product_name: product.name,
                quantity: parseInt(itemQty) || 1,
                unit_price: product.selling_price,
            }];
        });
        setSelectedProduct('');
        setItemQty('1');
    }

    function removeItem(productId: number) {
        setCart(prev => prev.filter(i => i.product_id !== productId));
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Create Invoice" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading title="Create Invoice" description="Create a new invoice" />

                <Form
                    method="POST"
                    action="/admin/invoices"
                    className="space-y-6 max-w-3xl"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label>Customer</Label>
                                    <Select value={selectedCustomer} onValueChange={setSelectedCustomer} name="customer_id">
                                        <SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger>
                                        <SelectContent>
                                            {customers.map(c => (
                                                <SelectItem key={c.id} value={String(c.id)}>
                                                    {c.name} {c.phone ? `(${c.phone})` : ''}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <input type="hidden" name="customer_id" value={selectedCustomer} />
                                    <InputError message={errors.customer_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Status</Label>
                                    <Select value={status} onValueChange={setStatus} name="status">
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <input type="hidden" name="status" value={status} />
                                    <InputError message={errors.status} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Discount ($)</Label>
                                    <Input type="number" step="0.01" min="0" value={discount} onChange={e => setDiscount(e.target.value)} name="discount" />
                                    <InputError message={errors.discount} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Tax ($)</Label>
                                    <Input type="number" step="0.01" min="0" value={tax} onChange={e => setTax(e.target.value)} name="tax" />
                                    <InputError message={errors.tax} />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Due Date</Label>
                                    <Input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} name="due_date" />
                                    <InputError message={errors.due_date} />
                                </div>
                            </div>

                            <div className="rounded-xl border p-4">
                                <h3 className="font-semibold mb-3">Invoice Items</h3>

                                <div className="flex items-end gap-3 mb-4">
                                    <div className="flex-1">
                                        <Label className="text-xs">Product</Label>
                                        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                                            <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                                            <SelectContent>
                                                {products.map(p => (
                                                    <SelectItem key={p.id} value={String(p.id)}>
                                                        {p.name} (${p.selling_price})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="w-20">
                                        <Label className="text-xs">Qty</Label>
                                        <Input type="number" min="1" value={itemQty} onChange={e => setItemQty(e.target.value)} />
                                    </div>
                                    <Button type="button" size="sm" onClick={addItem}>Add</Button>
                                </div>

                                {cart.length > 0 ? (
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b bg-muted/50 text-left">
                                                <th className="p-2 font-medium">Item</th>
                                                <th className="p-2 font-medium">Qty</th>
                                                <th className="p-2 font-medium">Unit Price</th>
                                                <th className="p-2 font-medium">Total</th>
                                                <th className="p-2 font-medium"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cart.map((item, i) => (
                                                <tr key={i} className="border-b last:border-0">
                                                    <td className="p-2">
                                                        {item.product_name}
                                                        <input type="hidden" name={`items[${i}][product_id]`} value={item.product_id} />
                                                        <input type="hidden" name={`items[${i}][description]`} value={item.product_name} />
                                                    </td>
                                                    <td className="p-2">
                                                        <input type="hidden" name={`items[${i}][quantity]`} value={item.quantity} />
                                                        {item.quantity}
                                                    </td>
                                                    <td className="p-2">
                                                        <input type="hidden" name={`items[${i}][unit_price]`} value={item.unit_price} />
                                                        ${item.unit_price.toFixed(2)}
                                                    </td>
                                                    <td className="p-2">${(item.quantity * item.unit_price).toFixed(2)}</td>
                                                    <td className="p-2">
                                                        <Button type="button" variant="ghost" size="sm" className="text-destructive" onClick={() => removeItem(item.product_id)}>
                                                            Remove
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-4">No items added yet.</p>
                                )}

                                <div className="mt-3 text-right space-y-1 text-sm">
                                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                                    <p>Discount: -${discountNum.toFixed(2)}</p>
                                    <p>Tax: +${taxNum.toFixed(2)}</p>
                                    <p className="font-bold text-base">Total: ${total.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing || cart.length === 0}>Create Invoice</Button>
                                <Link href="/admin/invoices">
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

CreateInvoice.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Invoices', href: '/admin/invoices' },
        { title: 'Create Invoice', href: '/admin/invoices/create' },
    ],
};
