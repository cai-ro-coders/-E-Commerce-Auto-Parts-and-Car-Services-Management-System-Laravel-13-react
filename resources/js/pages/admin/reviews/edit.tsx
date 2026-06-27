import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Review {
    id: number;
    customer_name: string;
    product_name: string;
    rating: number;
    review: string | null;
    status: boolean;
}

function RatingInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    className={`text-3xl transition-colors ${
                        star <= value ? 'text-yellow-400' : 'text-muted-foreground/30'
                    } hover:text-yellow-400`}
                >
                    ★
                </button>
            ))}
        </div>
    );
}

export default function EditReview({ review }: { review: Review }) {
    const [selectedRating, setSelectedRating] = useState(review.rating);
    const [selectedStatus, setSelectedStatus] = useState(review.status ? '1' : '0');

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={`Edit Review #${review.id}`} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading
                    title={`Edit Review by ${review.customer_name}`}
                    description={`Product: ${review.product_name}`}
                />

                <Form
                    action={`/admin/reviews/${review.id}`}
                    method="PUT"
                    className="space-y-6 max-w-xl"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label>Rating *</Label>
                                <RatingInput value={selectedRating} onChange={setSelectedRating} />
                                <input type="hidden" name="rating" value={selectedRating} />
                                <InputError message={errors.rating} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="review">Review</Label>
                                <textarea
                                    id="review"
                                    name="review"
                                    rows={4}
                                    defaultValue={review.review ?? ''}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <InputError message={errors.review} />
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
                                <Button disabled={processing}>Update Review</Button>
                                <Link href="/admin/reviews">
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

EditReview.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Reviews', href: '/admin/reviews' },
        { title: 'Edit Review', href: '' },
    ],
};
