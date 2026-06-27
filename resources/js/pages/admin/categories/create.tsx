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

interface ParentCategory {
    id: number;
    name: string;
}

export default function CreateCategory({ parentCategories }: { parentCategories: ParentCategory[] }) {
    const [parentId, setParentId] = useState('none');
    const [selectedStatus, setSelectedStatus] = useState('1');

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Add Category" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading title="Add Category" description="Create a new product category" />

                <Form
                    action="/admin/categories"
                    method="POST"
                    encType="multipart/form-data"
                    className="space-y-6 max-w-xl"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name *</Label>
                                <Input id="name" name="name" required placeholder="Engine & Drivetrain" />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="parent_id">Parent Category</Label>
                                <Select value={parentId} onValueChange={setParentId}>
                                    <SelectTrigger><SelectValue placeholder="None (top level)" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">None (top level)</SelectItem>
                                        {parentCategories.map(pc => (
                                            <SelectItem key={pc.id} value={String(pc.id)}>{pc.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <input type="hidden" name="parent_id" value={parentId === 'none' ? '' : parentId} />
                                <InputError message={errors.parent_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    className="border-input focus-visible:border-ring focus-visible:ring-ring/50 flex w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                                    placeholder="Category description..."
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="image">Image</Label>
                                <Input id="image" name="image" type="file" accept="image/jpeg,image/png,image/jpg,image/webp" />
                                <InputError message={errors.image} />
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
                                <Button disabled={processing}>Save Category</Button>
                                <Link href="/admin/categories">
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

CreateCategory.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Categories', href: '/admin/categories' },
        { title: 'Add Category', href: '/admin/categories/create' },
    ],
};
