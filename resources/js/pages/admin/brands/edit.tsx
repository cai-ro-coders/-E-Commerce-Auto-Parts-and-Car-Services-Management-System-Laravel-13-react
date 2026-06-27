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

interface Brand {
    id: number;
    name: string;
    description: string | null;
    logo: string | null;
    status: boolean;
}

export default function EditBrand({ brand }: { brand: Brand }) {
    const [selectedStatus, setSelectedStatus] = useState(brand.status ? '1' : '0');

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={`Edit ${brand.name}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading title={`Edit: ${brand.name}`} description="Update brand details" />

                <Form
                    action={`/admin/brands/${brand.id}`}
                    method="PUT"
                    encType="multipart/form-data"
                    className="space-y-6 max-w-xl"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name *</Label>
                                <Input id="name" name="name" required defaultValue={brand.name} />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    defaultValue={brand.description ?? ''}
                                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="logo">Logo</Label>
                                <Input id="logo" name="logo" type="file" accept="image/jpeg,image/png,image/jpg,image/webp" />
                                {brand.logo && (
                                    <div className="mt-2">
                                        <img src={`/storage/${brand.logo}`} alt={brand.name} className="h-24 w-24 rounded border object-cover" />
                                    </div>
                                )}
                                <InputError message={errors.logo} />
                            </div>

                            <div className="w-[140px]">
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

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Update Brand</Button>
                                <Link href="/admin/brands">
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

EditBrand.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Brands', href: '/admin/brands' },
        { title: 'Edit Brand', href: '' },
    ],
};
