import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Heading from '@/components/heading';
import { ProtectedRoute } from '@/components/protected-route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProductImage {
    id: number;
    image: string;
}

interface Specification {
    id: number;
    specification_name: string;
    specification_value: string;
}

interface Compatibility {
    id: number;
    make_id: number;
    make_name: string;
    model_id: number;
    model_name: string;
    year_from: number | null;
    year_to: number | null;
}

interface Product {
    id: number;
    sku: string;
    name: string;
    description: string | null;
    category: string;
    brand: string;
    cost_price: number;
    selling_price: number;
    discount_type: string | null;
    discount_value: number;
    tax_rate: number;
    minimum_stock: number;
    weight: number | null;
    status: boolean;
    images: ProductImage[];
    specifications: Specification[];
    compatibilities: Compatibility[];
    created_at: string;
    updated_at: string;
}

export default function ShowProduct({ product }: { product: Product }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const primaryImage = product.images.find(i => i.id)?.image;

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={product.name} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <Heading title={product.name} description={`SKU: ${product.sku}`} />
                    <div className="flex items-center gap-2">
                        <Link href={`/admin/products/${product.id}/edit`}>
                            <Button>Edit Product</Button>
                        </Link>
                        <Link href="/admin/products">
                            <Button variant="outline">Back to Products</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                        {primaryImage ? (
                            <img
                                src={`/storage/${primaryImage}`}
                                alt={product.name}
                                className="w-full rounded-xl border object-cover aspect-square cursor-pointer"
                                onClick={() => setSelectedImage(`/storage/${primaryImage}`)}
                            />
                        ) : (
                            <div className="flex aspect-square w-full items-center justify-center rounded-xl border bg-muted text-muted-foreground">
                                No image available
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-xl border p-5">
                            <h3 className="mb-4 text-lg font-semibold">Product Information</h3>
                            <dl className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <dt className="text-muted-foreground">Category</dt>
                                    <dd className="font-medium">{product.category}</dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">Brand</dt>
                                    <dd className="font-medium">{product.brand}</dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">Selling Price</dt>
                                    <dd className="font-medium text-green-600">${product.selling_price.toFixed(2)}</dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">Cost Price</dt>
                                    <dd className="font-medium">${product.cost_price.toFixed(2)}</dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">Tax Rate</dt>
                                    <dd className="font-medium">{product.tax_rate}%</dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">Min Stock Level</dt>
                                    <dd className="font-medium">{product.minimum_stock}</dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">Weight</dt>
                                    <dd className="font-medium">{product.weight ? `${product.weight} kg` : '—'}</dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">Status</dt>
                                    <dd>
                                        <Badge variant={product.status ? 'default' : 'secondary'}>
                                            {product.status ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">Discount</dt>
                                    <dd className="font-medium">
                                        {product.discount_type
                                            ? `${product.discount_value}${product.discount_type === 'percentage' ? '%' : '$'}`
                                            : 'No discount'}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-muted-foreground">Created</dt>
                                    <dd className="font-medium">{product.created_at}</dd>
                                </div>
                                <div className="col-span-2">
                                    <dt className="text-muted-foreground">Description</dt>
                                    <dd className="mt-1 font-medium">{product.description || 'No description'}</dd>
                                </div>
                            </dl>
                        </div>

                        {product.specifications.length > 0 && (
                            <div className="rounded-xl border p-5">
                                <h3 className="mb-4 text-lg font-semibold">Specifications</h3>
                                <dl className="grid grid-cols-2 gap-3 text-sm">
                                    {product.specifications.map((spec) => (
                                        <div key={spec.id}>
                                            <dt className="text-muted-foreground">{spec.specification_name}</dt>
                                            <dd className="font-medium">{spec.specification_value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        )}

                        {product.compatibilities.length > 0 && (
                            <div className="rounded-xl border p-5">
                                <h3 className="mb-4 text-lg font-semibold">Vehicle Compatibility</h3>
                                <div className="space-y-2">
                                    {product.compatibilities.map((comp) => (
                                        <div key={comp.id} className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-sm">
                                            <span className="font-medium">{comp.make_name}</span>
                                            <span className="text-muted-foreground">/</span>
                                            <span>{comp.model_name}</span>
                                            {(comp.year_from || comp.year_to) && (
                                                <>
                                                    <span className="text-muted-foreground">/</span>
                                                    <span>
                                                        {comp.year_from ?? '…'} – {comp.year_to ?? '…'}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.images.length > 1 && (
                            <div className="rounded-xl border p-5">
                                <h3 className="mb-4 text-lg font-semibold">All Images</h3>
                                <div className="flex flex-wrap gap-3">
                                    {product.images.map((img) => (
                                        <img
                                            key={img.id}
                                            src={`/storage/${img.image}`}
                                            alt={product.name}
                                            className="h-20 w-20 rounded border object-cover cursor-pointer"
                                            onClick={() => setSelectedImage(`/storage/${img.image}`)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {selectedImage && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <div className="relative max-h-full max-w-full">
                            <button
                                type="button"
                                onClick={() => setSelectedImage(null)}
                                className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background text-foreground shadow-md hover:bg-muted"
                            >
                                &times;
                            </button>
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}

ShowProduct.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Products', href: '/admin/products' },
        { title: 'Product Details', href: '' },
    ],
};
