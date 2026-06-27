import { Form, Head, Link } from '@inertiajs/react';
import { useState, useMemo } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { ProtectedRoute } from '@/components/protected-route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Customer {
    id: number;
    name: string;
    phone: string;
}

interface ServicePackage {
    id: number;
    name: string;
    price: number;
    duration: number | null;
}

interface Mechanic {
    id: number;
    name: string;
}

interface WorkOrder {
    id: number;
    customer_id: number;
    customer_name: string;
    vehicle_name: string | null;
    vehicle_plate: string | null;
    estimated_cost: number;
    inspection_notes: string | null;
    status: string;
    service_package_ids: number[];
    mechanic_id: number | null;
}

export default function EditWorkOrder({ workOrder, customers, servicePackages, mechanics }: { workOrder: WorkOrder; customers: Customer[]; servicePackages: ServicePackage[]; mechanics: Mechanic[] }) {
    const [customerId, setCustomerId] = useState(String(workOrder.customer_id));
    const [status, setStatus] = useState(workOrder.status);
    const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>(workOrder.service_package_ids);
    const [mechanicId, setMechanicId] = useState(workOrder.mechanic_id ? String(workOrder.mechanic_id) : '');

    const totalServicePrice = useMemo(() => {
        return servicePackages
            .filter(s => selectedServiceIds.includes(s.id))
            .reduce((sum, s) => sum + s.price, 0);
    }, [selectedServiceIds, servicePackages]);

    function toggleService(id: number) {
        setSelectedServiceIds(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        );
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={`Edit ${workOrder.customer_name}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading title={`Edit Work Order`} description={workOrder.customer_name} />

                <Form
                    action={`/admin/work-orders/${workOrder.id}`}
                    method="PUT"
                    className="space-y-6 max-w-xl"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="customer_id">Customer *</Label>
                                <Select value={customerId} onValueChange={setCustomerId}>
                                    <SelectTrigger><SelectValue placeholder="Select customer" /></SelectTrigger>
                                    <SelectContent>
                                        {customers.map(c => (
                                            <SelectItem key={c.id} value={String(c.id)}>
                                                {c.name} {c.phone ? `(${c.phone})` : ''}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <input type="hidden" name="customer_id" value={customerId} />
                                <InputError message={errors.customer_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="vehicle_name">Vehicle Name</Label>
                                <Input id="vehicle_name" name="vehicle_name" defaultValue={workOrder.vehicle_name ?? ''} placeholder="e.g. Toyota Camry" />
                                <InputError message={errors.vehicle_name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="vehicle_plate">Vehicle Plate Number</Label>
                                <Input id="vehicle_plate" name="vehicle_plate" defaultValue={workOrder.vehicle_plate ?? ''} placeholder="e.g. B 1234 ABC" />
                                <InputError message={errors.vehicle_plate} />
                            </div>

                            {/* Services Selection */}
                            <div className="grid gap-2">
                                <Label>Services</Label>
                                <div className="rounded-xl border p-3 space-y-1">
                                    {servicePackages.map(s => (
                                        <label
                                            key={s.id}
                                            className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted/50 cursor-pointer"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedServiceIds.includes(s.id)}
                                                onChange={() => toggleService(s.id)}
                                                className="size-4"
                                            />
                                            <div className="flex-1 flex items-center justify-between text-sm">
                                                <span>{s.name}</span>
                                                <div className="flex items-center gap-3 text-muted-foreground">
                                                    {s.duration && <span>{s.duration} min</span>}
                                                    <span>$ {s.price.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </label>
                                    ))}
                                    {servicePackages.length === 0 && (
                                        <p className="text-sm text-muted-foreground text-center py-2">No services available.</p>
                                    )}
                                </div>
                                {selectedServiceIds.map(id => (
                                    <input key={id} type="hidden" name="service_package_ids[]" value={id} />
                                ))}
                                <InputError message={errors.service_package_ids} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="estimated_cost">Estimated Cost *</Label>
                                <div className="relative">
                                    <Input
                                        id="estimated_cost"
                                        name="estimated_cost"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        required
                                        defaultValue={totalServicePrice || workOrder.estimated_cost}
                                        placeholder="0.00"
                                    />
                                    {totalServicePrice > 0 && (
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                                            <Badge variant="outline" className="text-xs">$ {totalServicePrice.toLocaleString()} from services</Badge>
                                        </span>
                                    )}
                                </div>
                                <InputError message={errors.estimated_cost} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="mechanic_id">Assign Mechanic</Label>
                                <Select value={mechanicId} onValueChange={setMechanicId}>
                                    <SelectTrigger><SelectValue placeholder="Select mechanic" /></SelectTrigger>
                                    <SelectContent>
                                        {mechanics.map(m => (
                                            <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <input type="hidden" name="mechanic_id" value={mechanicId} />
                                <InputError message={errors.mechanic_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="inspection_notes">Inspection Notes</Label>
                                <textarea
                                    id="inspection_notes"
                                    name="inspection_notes"
                                    rows={3}
                                    defaultValue={workOrder.inspection_notes ?? ''}
                                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                                />
                                <InputError message={errors.inspection_notes} />
                            </div>

                            <div className="w-[160px]">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    name="status"
                                    value={status}
                                    onChange={e => setStatus(e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                                >
                                    <option value="waiting">Waiting</option>
                                    <option value="assigned">Assigned</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <InputError message={errors.status} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Update Work Order</Button>
                                <Link href="/admin/work-orders">
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

EditWorkOrder.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Work Orders', href: '/admin/work-orders' },
        { title: 'Edit Work Order', href: '' },
    ],
};
