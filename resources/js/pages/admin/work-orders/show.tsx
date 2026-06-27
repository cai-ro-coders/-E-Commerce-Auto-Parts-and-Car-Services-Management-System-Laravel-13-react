import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Customer {
    id: number;
    full_name: string;
    phone: string;
    email: string;
    address: string;
}

interface RepairPart {
    id: number;
    product_name: string;
    product_sku: string | null;
    quantity: number;
    unit_price: number;
    total: number;
}

interface RepairOrder {
    id: number;
    labor_cost: number;
    parts_cost: number;
    total_cost: number;
    notes: string;
    status: string;
    parts: RepairPart[];
}

interface MechanicAssignment {
    id: number;
    mechanic_name: string;
    assigned_at: string;
    completed_at: string | null;
    status: string;
}

interface Product {
    id: number;
    name: string;
    selling_price: number;
    image: string | null;
}

interface WorkOrder {
    id: number;
    job_number: string;
    customer: Customer | null;
    vehicle_name: string | null;
    vehicle_plate: string | null;
    booking_number: string | null;
    estimated_cost: number;
    total_cost: number;
    inspection_notes: string | null;
    status: string;
    services: { id: number; name: string; price: number; duration: number | null }[];
    repair_orders: RepairOrder[];
    mechanic_assignments: MechanicAssignment[];
    created_at: string;
    updated_at: string;
}

const statusList = ['waiting', 'assigned', 'in_progress', 'completed', 'cancelled'] as const;

const statusStyles: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    waiting: 'secondary',
    assigned: 'default',
    in_progress: 'default',
    completed: 'outline',
    cancelled: 'destructive',
};

const statusLabels: Record<string, string> = {
    waiting: 'Waiting',
    assigned: 'Assigned',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
};

export default function ShowWorkOrder({ workOrder, products }: { workOrder: WorkOrder; products: Product[] }) {
    const repairOrder = workOrder.repair_orders[0] || null;

    const [productSearch, setProductSearch] = useState('');
    const [showProductDropdown, setShowProductDropdown] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [unitPrice, setUnitPrice] = useState('0');

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(productSearch.toLowerCase())
    );

    const selectedProduct = products.find(p => String(p.id) === selectedProductId);

    const [notes, setNotes] = useState(repairOrder?.notes || '');
    const [savingNotes, setSavingNotes] = useState(false);

    const [status, setStatus] = useState(workOrder.status);
    const [savingStatus, setSavingStatus] = useState(false);

    const partsTotal = repairOrder?.parts.reduce((sum, p) => sum + p.total, 0) || 0;
    const laborCost = repairOrder?.labor_cost || 0;
    const totalCharges = partsTotal + laborCost;

    function selectProduct(product: Product) {
        setSelectedProductId(String(product.id));
        setUnitPrice(String(product.selling_price));
        setProductSearch(product.name);
        setShowProductDropdown(false);
    }

    function handleAddPart() {
        if (!selectedProductId) return;
        router.post(
            `/admin/work-orders/${workOrder.id}/add-part`,
            {
                product_id: selectedProductId,
                quantity: parseInt(quantity, 10),
                unit_price: parseFloat(unitPrice),
            },
            { preserveScroll: true }
        );
    }

    function handleSaveNotes() {
        setSavingNotes(true);
        router.post(
            `/admin/work-orders/${workOrder.id}/update-notes`,
            { notes },
            { preserveScroll: true, onFinish: () => setSavingNotes(false) }
        );
    }

    function handleUpdateStatus(value: string) {
        setStatus(value);
        setSavingStatus(true);
        router.post(
            `/admin/work-orders/${workOrder.id}/update-status`,
            { status: value },
            { preserveScroll: true, onFinish: () => setSavingStatus(false) }
        );
    }

    function handleGenerateInvoice() {
        router.post(`/admin/work-orders/${workOrder.id}/generate-invoice`, {}, { preserveScroll: true });
    }

    function handlePrint() {
        const w = window.open('', '_blank');
        if (!w) return;

        const statusLabel = statusLabels[workOrder.status] || workOrder.status;
        const ro = repairOrder;
        const partsTotal = ro?.parts.reduce((s, p) => s + p.total, 0) || 0;
        const laborCost = ro?.labor_cost || 0;
        const grandTotal = partsTotal + laborCost;
        const mechanicName = workOrder.mechanic_assignments[0]?.mechanic_name || '\u2014';
        const completedAt = workOrder.mechanic_assignments.find(ma => ma.completed_at)?.completed_at || '';
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

        w.document.write(`
            <html>
            <head>
                <title>Work Order - ${workOrder.job_number}</title>
                <style>
                    body { font-family: Arial, sans-serif; font-size: 13px; margin: 40px; color: #333; }
                    .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 20px; }
                    .header h1 { margin: 0; font-size: 22px; text-transform: uppercase; }
                    .header p { margin: 4px 0; font-size: 12px; color: #555; }
                    .wo-title { text-align: center; margin: 20px 0; }
                    .wo-title h2 { margin: 0; font-size: 18px; text-transform: uppercase; letter-spacing: 2px; }
                    .wo-title .badge { display: inline-block; padding: 3px 12px; border-radius: 4px; font-size: 11px; font-weight: bold; margin-top: 5px; }
                    .badge-completed { background: #16a34a; color: #fff; }
                    .grid { display: flex; gap: 40px; margin: 20px 0; }
                    .grid > div { flex: 1; }
                    .section-title { font-size: 13px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-bottom: 8px; }
                    table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                    th { background: #f3f4f6; text-align: left; padding: 6px 8px; font-size: 12px; border: 1px solid #ddd; }
                    td { padding: 6px 8px; border: 1px solid #ddd; font-size: 12px; }
                    .text-right { text-align: right; }
                    .totals { margin-top: 10px; text-align: right; }
                    .totals p { margin: 2px 0; font-size: 12px; }
                    .totals .grand { font-size: 14px; font-weight: bold; }
                    hr { border: none; border-top: 1px solid #ddd; margin: 6px 0; }
                    .notes { margin: 20px 0; }
                    .notes p { font-size: 12px; margin: 2px 0; }
                    .footer { text-align: center; font-size: 11px; color: #888; border-top: 1px solid #ccc; padding-top: 15px; margin-top: 30px; }
                    .label { color: #888; }
                    .desc-box { border: 1px solid #ddd; padding: 10px; border-radius: 4px; font-size: 12px; min-height: 40px; margin: 10px 0; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Car Service Management System</h1>
                    <p>123 Service Road, Auto Nagar, City - 600001</p>
                    <p>Phone: +91-9876543210 | Email: info@autocarepro.com</p>
                </div>

                <div class="wo-title">
                    <h2>WORK ORDER</h2>
                    <p style="font-size:16px;font-weight:bold;margin:4px 0">${workOrder.job_number}</p>
                    <span class="badge badge-${workOrder.status}">${statusLabel}</span>
                </div>

                <div class="grid">
                    <div>
                        <div class="section-title">Customer Information</div>
                        <p><span class="label">Name:</span> ${workOrder.customer?.full_name || '\u2014'}</p>
                        <p><span class="label">Mobile:</span> ${workOrder.customer?.phone || '\u2014'}</p>
                        <p><span class="label">Email:</span> ${workOrder.customer?.email || '\u2014'}</p>
                        <p><span class="label">Address:</span> ${workOrder.customer?.address || '\u2014'}</p>
                    </div>
                    <div>
                        <div class="section-title">Vehicle Information</div>
                        <p><span class="label">Vehicle No:</span> ${workOrder.vehicle_plate || '\u2014'}</p>
                        <p><span class="label">Make/Model:</span> ${workOrder.vehicle_name || '\u2014'}</p>
                    </div>
                </div>

                <div class="section-title">Service Details</div>
                <p style="font-size:12px"><span class="label">Mechanic:</span> ${mechanicName}</p>
                <p style="font-size:12px"><span class="label">Created:</span> ${workOrder.created_at}</p>
                ${completedAt ? `<p style="font-size:12px"><span class="label">Completed:</span> ${completedAt}</p>` : ''}

                <div class="section-title">Description</div>
                <div class="desc-box">${workOrder.inspection_notes || '\u2014'}</div>

                <div class="section-title">Parts Used</div>
                <table>
                    <thead>
                        <tr>
                            <th style="width:40px">#</th>
                            <th>Part Name</th>
                            <th>Part No</th>
                            <th style="width:50px">Qty</th>
                            <th style="width:90px">Unit Price</th>
                            <th style="width:90px">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${(ro?.parts || []).map((p, i) => `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${p.product_name}</td>
                                <td>${p.product_sku || '\u2014'}</td>
                                <td>${p.quantity}</td>
                                <td class="text-right">$${p.unit_price.toFixed(2)}</td>
                                <td class="text-right">$${p.total.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                        ${(!ro?.parts || ro.parts.length === 0) ? '<tr><td colspan="6" style="text-align:center;color:#999">No parts used</td></tr>' : ''}
                    </tbody>
                </table>

                <div class="totals">
                    <p><span class="label">Parts Total:</span> $${partsTotal.toFixed(2)}</p>
                    <p><span class="label">Labor Charges:</span> $${laborCost.toFixed(2)}</p>
                    <hr />
                    <p class="grand"><span class="label">Grand Total:</span> $${grandTotal.toFixed(2)}</p>
                </div>

                <div class="section-title">Service Notes / Updates</div>
                <div class="desc-box">${ro?.notes || '\u2014'}</div>

                <div class="footer">
                    <p>This is a computer-generated work order. No signature required.</p>
                    <p>Generated on: ${dateStr} ${timeStr}</p>
                </div>
            </body>
            </html>
        `);
        w.document.close();
        setTimeout(() => w.print(), 300);
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={`Work Order ${workOrder.job_number}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">{workOrder.job_number}</h1>
                            <Badge variant={statusStyles[workOrder.status] || 'secondary'}>
                                {statusLabels[workOrder.status] || workOrder.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            Created {workOrder.created_at} &middot; Updated {workOrder.updated_at}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handlePrint}>Print Invoice</Button>
                        <Button size="sm" onClick={handleGenerateInvoice}>Generate Invoice</Button>
                        <Link href={`/admin/work-orders/${workOrder.id}/edit`}>
                            <Button size="sm">Edit</Button>
                        </Link>
                        <Link href="/admin/work-orders">
                            <Button variant="outline" size="sm">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-3">Customer</h2>
                        {workOrder.customer ? (
                            <div className="space-y-1 text-sm">
                                <p><span className="text-muted-foreground">Name:</span> {workOrder.customer.full_name}</p>
                                <p><span className="text-muted-foreground">Phone:</span> {workOrder.customer.phone || '\u2014'}</p>
                                <p><span className="text-muted-foreground">Email:</span> {workOrder.customer.email || '\u2014'}</p>
                                <p><span className="text-muted-foreground">Address:</span> {workOrder.customer.address || '\u2014'}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No customer info</p>
                        )}
                    </div>

                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-3">Vehicle</h2>
                        {workOrder.vehicle_name || workOrder.vehicle_plate ? (
                            <div className="space-y-1 text-sm">
                                <p><span className="text-muted-foreground">Name:</span> {workOrder.vehicle_name || '\u2014'}</p>
                                <p><span className="text-muted-foreground">Plate:</span> {workOrder.vehicle_plate || '\u2014'}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No vehicle info</p>
                        )}
                    </div>

                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-3">Cost Summary</h2>
                        <div className="space-y-1 text-sm">
                            <p><span className="text-muted-foreground">Estimated:</span> $ {workOrder.estimated_cost.toLocaleString()}</p>
                            <p><span className="text-muted-foreground">Total:</span> $ {workOrder.total_cost.toLocaleString()}</p>
                            {workOrder.booking_number && (
                                <p><span className="text-muted-foreground">Booking:</span> {workOrder.booking_number}</p>
                            )}
                        </div>
                    </div>
                </div>

                {workOrder.inspection_notes && (
                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-2">Inspection Notes</h2>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{workOrder.inspection_notes}</p>
                    </div>
                )}

                {workOrder.services.length > 0 && (
                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-3">Services</h2>
                        <div className="divide-y text-sm">
                            {workOrder.services.map((s) => (
                                <div key={s.id} className="flex items-center justify-between py-2">
                                    <span>{s.name}</span>
                                    <div className="flex items-center gap-4 text-muted-foreground">
                                        {s.duration && <span>{s.duration} min</span>}
                                        <span>$ {s.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="rounded-xl border p-4">
                    <h2 className="font-semibold mb-3">Mechanic Assignments</h2>
                    {workOrder.mechanic_assignments.length > 0 ? (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50 text-left">
                                    <th className="p-3 font-medium">Mechanic</th>
                                    <th className="p-3 font-medium">Assigned At</th>
                                    <th className="p-3 font-medium">Completed At</th>
                                    <th className="p-3 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {workOrder.mechanic_assignments.map((ma) => (
                                    <tr key={ma.id} className="border-b last:border-0">
                                        <td className="p-3">{ma.mechanic_name}</td>
                                        <td className="p-3">{ma.assigned_at || '\u2014'}</td>
                                        <td className="p-3">{ma.completed_at || '\u2014'}</td>
                                        <td className="p-3">
                                            <Badge variant={statusStyles[ma.status] || 'secondary'}>
                                                {statusLabels[ma.status] || ma.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-2">No mechanics assigned yet.</p>
                    )}
                </div>

                {/* Parts & Charges Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Parts Used Table + Add Part Form */}
                    <div className="lg:col-span-2 rounded-xl border p-4">
                        <h2 className="font-semibold mb-3">Parts Used</h2>
                        {repairOrder && repairOrder.parts.length > 0 ? (
                            <table className="w-full text-sm mb-4">
                                <thead>
                                    <tr className="border-b bg-muted/50 text-left">
                                        <th className="p-2 font-medium">Part Name</th>
                                        <th className="p-2 font-medium">Qty</th>
                                        <th className="p-2 font-medium">Unit Price</th>
                                        <th className="p-2 font-medium">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {repairOrder.parts.map((p) => (
                                        <tr key={p.id} className="border-b last:border-0">
                                            <td className="p-2">{p.product_name}</td>
                                            <td className="p-2">{p.quantity}</td>
                                            <td className="p-2">$ {p.unit_price.toLocaleString()}</td>
                                            <td className="p-2">$ {p.total.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-sm text-muted-foreground mb-4">No parts added yet.</p>
                        )}

                        <div className="border-t pt-4">
                            <h3 className="text-sm font-medium mb-3">Add Part</h3>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
                                <div className="md:col-span-2 relative">
                                    <Label className="text-xs">Search Product</Label>
                                    <Input
                                        placeholder="Search product..."
                                        value={productSearch}
                                        onChange={e => { setProductSearch(e.target.value); setShowProductDropdown(true); }}
                                        onFocus={() => setShowProductDropdown(true)}
                                        onBlur={() => setTimeout(() => setShowProductDropdown(false), 200)}
                                    />
                                    {showProductDropdown && filteredProducts.length > 0 && (
                                        <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover p-1 shadow-md max-h-48 overflow-y-auto">
                                            {filteredProducts.map(p => (
                                                <button
                                                    key={p.id}
                                                    type="button"
                                                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent cursor-pointer text-left"
                                                    onMouseDown={() => selectProduct(p)}
                                                >
                                                    {p.image ? (
                                                        <img src={`/storage/${p.image}`} alt={p.name} className="size-7 rounded object-cover" />
                                                    ) : (
                                                        <div className="flex size-7 items-center justify-center rounded bg-muted text-[10px] text-muted-foreground">N/A</div>
                                                    )}
                                                    <span className="flex-1 truncate">{p.name}</span>
                                                    <span className="text-muted-foreground shrink-0">${p.selling_price}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {selectedProduct && (
                                    <div className="flex items-center gap-2">
                                        {selectedProduct.image ? (
                                            <img src={`/storage/${selectedProduct.image}`} alt={selectedProduct.name} className="size-9 rounded object-cover border" />
                                        ) : (
                                            <div className="flex size-9 items-center justify-center rounded bg-muted text-[10px] text-muted-foreground border">N/A</div>
                                        )}
                                        <span className="text-xs text-muted-foreground truncate max-w-[120px]">{selectedProduct.name}</span>
                                    </div>
                                )}
                                <div>
                                    <Label className="text-xs">Qty</Label>
                                    <Input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />
                                </div>
                                <div>
                                    <Label className="text-xs">Unit Price</Label>
                                    <Input type="number" step="0.01" min="0" value={unitPrice} onChange={e => setUnitPrice(e.target.value)} />
                                </div>
                                <div>
                                    <Button size="sm" onClick={handleAddPart} className="w-full">Add</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charges Summary + Notes + Status */}
                    <div className="space-y-4">
                        <div className="rounded-xl border p-4">
                            <h2 className="font-semibold mb-3">Charges Summary</h2>
                            <div className="space-y-1 text-sm">
                                <p><span className="text-muted-foreground">Labor Charges:</span> $ {laborCost.toLocaleString()}</p>
                                <p><span className="text-muted-foreground">Parts Charges:</span> $ {partsTotal.toLocaleString()}</p>
                                <hr className="my-1" />
                                <p className="font-medium"><span>Total Charges:</span> $ {totalCharges.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="rounded-xl border p-4">
                            <h2 className="font-semibold mb-3">Service Notes</h2>
                            <textarea
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                rows={3}
                                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                                placeholder="Enter service notes..."
                            />
                            <Button size="sm" className="mt-2" onClick={handleSaveNotes} disabled={savingNotes}>
                                {savingNotes ? 'Saving...' : 'Save Notes'}
                            </Button>
                        </div>

                        <div className="rounded-xl border p-4">
                            <h2 className="font-semibold mb-3">Update Status</h2>
                            <div className="flex flex-wrap gap-2">
                                {statusList.map(s => (
                                    <Button
                                        key={s}
                                        size="sm"
                                        variant={status === s ? (s === 'completed' ? 'default' : statusStyles[s]) : 'outline'}
                                        onClick={() => handleUpdateStatus(s)}
                                        disabled={savingStatus}
                                        className={
                                            status === s
                                                ? s === 'completed'
                                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                                    : ''
                                                : 'opacity-70'
                                        }
                                    >
                                        {statusLabels[s]}
                                    </Button>
                                ))}
                            </div>
                            {savingStatus && (
                                <p className="text-xs text-muted-foreground mt-1">Updating...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

ShowWorkOrder.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Work Orders', href: '/admin/work-orders' },
        { title: 'Work Order Details', href: '' },
    ],
};
