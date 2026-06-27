import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { ProtectedRoute } from '@/components/protected-route';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Employee {
    id: number;
    employee_id: string | null;
    address: string | null;
    name: string;
    email: string;
    phone: string | null;
    position: string;
    status: boolean;
    email_verified_at: string | null;
    mechanic_assignments_count: number;
    last_login_at: string | null;
    created_at: string;
}

export default function EmployeesIndex({
    employees,
    filters,
}: {
    employees: { data: Employee[]; links: any[]; from: number; to: number; total: number; last_page: number; current_page: number };
    filters: { search: string };
}) {
    const [search, setSearch] = useState(filters.search || '');

    function applyFilters() {
        router.get('/admin/employees', { search }, { preserveState: true, replace: true });
    }

    function resetFilters() {
        setSearch('');
        router.get('/admin/employees', {}, { preserveState: true, replace: true });
    }

    function handleDelete(id: number, name: string) {
        if (confirm(`Delete employee "${name}"? This cannot be undone.`)) {
            router.delete(`/admin/employees/${id}`, {
                preserveScroll: true,
            });
        }
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Employees" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Employees</h1>
                        <p className="text-sm text-muted-foreground">Manage staff employees</p>
                    </div>
                    <Link href="/admin/employees/create">
                        <Button size="sm">Add Employee</Button>
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Search</label>
                        <Input
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && applyFilters()}
                        />
                    </div>
                    <Button variant="secondary" size="sm" onClick={applyFilters}>Filter</Button>
                    <Button variant="ghost" size="sm" onClick={resetFilters}>Reset</Button>
                </div>

                {/* Table */}
                <div className="rounded-xl border overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50 text-left">
                                <th className="p-3 font-medium">Employee ID</th>
                                <th className="p-3 font-medium">Name</th>
                                <th className="p-3 font-medium">Position</th>
                                <th className="p-3 font-medium">Address</th>
                                <th className="p-3 font-medium">Phone</th>
                                <th className="p-3 font-medium">Email</th>
                                <th className="p-3 font-medium">Status</th>
                                <th className="p-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {employees.data.map((emp) => (
                                <tr key={emp.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="p-3 font-medium">{emp.employee_id ?? `#${emp.id}`}</td>
                                    <td className="p-3">{emp.name}</td>
                                    <td className="p-3 capitalize">{emp.position}</td>
                                    <td className="p-3 text-muted-foreground">{emp.address || '\u2014'}</td>
                                    <td className="p-3 text-muted-foreground">{emp.phone || '\u2014'}</td>
                                    <td className="p-3 text-muted-foreground">{emp.email}</td>
                                    <td className="p-3">
                                        {emp.status ? (
                                            <span className="text-green-600 font-medium">Active</span>
                                        ) : (
                                            <span className="text-red-600 font-medium">Inactive</span>
                                        )}
                                    </td>
                                    <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/employees/${emp.id}`}>
                                                <Button variant="ghost" size="sm">View</Button>
                                            </Link>
                                            <Link href={`/admin/employees/${emp.id}/edit`}>
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(emp.id, emp.name)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {employees.data.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-muted-foreground">
                                        No employees found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {employees.from}\u2013{employees.to} of {employees.total}</span>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: employees.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/employees?page=${page}`}
                                preserveState
                                className={`inline-flex size-8 items-center justify-center rounded text-sm ${
                                    page === employees.current_page
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

EmployeesIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Employees', href: '/admin/employees' },
    ],
};
