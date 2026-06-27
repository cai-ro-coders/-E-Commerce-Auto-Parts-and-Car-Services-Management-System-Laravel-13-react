import { Head, Link } from '@inertiajs/react';
import { ProtectedRoute } from '@/components/protected-route';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Assignment {
    id: number;
    job_number: string;
    job_status: string;
    assigned_at: string;
    completed_at: string | null;
    status: string;
}

interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    position: string | null;
    role: string;
    status: boolean;
    email_verified_at: string | null;
    last_login_at: string | null;
    mechanic_assignments_count: number;
    recent_assignments: Assignment[];
    created_at: string;
    updated_at: string;
}

const statusStyles: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
    assigned: 'secondary',
    in_progress: 'default',
    completed: 'outline',
    cancelled: 'destructive',
};

export default function ShowEmployee({ employee }: { employee: Employee }) {
    return (
        <ProtectedRoute roles={['admin']}>
            <Head title={employee.name} />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{employee.name}</h1>
                        <p className="text-sm text-muted-foreground">{employee.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href={`/admin/employees/${employee.id}/edit`}>
                            <Button size="sm">Edit</Button>
                        </Link>
                        <Link href="/admin/employees">
                            <Button variant="outline" size="sm">Back</Button>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-3">Account Info</h2>
                        <div className="space-y-1 text-sm">
                            <p><span className="text-muted-foreground">Email:</span> {employee.email}</p>
                            <p><span className="text-muted-foreground">Phone:</span> {employee.phone || '\u2014'}</p>
                            <p><span className="text-muted-foreground">Position:</span> {employee.position || '\u2014'}</p>
                            <p>
                                <span className="text-muted-foreground">Status:</span>{' '}
                                {employee.status ? <span className="text-green-600 font-medium">Active</span> : <span className="text-red-600 font-medium">Inactive</span>}
                            </p>
                            <p>
                                <span className="text-muted-foreground">Verified:</span>{' '}
                                {employee.email_verified_at ?? '\u2014'}
                            </p>
                            <p>
                                <span className="text-muted-foreground">Last Login:</span>{' '}
                                {employee.last_login_at ?? '\u2014'}
                            </p>
                            <p><span className="text-muted-foreground">Created:</span> {employee.created_at}</p>
                        </div>
                    </div>

                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-3">Work Stats</h2>
                        <div className="space-y-1 text-sm">
                            <p>
                                <span className="text-muted-foreground">Total Assignments:</span>{' '}
                                {employee.mechanic_assignments_count}
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border p-4">
                        <h2 className="font-semibold mb-3">Quick Actions</h2>
                        <div className="space-y-2">
                            <Link href={`/admin/employees/${employee.id}/edit`}>
                                <Button size="sm" className="w-full">Edit Employee</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Assignments */}
                <div className="rounded-xl border">
                    <div className="p-4 border-b">
                        <h2 className="font-semibold">Recent Assignments</h2>
                    </div>
                    {employee.recent_assignments.length > 0 ? (
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50 text-left">
                                    <th className="p-3 font-medium">Job #</th>
                                    <th className="p-3 font-medium">Job Status</th>
                                    <th className="p-3 font-medium">Assigned At</th>
                                    <th className="p-3 font-medium">Completed At</th>
                                    <th className="p-3 font-medium">Assignment Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employee.recent_assignments.map((a) => (
                                    <tr key={a.id} className="border-b last:border-0 hover:bg-muted/30">
                                        <td className="p-3 font-medium">{a.job_number || '\u2014'}</td>
                                        <td className="p-3">
                                            <Badge variant={statusStyles[a.job_status] || 'secondary'}>
                                                {a.job_status}
                                            </Badge>
                                        </td>
                                        <td className="p-3 text-muted-foreground">{a.assigned_at || '\u2014'}</td>
                                        <td className="p-3 text-muted-foreground">{a.completed_at || '\u2014'}</td>
                                        <td className="p-3">
                                            <Badge variant={statusStyles[a.status] || 'secondary'}>
                                                {a.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-4 text-sm text-muted-foreground text-center">No assignments yet.</div>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}

ShowEmployee.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Employees', href: '/admin/employees' },
        { title: 'Employee Details', href: '' },
    ],
};
