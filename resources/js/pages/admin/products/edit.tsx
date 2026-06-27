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
import { update as updateRoute } from '@/routes/admin/products';

interface ProductImage {
    id: number;
    image: string;
}

interface Compatibility {
    id?: number;
    make_id: number;
    model_id: number;
    year_from: number | null;
    year_to: number | null;
}

interface Product {
    id: number;
    category_id: number;
    brand_id: number;
    sku: string;
    barcode: string | null;
    name: string;
    description: string | null;
    cost_price: number;
    selling_price: number;
    discount_type: string | null;
    discount_value: number;
    tax_rate: number;
    minimum_stock: number;
    weight: number | null;
    status: boolean;
    has_vehicle_compatibility: boolean;
    images: ProductImage[];
    compatibilities: Compatibility[];
}

interface Category {
    id: number;
    name: string;
}

interface Brand {
    id: number;
    name: string;
}

interface VehicleModel {
    id: number;
    name: string;
}

interface VehicleMake {
    id: number;
    name: string;
    models: VehicleModel[];
}

export default function EditProduct({
    product,
    categories,
    brands,
    vehicleMakes,
}: {
    product: Product;
    categories: Category[];
    brands: Brand[];
    vehicleMakes: VehicleMake[];
}) {
    const [existingImages, setExistingImages] = useState<ProductImage[]>(product.images);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
    const [deletedImageIds, setDeletedImageIds] = useState<number[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>(String(product.category_id));
    const [selectedBrand, setSelectedBrand] = useState<string>(String(product.brand_id));
    const [selectedDiscountType, setSelectedDiscountType] = useState<string>(product.discount_type ?? 'none');
    const [selectedStatus, setSelectedStatus] = useState<string>(product.status ? '1' : '0');
    const [hasVehicleCompatibility, setHasVehicleCompatibility] = useState<boolean>(product.has_vehicle_compatibility);
    const [compatibilities, setCompatibilities] = useState<Compatibility[]>(
        product.compatibilities.length > 0
            ? product.compatibilities
            : [{ make_id: 0, model_id: 0, year_from: null, year_to: null }]
    );

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={`Edit ${product.name}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading title={`Edit: ${product.name}`} description="Update product details and images" />

                <Form
                    {...updateRoute.form(product.id)}
                    encType="multipart/form-data"
                    className="space-y-6 max-w-2xl"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Product Name *</Label>
                                    <Input id="name" name="name" required defaultValue={product.name} />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="sku">SKU *</Label>
                                    <Input id="sku" name="sku" required defaultValue={product.sku} />
                                    <InputError message={errors.sku} />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="category_id">Category *</Label>
                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {categories.map(c => (
                                                <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <input type="hidden" name="category_id" value={selectedCategory} />
                                    <InputError message={errors.category_id} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="brand_id">Brand *</Label>
                                    <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {brands.map(b => (
                                                <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <input type="hidden" name="brand_id" value={selectedBrand} />
                                    <InputError message={errors.brand_id} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    defaultValue={product.description ?? ''}
                                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="selling_price">Selling Price ($) *</Label>
                                    <Input id="selling_price" name="selling_price" type="number" step="0.01" min="0" required defaultValue={product.selling_price} />
                                    <InputError message={errors.selling_price} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cost_price">Cost Price ($) *</Label>
                                    <Input id="cost_price" name="cost_price" type="number" step="0.01" min="0" required defaultValue={product.cost_price} />
                                    <InputError message={errors.cost_price} />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="grid gap-2">
                                    <Label htmlFor="barcode">Barcode</Label>
                                    <Input id="barcode" name="barcode" defaultValue={product.barcode ?? ''} />
                                    <InputError message={errors.barcode} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="tax_rate">Tax Rate (%)</Label>
                                    <Input id="tax_rate" name="tax_rate" type="number" step="0.01" min="0" max="100" defaultValue={product.tax_rate} />
                                    <InputError message={errors.tax_rate} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="minimum_stock">Min Stock Level</Label>
                                    <Input id="minimum_stock" name="minimum_stock" type="number" min="0" defaultValue={product.minimum_stock} />
                                    <InputError message={errors.minimum_stock} />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="discount_type">Discount Type</Label>
                                    <Select value={selectedDiscountType} onValueChange={setSelectedDiscountType}>
                                        <SelectTrigger><SelectValue placeholder="No discount" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">None</SelectItem>
                                            <SelectItem value="percentage">Percentage</SelectItem>
                                            <SelectItem value="fixed">Fixed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <input type="hidden" name="discount_type" value={selectedDiscountType} />
                                    <InputError message={errors.discount_type} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="discount_value">Discount Value</Label>
                                    <Input id="discount_value" name="discount_value" type="number" step="0.01" min="0" defaultValue={product.discount_value} />
                                    <InputError message={errors.discount_value} />
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input id="weight" name="weight" type="number" step="0.01" min="0" defaultValue={product.weight ?? ''} />
                                    <InputError message={errors.weight} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">Active</SelectItem>
                                            <SelectItem value="0">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <input type="hidden" name="status" value={selectedStatus} />
                                    <InputError message={errors.status} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={hasVehicleCompatibility}
                                        onChange={(e) => setHasVehicleCompatibility(e.target.checked)}
                                        className="h-4 w-4"
                                    />
                                    Has Vehicle Compatibility
                                </Label>
                                <input type="hidden" name="has_vehicle_compatibility" value={hasVehicleCompatibility ? '1' : '0'} />
                            </div>

                            {hasVehicleCompatibility && (
                            <div className="grid gap-2">
                                <Label>Vehicle Compatibility</Label>
                                {compatibilities.map((comp, idx) => (
                                    <div key={idx} className="flex flex-wrap items-end gap-2 rounded border p-3">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`comp_make_id_${idx}`}>Make</Label>
                                            <select
                                                id={`comp_make_id_${idx}`}
                                                name={`compatibilities[${idx}][make_id]`}
                                                value={comp.make_id}
                                                onChange={(e) => {
                                                    const newComp = [...compatibilities];
                                                    newComp[idx] = { ...newComp[idx], make_id: Number(e.target.value), model_id: 0 };
                                                    setCompatibilities(newComp);
                                                }}
                                                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-40 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                                            >
                                                <option value={0}>Select Make</option>
                                                {vehicleMakes.map(m => (
                                                    <option key={m.id} value={m.id}>{m.name}</option>
                                                ))}
                                            </select>
                                            <InputError message={(errors as Record<string, string>)[`compatibilities.${idx}.make_id`]} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`comp_model_id_${idx}`}>Model</Label>
                                            <select
                                                id={`comp_model_id_${idx}`}
                                                name={`compatibilities[${idx}][model_id]`}
                                                value={comp.model_id}
                                                onChange={(e) => {
                                                    const newComp = [...compatibilities];
                                                    newComp[idx] = { ...newComp[idx], model_id: Number(e.target.value) };
                                                    setCompatibilities(newComp);
                                                }}
                                                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-40 rounded-md border bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                                            >
                                                <option value={0}>Select Model</option>
                                                {vehicleMakes
                                                    .find(m => m.id === comp.make_id)
                                                    ?.models.map(md => (
                                                        <option key={md.id} value={md.id}>{md.name}</option>
                                                    ))}
                                            </select>
                                            <InputError message={(errors as Record<string, string>)[`compatibilities.${idx}.model_id`]} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`comp_year_from_${idx}`}>Year From</Label>
                                            <Input
                                                id={`comp_year_from_${idx}`}
                                                name={`compatibilities[${idx}][year_from]`}
                                                type="number"
                                                min="1900"
                                                max="2100"
                                                placeholder="e.g. 2010"
                                                value={comp.year_from ?? ''}
                                                onChange={(e) => {
                                                    const newComp = [...compatibilities];
                                                    newComp[idx] = { ...newComp[idx], year_from: e.target.value ? Number(e.target.value) : null };
                                                    setCompatibilities(newComp);
                                                }}
                                                className="w-28"
                                            />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label htmlFor={`comp_year_to_${idx}`}>Year To</Label>
                                            <Input
                                                id={`comp_year_to_${idx}`}
                                                name={`compatibilities[${idx}][year_to]`}
                                                type="number"
                                                min="1900"
                                                max="2100"
                                                placeholder="e.g. 2024"
                                                value={comp.year_to ?? ''}
                                                onChange={(e) => {
                                                    const newComp = [...compatibilities];
                                                    newComp[idx] = { ...newComp[idx], year_to: e.target.value ? Number(e.target.value) : null };
                                                    setCompatibilities(newComp);
                                                }}
                                                className="w-28"
                                            />
                                        </div>
                                        {compatibilities.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => setCompatibilities(prev => prev.filter((_, i) => i !== idx))}
                                                className="flex h-9 w-9 items-center justify-center rounded-md border text-destructive hover:bg-destructive/10"
                                            >
                                                &times;
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setCompatibilities(prev => [...prev, { make_id: 0, model_id: 0, year_from: null, year_to: null }])}
                                    className="flex items-center gap-1 text-sm text-primary hover:underline"
                                >
                                    + Add another vehicle
                                </button>
                                <InputError message={(errors as Record<string, string>)['compatibilities']} />
                            </div>
                            )}

                            <div className="grid gap-2">
                                <Label>Product Images</Label>
                                {existingImages.length > 0 ? (
                                    <div className="flex flex-wrap gap-3">
                                        {existingImages.map(img => (
                                            <div key={img.id} className="relative">
                                                <img src={`/storage/${img.image}`} alt={product.name} className="h-32 w-32 rounded object-cover border" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setDeletedImageIds(prev => [...prev, img.id]);
                                                        setExistingImages(prev => prev.filter(i => i.id !== img.id));
                                                    }}
                                                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs hover:bg-destructive/90"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex h-32 w-32 items-center justify-center rounded border bg-muted text-sm text-muted-foreground">No images</div>
                                )}

                                {deletedImageIds.map(id => (
                                    <input key={id} type="hidden" name="deleted_images[]" value={id} />
                                ))}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="images">Add Images</Label>
                                <Input
                                    id="images"
                                    name="images[]"
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files || []);

                                        if (files.length === 0) {
                                            return;
                                        }

                                        const previews = files.map(f => URL.createObjectURL(f));
                                        setNewImagePreviews(prev => [...prev, ...previews]);
                                    }}
                                />
                                <InputError message={errors['images']} />
                                {newImagePreviews.length > 0 && (
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        {newImagePreviews.map((preview, idx) => (
                                            <div key={idx} className="relative">
                                                <img src={preview} alt="Preview" className="h-32 w-32 rounded object-cover border" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        URL.revokeObjectURL(preview);
                                                        setNewImagePreviews(prev => prev.filter((_, i) => i !== idx));
                                                    }}
                                                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs hover:bg-destructive/90"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Update Product</Button>
                                <Link href="/admin/products">
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

EditProduct.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Products', href: '/admin/products' },
        { title: 'Edit Product', href: '' },
    ],
};
