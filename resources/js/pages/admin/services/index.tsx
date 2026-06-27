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

interface Service {
    id: number;
    name: string;
    description: string | null;
    price: number;
    duration: number | null;
    status: boolean;
    created_at: string;
}

export default function ServicesIndex({
    services,
    filters,
}: {
    services: { data: Service[]; links: any[]; from: number; to: number; total: number; last_page: number; current_page: number };
    filters: { search: string; status: string };
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status ?? '');

    function applyFilters() {
        router.get('/admin/services', {
            search,
            status: status === 'all' ? '' : status,
        }, { preserveState: true, replace: true });
    }

    function resetFilters() {
        setSearch('');
        setStatus('');
        router.get('/admin/services', {}, { preserveState: true, replace: true });
    }

    function handleDelete(id: number, name: string) {
        if (confirm(`Delete service "${name}"? This cannot be undone.`)) {
            router.delete(`/admin/services/${id}`, {
                preserveScroll: true,
            });
        }
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Services" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Services</h1>
                        <p className="text-sm text-muted-foreground">Manage service packages</p>
                    </div>
                    <Link href="/admin/services/create">
                        <Button size="sm">Add Service</Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Search</label>
                        <Input
                            placeholder="Search by name or description..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && applyFilters()}
                        />
                    </div>
                    <div className="w-[140px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Status</label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
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
                                <th className="p-3 font-medium">Name</th>
                                <th className="p-3 font-medium">Price</th>
                                <th className="p-3 font-medium">Duration</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium">Created</th>
                                <th className="p-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.data.map((service) => (
                                <tr key={service.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="p-3 font-medium">{service.name}</td>
                                    <td className="p-3">$ {service.price.toLocaleString()}</td>
                                    <td className="p-3 text-muted-foreground">{service.duration ? `${service.duration} min` : '\u2014'}</td>
                                    <td className="p-3">
                                        <Badge variant={service.status ? 'default' : 'secondary'}>
                                            {service.status ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="p-3 text-muted-foreground">{service.created_at}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/services/${service.id}/edit`}>
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(service.id, service.name)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {services.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                                        No services found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {services.from}\u2013{services.to} of {services.total}</span>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: services.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/services?page=${page}`}
                                preserveState
                                className={`inline-flex size-8 items-center justify-center rounded text-sm ${
                                    page === services.current_page
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

ServicesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Services', href: '/admin/services' },
    ],
};
