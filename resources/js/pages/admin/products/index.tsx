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

interface Product {
    id: number;
    sku: string;
    name: string;
    category: string;
    brand: string;
    selling_price: number;
    cost_price: number;
    status: boolean;
    minimum_stock: number;
    image: string | null;
    created_at: string;
}

interface Category {
    id: number;
    name: string;
}

interface Brand {
    id: number;
    name: string;
}

export default function ProductsIndex({
    products,
    filters,
    categories,
    brands,
}: {
    products: { data: Product[]; links: any[]; from: number; to: number; total: number; last_page: number; current_page: number };
    filters: { search: string; category_id: string; brand_id: string; status: string };
    categories: Category[];
    brands: Brand[];
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [categoryId, setCategoryId] = useState(filters.category_id || '');
    const [brandId, setBrandId] = useState(filters.brand_id || '');
    const [status, setStatus] = useState(filters.status ?? '');

    function applyFilters() {
        router.get('/admin/products', {
            search,
            category_id: categoryId === 'all' ? '' : categoryId,
            brand_id: brandId === 'all' ? '' : brandId,
            status: status === 'all' ? '' : status,
        }, { preserveState: true, replace: true });
    }

    function resetFilters() {
        setSearch('');
        setCategoryId('');
        setBrandId('');
        setStatus('');
        router.get('/admin/products', {}, { preserveState: true, replace: true });
    }

    function handleExport(type: 'csv' | 'json') {
        window.open(`/admin/products/export?type=${type}`, '_blank');
    }

    function handleDelete(id: number, name: string) {
        if (confirm(`Delete "${name}"? This cannot be undone.`)) {
            router.delete(`/admin/products/${id}`, {
                preserveScroll: true,
            });
        }
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Products" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Products</h1>
                        <p className="text-sm text-muted-foreground">Manage your products inventory</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
                            Export CSV
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExport('json')}>
                            Export JSON
                        </Button>
                        <Link href="/admin/products/create">
                            <Button size="sm">Add Product</Button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Search</label>
                        <Input
                            placeholder="Search by name or SKU..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && applyFilters()}
                        />
                    </div>
                    <div className="w-[180px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Category</label>
                        <Select value={categoryId} onValueChange={setCategoryId}>
                            <SelectTrigger><SelectValue placeholder="All categories" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All categories</SelectItem>
                                {categories.map(c => (
                                    <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-[180px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Brand</label>
                        <Select value={brandId} onValueChange={setBrandId}>
                            <SelectTrigger><SelectValue placeholder="All brands" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All brands</SelectItem>
                                {brands.map(b => (
                                    <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-[140px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Status</label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="1">Active</SelectItem>
                                <SelectItem value="0">Inactive</SelectItem>
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
                                <th className="p-3 font-medium">Product</th>
                                <th className="p-3 font-medium">SKU</th>
                                <th className="p-3 font-medium">Category</th>
                                <th className="p-3 font-medium">Brand</th>
                                <th className="p-3 font-medium">Price</th>
                                <th className="p-3 font-medium">Cost</th>
                                <th className="p-3 font-medium">Stock</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.map((product) => (
                                <tr key={product.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="p-3">
                                        <Link href={`/admin/products/${product.id}`} className="flex items-center gap-3">
                                            {product.image ? (
                                                <img src={`/storage/${product.image}`} alt={product.name} className="size-10 rounded object-cover" />
                                            ) : (
                                                <div className="flex size-10 items-center justify-center rounded bg-muted text-xs text-muted-foreground">N/A</div>
                                            )}
                                            <span className="font-medium hover:underline">{product.name}</span>
                                        </Link>
                                    </td>
                                    <td className="p-3 text-muted-foreground">{product.sku}</td>
                                    <td className="p-3">{product.category}</td>
                                    <td className="p-3">{product.brand}</td>
                                    <td className="p-3">${product.selling_price.toFixed(2)}</td>
                                    <td className="p-3">${product.cost_price.toFixed(2)}</td>
                                    <td className="p-3">{product.minimum_stock}</td>
                                    <td className="p-3">
                                        <Badge variant={product.status ? 'default' : 'secondary'}>
                                            {product.status ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/products/${product.id}`}>
                                                <Button variant="ghost" size="sm">View</Button>
                                            </Link>
                                            <Link href={`/admin/products/${product.id}/edit`}>
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(product.id, product.name)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.data.length === 0 && (
                                <tr>
                                    <td colSpan={9} className="py-8 text-center text-muted-foreground">
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {products.from}–{products.to} of {products.total}</span>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: products.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/products?page=${page}`}
                                preserveState
                                className={`inline-flex size-8 items-center justify-center rounded text-sm ${
                                    page === products.current_page
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

ProductsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Products', href: '/admin/products' },
    ],
};
