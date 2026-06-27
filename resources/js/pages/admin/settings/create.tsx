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

export default function CreateSetting() {
    const [selectedGroup, setSelectedGroup] = useState('general');

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Add Setting" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading title="Add Setting" description="Create a new application setting" />

                <Form
                    action="/admin/settings"
                    method="POST"
                    className="space-y-6 max-w-xl"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="key">Key *</Label>
                                <Input id="key" name="key" required placeholder="e.g. site_name" />
                                <InputError message={errors.key} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="value">Value</Label>
                                <textarea
                                    id="value"
                                    name="value"
                                    rows={3}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Setting value"
                                />
                                <InputError message={errors.value} />
                            </div>

                            <div className="w-[200px]">
                                <Label htmlFor="group">Group *</Label>
                                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="general">General</SelectItem>
                                        <SelectItem value="payment">Payment</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                        <SelectItem value="social">Social</SelectItem>
                                        <SelectItem value="custom">Custom</SelectItem>
                                    </SelectContent>
                                </Select>
                                <input type="hidden" name="group" value={selectedGroup} />
                                <InputError message={errors.group} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Save Setting</Button>
                                <Link href="/admin/settings">
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

CreateSetting.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Settings', href: '/admin/settings' },
        { title: 'Add Setting', href: '' },
    ],
};
