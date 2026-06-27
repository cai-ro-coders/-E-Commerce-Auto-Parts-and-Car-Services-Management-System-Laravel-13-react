import { Head, Link } from '@inertiajs/react';
import { ProtectedRoute } from '@/components/protected-route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Customer {
    id: number;
    full_name: string;
    phone: string;
    email: string;
    address: string;
}

interface Vehicle {
    id: number;
    registration_number: string;
    make: string;
    model: string;
    year: number | null;
    vin: string | null;
    engine_type: string | null;
    mileage: number | null;
    fuel_type: string | null;
    color: string | null;
}

interface JobCard {
    id: number;
    job_number: string;
    status: string;
}

interface Booking {
    id: number;
    booking_number: string;
    customer: Customer | null;
    vehicle: Vehicle | null;
    booking_date: string;
    service_type: string | null;
    notes: string | null;
    status: string;
    job_card: JobCard | null;
    created_at: string;
    updated_at: string;
}

const statusStyles: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    pending: 'secondary',
    confirmed: 'default',
    in_progress: 'default',
    completed: 'outline',
    cancelled: 'destructive',
};

const statusLabels: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
};

export default function ShowBooking({ booking }: { booking: Booking }) {
    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={`Booking ${booking.booking_number}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold">{booking.booking_number}</h1>
                            <Badge variant={statusStyles[booking.status] || 'secondary'}>
                                {statusLabels[booking.status] || booking.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            Created {booking.created_at} &middot; Updated {booking.updated_at}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={`/admin/bookings/${booking.id}/edit`}>
                            <Button size="sm">Edit</Button>
                        </Link>
                        <Link href="/admin/bookings">
                            <Button variant="outline" size="sm">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-3">Customer</h2>
                        {booking.customer ? (
                            <div className="space-y-1 text-sm">
                                <p><span className="text-muted-foreground">Name:</span> {booking.customer.full_name}</p>
                                <p><span className="text-muted-foreground">Phone:</span> {booking.customer.phone || '\u2014'}</p>
                                <p><span className="text-muted-foreground">Email:</span> {booking.customer.email || '\u2014'}</p>
                                <p><span className="text-muted-foreground">Address:</span> {booking.customer.address || '\u2014'}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No customer info</p>
                        )}
                    </div>

                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-3">Vehicle</h2>
                        {booking.vehicle ? (
                            <div className="space-y-1 text-sm">
                                <p><span className="text-muted-foreground">Registration:</span> {booking.vehicle.registration_number || '\u2014'}</p>
                                <p><span className="text-muted-foreground">Make/Model:</span> {booking.vehicle.make} {booking.vehicle.model}</p>
                                <p><span className="text-muted-foreground">Year:</span> {booking.vehicle.year || '\u2014'}</p>
                                <p><span className="text-muted-foreground">VIN:</span> {booking.vehicle.vin || '\u2014'}</p>
                                <p><span className="text-muted-foreground">Engine:</span> {booking.vehicle.engine_type || '\u2014'}</p>
                                <p><span className="text-muted-foreground">Mileage:</span> {booking.vehicle.mileage ? `${booking.vehicle.mileage.toLocaleString()} km` : '\u2014'}</p>
                                <p><span className="text-muted-foreground">Fuel:</span> {booking.vehicle.fuel_type || '\u2014'}</p>
                                <p><span className="text-muted-foreground">Color:</span> {booking.vehicle.color || '\u2014'}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No vehicle info</p>
                        )}
                    </div>

                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-3">Booking Details</h2>
                        <div className="space-y-1 text-sm">
                            <p><span className="text-muted-foreground">Booking Date:</span> {booking.booking_date}</p>
                            <p><span className="text-muted-foreground">Service Type:</span> {booking.service_type || '\u2014'}</p>
                            <p><span className="text-muted-foreground">Status:</span> {statusLabels[booking.status] || booking.status}</p>
                            {booking.job_card && (
                                <p>
                                    <span className="text-muted-foreground">Work Order:</span>{' '}
                                    <Link href={`/admin/work-orders/${booking.job_card.id}`} className="text-primary hover:underline">
                                        {booking.job_card.job_number}
                                    </Link>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {booking.notes && (
                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-2">Notes</h2>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{booking.notes}</p>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}

ShowBooking.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Bookings', href: '/admin/bookings' },
        { title: 'Booking Details', href: '' },
    ],
};
