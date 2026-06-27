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

interface Brand {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    products_count: number;
    status: boolean;
    created_at: string;
}

export default function BrandsIndex({
    brands,
    filters,
}: {
    brands: { data: Brand[]; links: any[]; from: number; to: number; total: number; last_page: number; current_page: number };
    filters: { search: string; status: string };
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status ?? '');

    function applyFilters() {
        router.get('/admin/brands', {
            search,
            status: status === 'all' ? '' : status,
        }, { preserveState: true, replace: true });
    }

    function resetFilters() {
        setSearch('');
        setStatus('');
        router.get('/admin/brands', {}, { preserveState: true, replace: true });
    }

    function handleDelete(id: number, name: string) {
        if (confirm(`Delete brand "${name}"? This cannot be undone.`)) {
            router.delete(`/admin/brands/${id}`, {
                preserveScroll: true,
            });
        }
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Brands" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Brands</h1>
                        <p className="text-sm text-muted-foreground">Manage product brands</p>
                    </div>
                    <Link href="/admin/brands/create">
                        <Button size="sm">Add Brand</Button>
                    </Link>
                </div>

                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Search</label>
                        <Input
                            placeholder="Search by name or slug..."
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

                <div className="rounded-xl border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50 text-left">
                                <th className="p-3 font-medium w-12">Logo</th>
                                <th className="p-3 font-medium">Name</th>
                                <th className="p-3 font-medium">Slug</th>
                                <th className="p-3 font-medium">Products</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium">Created</th>
                                <th className="p-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {brands.data.map((brand) => (
                                <tr key={brand.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="p-3">
                                        {brand.logo ? (
                                            <img src={`/storage/${brand.logo}`} alt={brand.name} className="size-10 rounded object-cover" />
                                        ) : (
                                            <div className="flex size-10 items-center justify-center rounded bg-muted text-xs text-muted-foreground">N/A</div>
                                        )}
                                    </td>
                                    <td className="p-3 font-medium">{brand.name}</td>
                                    <td className="p-3 text-muted-foreground">{brand.slug}</td>
                                    <td className="p-3">{brand.products_count}</td>
                                    <td className="p-3">
                                        <Badge variant={brand.status ? 'default' : 'secondary'}>
                                            {brand.status ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="p-3 text-muted-foreground">{brand.created_at}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/brands/${brand.id}/edit`}>
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(brand.id, brand.name)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {brands.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                                        No brands found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {brands.from}–{brands.to} of {brands.total}</span>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: brands.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/brands?page=${page}`}
                                preserveState
                                className={`inline-flex size-8 items-center justify-center rounded text-sm ${
                                    page === brands.current_page
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

BrandsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Brands', href: '/admin/brands' },
    ],
};
