import { Form, Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const POSITIONS = ['Accountant', 'Mechanic', 'Receptionist', 'Service Manager'];

export default function CreateEmployee() {
    const [position, setPosition] = useState('');

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Add Employee" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <Heading title="Add Employee" description="Create a new staff account" />

                <Form
                    action="/admin/employees"
                    method="POST"
                    className="space-y-6 max-w-xl"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="employee_id">Employee ID *</Label>
                                <Input id="employee_id" name="employee_id" required placeholder="e.g. EMP-001" />
                                <InputError message={errors.employee_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Name *</Label>
                                <Input id="name" name="name" required placeholder="John Doe" />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" placeholder="+1-555-0000" />
                                <InputError message={errors.phone} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="position">Position</Label>
                                <Select value={position} onValueChange={setPosition} name="position">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a position" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {POSITIONS.map(p => (
                                            <SelectItem key={p} value={p}>{p}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <input type="hidden" name="position" value={position} />
                                <InputError message={errors.position} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <textarea
                                    id="address"
                                    name="address"
                                    rows={3}
                                    className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                    placeholder="123 Main St, City"
                                />
                                <InputError message={errors.address} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">Password *</Label>
                                <Input id="password" name="password" type="password" required placeholder="Min. 8 characters" />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center gap-4">
                                <Button disabled={processing}>Save Employee</Button>
                                <Link href="/admin/employees">
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

CreateEmployee.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Employees', href: '/admin/employees' },
        { title: 'Add Employee', href: '/admin/employees/create' },
    ],
};
