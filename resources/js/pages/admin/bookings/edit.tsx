import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { ProtectedRoute } from '@/components/protected-route';
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

interface Vehicle {
    id: number;
    registration: string;
    customer_id: number;
}

interface Booking {
    id: number;
    booking_number: string;
    customer_id: number;
    customer_name: string;
    vehicle_id: number;
    vehicle_registration: string;
    booking_date: string;
    service_type: string | null;
    notes: string | null;
    status: string;
}

export default function EditBooking({ booking, customers, vehicles }: { booking: Booking; customers: Customer[]; vehicles: Vehicle[] }) {
    const [customerId, setCustomerId] = useState(String(booking.customer_id));
    const [vehicleId, setVehicleId] = useState(String(booking.vehicle_id));

    const filteredVehicles = vehicles.filter(v => String(v.customer_id) === customerId);

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={`Edit ${booking.booking_number}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading title={`Edit Booking`} description={booking.booking_number} />

                <Form
                    action={`/admin/bookings/${booking.id}`}
                    method="PUT"
                    className="space-y-6 max-w-xl"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="booking_number">Booking Number</Label>
                                <Input id="booking_number" value={booking.booking_number} disabled />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="customer_id">Customer *</Label>
                                <Select value={customerId} onValueChange={(v) => { setCustomerId(v); setVehicleId(''); }}>
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
                                <Label htmlFor="vehicle_id">Vehicle *</Label>
                                <Select value={vehicleId} onValueChange={setVehicleId} disabled={!customerId}>
                                    <SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger>
                                    <SelectContent>
                                        {customerId && filteredVehicles.length > 0 ? (
                                            filteredVehicles.map(v => (
                                                <SelectItem key={v.id} value={String(v.id)}>
                                                    {v.registration}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="" disabled>
                                                {customerId ? 'No vehicles found' : 'Select a customer first'}
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                <input type="hidden" name="vehicle_id" value={vehicleId} />
                                <InputError message={errors.vehicle_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="booking_date">Booking Date *</Label>
                                <Input
                                    id="booking_date"
                                    name="booking_date"
                                    type="datetime-local"
                                    defaultValue={booking.booking_date}
                                    required
                                />
                                <InputError message={errors.booking_date} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="service_type">Service Type</Label>
                                <Input id="service_type" name="service_type" defaultValue={booking.service_type ?? ''} placeholder="e.g. Oil Change, General Service" />
                                <InputError message={errors.service_type} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="notes">Notes</Label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    rows={3}
                                    defaultValue={booking.notes ?? ''}
                                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                                />
                                <InputError message={errors.notes} />
                            </div>

                            <div className="w-[160px]">
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    name="status"
                                    defaultValue={booking.status}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                                <InputError message={errors.status} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Update Booking</Button>
                                <Link href="/admin/bookings">
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

EditBooking.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Bookings', href: '/admin/bookings' },
        { title: 'Edit Booking', href: '' },
    ],
};
