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

interface Coupon {
    id: number;
    code: string;
    discount_type: string;
    discount_value: number;
    start_date: string | null;
    end_date: string | null;
    usage_limit: number | null;
    status: boolean;
}

export default function EditCoupon({ coupon }: { coupon: Coupon }) {
    const [discountType, setDiscountType] = useState(coupon.discount_type);
    const [selectedStatus, setSelectedStatus] = useState(coupon.status ? '1' : '0');

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={`Edit ${coupon.code}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading title={`Edit: ${coupon.code}`} description="Update coupon details" />

                <Form
                    action={`/admin/coupons/${coupon.id}`}
                    method="PUT"
                    className="space-y-6 max-w-xl"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="code">Coupon Code *</Label>
                                    <Input id="code" name="code" required defaultValue={coupon.code} />
                                    <InputError message={errors.code} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="discount_type">Discount Type</Label>
                                    <Select value={discountType} onValueChange={setDiscountType}>
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="percentage">Percentage</SelectItem>
                                            <SelectItem value="fixed">Fixed Amount</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <input type="hidden" name="discount_type" value={discountType} />
                                    <InputError message={errors.discount_type} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="discount_value">
                                    Discount Value {discountType === 'percentage' ? '(%)' : '($)'} *
                                </Label>
                                <Input id="discount_value" name="discount_value" type="number" step="0.01" min="0" required defaultValue={coupon.discount_value} />
                                <InputError message={errors.discount_value} />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label htmlFor="start_date">Start Date</Label>
                                    <Input id="start_date" name="start_date" type="date" defaultValue={coupon.start_date ?? ''} />
                                    <InputError message={errors.start_date} />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="end_date">End Date</Label>
                                    <Input id="end_date" name="end_date" type="date" defaultValue={coupon.end_date ?? ''} />
                                    <InputError message={errors.end_date} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="usage_limit">Usage Limit</Label>
                                <Input id="usage_limit" name="usage_limit" type="number" min="1" defaultValue={coupon.usage_limit ?? ''} />
                                <InputError message={errors.usage_limit} />
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
                                <Button disabled={processing}>Update Coupon</Button>
                                <Link href="/admin/coupons">
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

EditCoupon.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Coupons', href: '/admin/coupons' },
        { title: 'Edit Coupon', href: '' },
    ],
};
