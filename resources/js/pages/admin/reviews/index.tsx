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

interface Review {
    id: number;
    customer_name: string;
    product_name: string;
    rating: number;
    review: string | null;
    status: boolean;
    created_at: string;
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: max }, (_, i) => (
                <span key={i} className={i < rating ? 'text-yellow-400' : 'text-muted-foreground/30'}>★</span>
            ))}
        </div>
    );
}

export default function ReviewsIndex({
    reviews,
    filters,
}: {
    reviews: { data: Review[]; from: number; to: number; total: number; last_page: number; current_page: number };
    filters: { search: string; rating: string; status: string };
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [rating, setRating] = useState(filters.rating ?? '');
    const [status, setStatus] = useState(filters.status ?? '');

    function applyFilters() {
        router.get('/admin/reviews', {
            search,
            rating: rating === 'all' ? '' : rating,
            status: status === 'all' ? '' : status,
        }, { preserveState: true, replace: true });
    }

    function resetFilters() {
        setSearch('');
        setRating('');
        setStatus('');
        router.get('/admin/reviews', {}, { preserveState: true, replace: true });
    }

    function handleDelete(id: number, customerName: string) {
        if (confirm(`Delete review by "${customerName}"? This cannot be undone.`)) {
            router.delete(`/admin/reviews/${id}`, {
                preserveScroll: true,
            });
        }
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Reviews" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Reviews</h1>
                        <p className="text-sm text-muted-foreground">Manage product reviews &amp; ratings</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Search</label>
                        <Input
                            placeholder="Search by customer, product, or review..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && applyFilters()}
                        />
                    </div>
                    <div className="w-[140px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Rating</label>
                        <Select value={rating} onValueChange={setRating}>
                            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {[5, 4, 3, 2, 1].map(r => (
                                    <SelectItem key={r} value={String(r)}>{r} Star{r > 1 ? 's' : ''}</SelectItem>
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
                                <th className="p-3 font-medium">Customer</th>
                                <th className="p-3 font-medium">Product</th>
                                <th className="p-3 font-medium">Rating</th>
                                <th className="p-3 font-medium">Review</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium">Date</th>
                                <th className="p-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.data.map((review) => (
                                <tr key={review.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="p-3 font-medium">{review.customer_name}</td>
                                    <td className="p-3 text-muted-foreground">{review.product_name}</td>
                                    <td className="p-3">
                                        <StarRating rating={review.rating} />
                                    </td>
                                    <td className="p-3 text-muted-foreground max-w-[200px] truncate">
                                        {review.review || <span className="italic">No comment</span>}
                                    </td>
                                    <td className="p-3">
                                        <Badge variant={review.status ? 'default' : 'secondary'}>
                                            {review.status ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </td>
                                    <td className="p-3 text-muted-foreground">{review.created_at}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/reviews/${review.id}/edit`}>
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(review.id, review.customer_name)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {reviews.data.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                                        No reviews found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {reviews.from}–{reviews.to} of {reviews.total}</span>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: reviews.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/reviews?page=${page}`}
                                preserveState
                                className={`inline-flex size-8 items-center justify-center rounded text-sm ${
                                    page === reviews.current_page
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

ReviewsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Reviews', href: '/admin/reviews' },
    ],
};
