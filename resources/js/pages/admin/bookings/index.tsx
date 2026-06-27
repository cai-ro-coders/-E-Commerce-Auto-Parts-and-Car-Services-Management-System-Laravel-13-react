import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Booking {
    id: number;
    booking_number: string;
    customer_name: string;
    customer_phone: string | null;
    vehicle_registration: string | null;
    vehicle_make: string | null;
    vehicle_model: string | null;
    booking_date: string;
    service_type: string | null;
    status: string;
    created_at: string;
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

export default function BookingsIndex({
    bookings,
    filters,
}: {
    bookings: { data: Booking[]; links: any[]; from: number; to: number; total: number; last_page: number; current_page: number };
    filters: { search: string; status: string };
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status ?? '');

    function applyFilters() {
        router.get('/admin/bookings', {
            search,
            status: status === 'all' ? '' : status,
        }, { preserveState: true, replace: true });
    }

    function resetFilters() {
        setSearch('');
        setStatus('');
        router.get('/admin/bookings', {}, { preserveState: true, replace: true });
    }

    function handleDelete(id: number, bookingNumber: string) {
        if (confirm(`Delete booking "${bookingNumber}"? This cannot be undone.`)) {
            router.delete(`/admin/bookings/${id}`, {
                preserveScroll: true,
            });
        }
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Bookings" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Bookings</h1>
                        <p className="text-sm text-muted-foreground">Manage customer appointments</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Search</label>
                        <Input
                            placeholder="Search by booking #, customer, or plate..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && applyFilters()}
                        />
                    </div>
                    <div className="w-[160px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Status</label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button variant="secondary" size="sm" onClick={applyFilters}>Filter</Button>
                    <Button variant="ghost" size="sm" onClick={resetFilters}>Reset</Button>
                </div>

                <div className="rounded-xl border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50 text-left">
                                <th className="p-3 font-medium">Booking #</th>
                                <th className="p-3 font-medium">Customer</th>
                                <th className="p-3 font-medium">Vehicle</th>
                                <th className="p-3 font-medium">Service</th>
                                <th className="p-3 font-medium">Date</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium">Created</th>
                                <th className="p-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.data.map((b) => (
                                <tr key={b.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="p-3 font-medium">{b.booking_number}</td>
                                    <td className="p-3">
                                        <div>{b.customer_name}</div>
                                        {b.customer_phone && <div className="text-xs text-muted-foreground">{b.customer_phone}</div>}
                                    </td>
                                    <td className="p-3 text-muted-foreground">
                                        {b.vehicle_make && b.vehicle_model
                                            ? `${b.vehicle_make} ${b.vehicle_model}`
                                            : b.vehicle_registration || '\u2014'}
                                    </td>
                                    <td className="p-3">{b.service_type || '\u2014'}</td>
                                    <td className="p-3 text-muted-foreground">{b.booking_date}</td>
                                    <td className="p-3">
                                        <Badge variant={statusStyles[b.status] || 'secondary'}>
                                            {statusLabels[b.status] || b.status}
                                        </Badge>
                                    </td>
                                    <td className="p-3 text-muted-foreground">{b.created_at}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/bookings/${b.id}`}>
                                                <Button variant="ghost" size="sm">View</Button>
                                            </Link>
                                            <Link href={`/admin/bookings/${b.id}/edit`}>
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(b.id, b.booking_number)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {bookings.data.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-muted-foreground">
                                        No bookings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {bookings.from}\u2013{bookings.to} of {bookings.total}</span>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: bookings.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/bookings?page=${page}`}
                                preserveState
                                className={`inline-flex size-8 items-center justify-center rounded text-sm ${
                                    page === bookings.current_page
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

BookingsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Bookings', href: '/admin/bookings' },
    ],
};
