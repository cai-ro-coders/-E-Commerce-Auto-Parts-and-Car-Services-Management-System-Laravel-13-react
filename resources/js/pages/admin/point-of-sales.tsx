import { Head, router } from '@inertiajs/react';
import { useState, useMemo, useRef } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Banknote, CreditCard, DollarSign, Landmark, Minus, Plus, Search, Trash2, ShoppingCart } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    sku: string;
    selling_price: number;
    image: string | null;
    stock: number;
}

interface Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
}

interface CartItem {
    product_id: number;
    name: string;
    quantity: number;
    unit_price: number;
    image: string | null;
}

interface ReceiptData {
    order_number: string;
    customer_name: string | null;
    items: { product_name: string; quantity: number; total: number }[];
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    payment_method: string;
    notes: string | null;
    created_at: string;
}

const paymentMethods = [
    { value: 'cash', label: 'Cash', icon: DollarSign },
    { value: 'card', label: 'Card', icon: CreditCard },
    { value: 'bank', label: 'Bank', icon: Landmark },
    { value: 'e-wallet', label: 'E-Wallet', icon: Banknote },
];

const paymentLabels: Record<string, string> = {
    cash: 'Cash',
    card: 'Card',
    bank: 'Bank',
    'e-wallet': 'E-Wallet',
};

export default function PointOfSale({ products, customers }: { products: Product[]; customers: Customer[] }) {
    const [search, setSearch] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [discount, setDiscount] = useState('0');
    const [tax, setTax] = useState('0');
    const [notes, setNotes] = useState('');
    const [cart, setCart] = useState<CartItem[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [receipt, setReceipt] = useState<ReceiptData | null>(null);
    const printRef = useRef<HTMLDivElement>(null);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()))
    );

    const subtotal = useMemo(() => cart.reduce((s, i) => s + i.quantity * i.unit_price, 0), [cart]);
    const discountNum = parseFloat(discount) || 0;
    const taxNum = parseFloat(tax) || 0;
    const total = subtotal - discountNum + taxNum;

    const customerName = customers.find(c => String(c.id) === customerId)?.name;

    function addToCart(product: Product) {
        setCart(prev => {
            const existing = prev.find(i => i.product_id === product.id);
            if (existing) {
                return prev.map(i =>
                    i.product_id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, {
                product_id: product.id,
                name: product.name,
                quantity: 1,
                unit_price: product.selling_price,
                image: product.image,
            }];
        });
    }

    function updateQty(productId: number, qty: number) {
        if (qty <= 0) {
            setCart(prev => prev.filter(i => i.product_id !== productId));
            return;
        }
        setCart(prev => prev.map(i =>
            i.product_id === productId ? { ...i, quantity: qty } : i
        ));
    }

    function removeFromCart(productId: number) {
        setCart(prev => prev.filter(i => i.product_id !== productId));
    }

    function handleCheckout() {
        if (cart.length === 0) return;
        setSubmitting(true);

        router.post('/admin/point-of-sales', {
            customer_id: customerId || null,
            items: cart.map(i => ({
                product_id: i.product_id,
                quantity: i.quantity,
                unit_price: i.unit_price,
            })),
            payment_method: paymentMethod,
            discount: discountNum,
            tax: taxNum,
            notes: notes || null,
        }, {
            preserveScroll: true,
            onSuccess: (page: any) => {
                const data = page.props?.receipt;
                if (data) {
                    setReceipt(data);
                }
                setCart([]);
                setCustomerId('');
                setDiscount('0');
                setTax('0');
                setNotes('');
                setSubmitting(false);
            },
            onError: () => setSubmitting(false),
            onFinish: () => setSubmitting(false),
        });
    }

    function handlePrintReceipt() {
        if (!receipt) return;
        const w = window.open('', '_blank');
        if (!w) return;

        const date = new Date(receipt.created_at);
        const dateStr = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

        w.document.write(`
            <html>
            <head>
                <title>POS Receipt - ${receipt.order_number}</title>
                <style>
                    body { font-family: 'Courier New', monospace; font-size: 13px; margin: 0; padding: 20px; color: #333; }
                    .receipt { max-width: 300px; margin: 0 auto; }
                    .center { text-align: center; }
                    h1 { font-size: 16px; margin: 0 0 4px 0; text-transform: uppercase; }
                    h2 { font-size: 14px; margin: 8px 0 4px 0; }
                    .divider { border-top: 1px dashed #333; margin: 8px 0; }
                    table { width: 100%; font-size: 12px; }
                    th { text-align: left; padding: 2px 0; }
                    td { padding: 2px 0; }
                    .text-right { text-align: right; }
                    .total-row td { font-weight: bold; padding-top: 4px; }
                    .label { color: #666; }
                    .footer { text-align: center; font-size: 11px; color: #666; margin-top: 12px; }
                </style>
            </head>
            <body>
                <div class="receipt">
                    <div class="center">
                        <h1>Car Service Management System</h1>
                        <p style="font-size:11px;margin:2px 0">123 Service Road, Auto Nagar, City - 600001</p>
                        <p style="font-size:11px;margin:2px 0">Phone: +91-9876543210 | Email: info@autocarepro.com</p>
                    </div>

                    <div class="divider"></div>

                    <div class="center">
                        <h2>POINT OF SALE RECEIPT</h2>
                        <p style="font-size:12px;margin:2px 0"><span class="label">Invoice:</span> ${receipt.order_number}</p>
                        <p style="font-size:12px;margin:2px 0"><span class="label">Date:</span> ${dateStr}</p>
                        <p style="font-size:12px;margin:2px 0"><span class="label">Customer:</span> ${receipt.customer_name || 'Walk-in'}</p>
                    </div>

                    <div class="divider"></div>

                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th class="text-right">Qty</th>
                                <th class="text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${receipt.items.map(item => `
                                <tr>
                                    <td>${item.product_name}</td>
                                    <td class="text-right">x${item.quantity}</td>
                                    <td class="text-right">$${item.total.toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>

                    <div class="divider"></div>

                    <table>
                        <tr>
                            <td class="label">Subtotal</td>
                            <td class="text-right">$${receipt.subtotal.toFixed(2)}</td>
                        </tr>
                        ${receipt.discount > 0 ? `<tr><td class="label">Discount</td><td class="text-right">-$${receipt.discount.toFixed(2)}</td></tr>` : ''}
                        ${receipt.tax > 0 ? `<tr><td class="label">Tax</td><td class="text-right">+$${receipt.tax.toFixed(2)}</td></tr>` : ''}
                        <tr class="total-row">
                            <td>Total</td>
                            <td class="text-right">$${receipt.total.toFixed(2)}</td>
                        </tr>
                    </table>

                    <div class="divider"></div>

                    <div class="center">
                        <p style="font-size:12px;margin:2px 0"><span class="label">Payment:</span> Paid (${paymentLabels[receipt.payment_method] || receipt.payment_method})</p>
                        <p style="font-size:12px;margin:2px 0">$${receipt.total.toFixed(2)}</p>
                        ${receipt.notes ? `<p style="font-size:11px;margin:4px 0">Notes: ${receipt.notes}</p>` : ''}
                    </div>

                    <div class="divider"></div>

                    <div class="center footer">
                        <p>Thank you for your business!</p>
                        <p>Car Service Management System</p>
                    </div>
                </div>
                <script>window.print();window.onafterprint=function(){window.close()};</script>
            </body>
            </html>
        `);
        w.document.close();
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Point of Sale" />

            <div className="flex flex-1 flex-col gap-4 p-4 h-full">
                <h1 className="text-2xl font-bold">Point of Sale</h1>

                <div className="flex flex-1 gap-4 min-h-0">
                    {/* Products Panel */}
                    <div className="flex-1 flex flex-col rounded-xl border">
                        <div className="p-3 border-b">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-3">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                                {filteredProducts.map(p => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => addToCart(p)}
                                        className="flex flex-col rounded-lg border hover:border-primary hover:shadow-sm transition-all cursor-pointer text-left overflow-hidden"
                                    >
                                        <div className="aspect-square bg-muted flex items-center justify-center">
                                            {p.image ? (
                                                <img src={`/storage/${p.image}`} alt={p.name} className="size-full object-cover" />
                                            ) : (
                                                <div className="flex items-center justify-center size-full text-muted-foreground text-xs">No Image</div>
                                            )}
                                        </div>
                                        <div className="p-2">
                                            <p className="text-xs font-medium line-clamp-2 leading-tight">{p.name}</p>
                                            <p className="text-sm font-bold text-primary mt-1">${p.selling_price.toFixed(2)}</p>
                                        </div>
                                    </button>
                                ))}
                                {filteredProducts.length === 0 && (
                                    <p className="col-span-full text-center text-muted-foreground py-8">No products found.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Cart Panel */}
                    <div className="w-96 flex flex-col rounded-xl border">
                        <div className="p-3 border-b flex items-center gap-2">
                            <ShoppingCart className="size-4" />
                            <span className="font-semibold">Cart</span>
                            <Badge variant="secondary" className="ml-auto">{cart.length}</Badge>
                        </div>

                        <div className="p-3 border-b">
                            <Label className="text-xs">Customer</Label>
                            <Select value={customerId} onValueChange={setCustomerId}>
                                <SelectTrigger><SelectValue placeholder="Walk-in customer" /></SelectTrigger>
                                <SelectContent>
                                    {customers.map(c => (
                                        <SelectItem key={c.id} value={String(c.id)}>
                                            {c.name} {c.phone ? `(${c.phone})` : ''}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex-1 overflow-y-auto p-3 space-y-2">
                            {cart.map(item => (
                                <div key={item.product_id} className="flex items-center gap-3 rounded-lg border p-2">
                                    <div className="size-10 shrink-0 rounded bg-muted flex items-center justify-center overflow-hidden">
                                        {item.image ? (
                                            <img src={`/storage/${item.image}`} alt={item.name} className="size-full object-cover" />
                                        ) : (
                                            <span className="text-[10px] text-muted-foreground">N/A</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium truncate">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">${item.unit_price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => updateQty(item.product_id, item.quantity - 1)}
                                            className="flex size-6 items-center justify-center rounded border hover:bg-muted"
                                        >
                                            <Minus className="size-3" />
                                        </button>
                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                        <button
                                            type="button"
                                            onClick={() => updateQty(item.product_id, item.quantity + 1)}
                                            className="flex size-6 items-center justify-center rounded border hover:bg-muted"
                                        >
                                            <Plus className="size-3" />
                                        </button>
                                    </div>
                                    <div className="text-right min-w-16">
                                        <p className="text-sm font-medium">${(item.quantity * item.unit_price).toFixed(2)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFromCart(item.product_id)}
                                        className="text-muted-foreground hover:text-destructive shrink-0"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            ))}
                            {cart.length === 0 && (
                                <p className="text-center text-muted-foreground py-8 text-sm">Cart is empty</p>
                            )}
                        </div>

                        <div className="p-3 border-t space-y-3">
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label className="text-xs">Discount ($)</Label>
                                    <Input type="number" step="0.01" min="0" value={discount} onChange={e => setDiscount(e.target.value)} />
                                </div>
                                <div>
                                    <Label className="text-xs">Tax ($)</Label>
                                    <Input type="number" step="0.01" min="0" value={tax} onChange={e => setTax(e.target.value)} />
                                </div>
                            </div>

                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                {discountNum > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Discount</span>
                                        <span>-${discountNum.toFixed(2)}</span>
                                    </div>
                                )}
                                {taxNum > 0 && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span>+${taxNum.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between font-bold text-base">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div>
                                <Label className="text-xs mb-1 block">Payment Method</Label>
                                <div className="grid grid-cols-4 gap-1">
                                    {paymentMethods.map(pm => {
                                        const Icon = pm.icon;
                                        return (
                                            <button
                                                key={pm.value}
                                                type="button"
                                                onClick={() => setPaymentMethod(pm.value)}
                                                className={`flex flex-col items-center gap-1 rounded-lg border p-2 text-xs transition-all ${
                                                    paymentMethod === pm.value
                                                        ? 'border-primary bg-primary/10 text-primary font-medium'
                                                        : 'hover:bg-muted'
                                                }`}
                                            >
                                                <Icon className="size-4" />
                                                {pm.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <Label className="text-xs">Notes (optional)</Label>
                                <textarea
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                    rows={2}
                                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                                    placeholder="Optional notes..."
                                />
                            </div>

                            <Button
                                className="w-full"
                                size="lg"
                                onClick={handleCheckout}
                                disabled={cart.length === 0 || submitting}
                            >
                                {submitting ? 'Processing...' : `Complete Sale — $${total.toFixed(2)}`}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Receipt Modal */}
            {receipt && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setReceipt(null)}>
                    <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl" onClick={e => e.stopPropagation()} ref={printRef}>
                        <div className="text-center mb-4">
                            <h2 className="font-bold text-lg">Sale Complete</h2>
                            <p className="text-sm text-muted-foreground">{receipt.order_number}</p>
                        </div>

                        <div className="space-y-2 text-sm border-t pt-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Customer</span>
                                <span>{receipt.customer_name || 'Walk-in'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Payment</span>
                                <span className="capitalize">{paymentLabels[receipt.payment_method]}</span>
                            </div>
                            <div className="flex justify-between font-bold text-base border-t pt-2">
                                <span>Total</span>
                                <span>${receipt.total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <Button className="flex-1" onClick={handlePrintReceipt}>Print Receipt</Button>
                            <Button variant="outline" className="flex-1" onClick={() => setReceipt(null)}>Close</Button>
                        </div>
                    </div>
                </div>
            )}
        </ProtectedRoute>
    );
}

PointOfSale.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'POS', href: '/admin/point-of-sales' },
    ],
};
