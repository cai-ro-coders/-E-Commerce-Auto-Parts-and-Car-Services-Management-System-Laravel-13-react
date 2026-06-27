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

interface WorkOrder {
    id: number;
    job_number: string;
    customer_name: string;
    vehicle_name: string | null;
    vehicle_plate: string | null;
    estimated_cost: number;
    total_cost: number;
    status: string;
    created_at: string;
}

const statusStyles: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    open: 'secondary',
    in_progress: 'default',
    completed: 'outline',
    cancelled: 'destructive',
};

const statusLabels: Record<string, string> = {
    open: 'Open',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
};

export default function WorkOrdersIndex({
    workOrders,
    filters,
}: {
    workOrders: { data: WorkOrder[]; links: any[]; from: number; to: number; total: number; last_page: number; current_page: number };
    filters: { search: string; status: string };
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status ?? '');

    function applyFilters() {
        router.get('/admin/work-orders', {
            search,
            status: status === 'all' ? '' : status,
        }, { preserveState: true, replace: true });
    }

    function resetFilters() {
        setSearch('');
        setStatus('');
        router.get('/admin/work-orders', {}, { preserveState: true, replace: true });
    }

    function handleDelete(id: number, jobNumber: string) {
        if (confirm(`Delete work order "${jobNumber}"? This cannot be undone.`)) {
            router.delete(`/admin/work-orders/${id}`, {
                preserveScroll: true,
            });
        }
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Work Orders" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Work Orders</h1>
                        <p className="text-sm text-muted-foreground">Manage workshop work orders</p>
                    </div>
                    <Link href="/admin/work-orders/create">
                        <Button size="sm">Add Work Order</Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Search</label>
                        <Input
                            placeholder="Search by job number, customer, or plate..."
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
                                <SelectItem value="waiting">Waiting</SelectItem>
                                <SelectItem value="assigned">Assigned</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button variant="secondary" size="sm" onClick={applyFilters}>Filter</Button>
                    <Button variant="ghost" size="sm" onClick={resetFilters}>Reset</Button>
                </div>

                {/* Table */}
                <div className="rounded-xl border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50 text-left">
                                <th className="p-3 font-medium">Job #</th>
                                <th className="p-3 font-medium">Customer</th>
                                            <th className="p-3 font-medium">Vehicle</th>
                                            <th className="p-3 font-medium">Plate</th>
                                <th className="p-3 font-medium">Est. Cost</th>
                                <th className="p-3 font-medium">Total Cost</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium">Created</th>
                                <th className="p-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workOrders.data.map((wo) => (
                                <tr key={wo.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="p-3 font-medium">{wo.job_number}</td>
                                    <td className="p-3">{wo.customer_name}</td>
                                    <td className="p-3 text-muted-foreground">{wo.vehicle_name || '\u2014'}</td>
                                    <td className="p-3 text-muted-foreground">{wo.vehicle_plate || '\u2014'}</td>
                                    <td className="p-3">$ {wo.estimated_cost.toLocaleString()}</td>
                                    <td className="p-3">$ {wo.total_cost.toLocaleString()}</td>
                                    <td className="p-3">
                                        <Badge variant={statusStyles[wo.status] || 'secondary'}>
                                            {statusLabels[wo.status] || wo.status}
                                        </Badge>
                                    </td>
                                    <td className="p-3 text-muted-foreground">{wo.created_at}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/work-orders/${wo.id}`}>
                                                <Button variant="ghost" size="sm">View</Button>
                                            </Link>
                                            <Link href={`/admin/work-orders/${wo.id}/edit`}>
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(wo.id, wo.job_number)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {workOrders.data.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="py-8 text-center text-muted-foreground">
                                        No work orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {workOrders.from}\u2013{workOrders.to} of {workOrders.total}</span>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: workOrders.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/work-orders?page=${page}`}
                                preserveState
                                className={`inline-flex size-8 items-center justify-center rounded text-sm ${
                                    page === workOrders.current_page
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

WorkOrdersIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Work Orders', href: '/admin/work-orders' },
    ],
};
