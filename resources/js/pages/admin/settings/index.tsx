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

interface Setting {
    id: number;
    key: string;
    value: string | null;
    group: string;
    created_at: string;
}

export default function SettingsIndex({
    settings,
    groups,
    filters,
}: {
    settings: { data: Setting[]; from: number; to: number; total: number; last_page: number; current_page: number };
    groups: string[];
    filters: { search: string; group: string };
}) {
    const [search, setSearch] = useState(filters.search || '');
    const [group, setGroup] = useState(filters.group ?? '');

    function applyFilters() {
        router.get('/admin/settings', {
            search,
            group: group === 'all' ? '' : group,
        }, { preserveState: true, replace: true });
    }

    function resetFilters() {
        setSearch('');
        setGroup('');
        router.get('/admin/settings', {}, { preserveState: true, replace: true });
    }

    function handleDelete(id: number, key: string) {
        if (confirm(`Delete setting "${key}"? This cannot be undone.`)) {
            router.delete(`/admin/settings/${id}`, {
                preserveScroll: true,
            });
        }
    }

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Settings" />

            <div className="flex flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <p className="text-sm text-muted-foreground">Manage application settings</p>
                    </div>
                    <Link href="/admin/settings/create">
                        <Button size="sm">Add Setting</Button>
                    </Link>
                </div>

                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[200px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Search</label>
                        <Input
                            placeholder="Search by key or value..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && applyFilters()}
                        />
                    </div>
                    <div className="w-[140px]">
                        <label className="mb-1 block text-xs text-muted-foreground">Group</label>
                        <Select value={group} onValueChange={setGroup}>
                            <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {groups.map(g => (
                                    <SelectItem key={g} value={g}>{g}</SelectItem>
                                ))}
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
                                <th className="p-3 font-medium">Key</th>
                                <th className="p-3 font-medium">Value</th>
                                <th className="p-3 font-medium">Group</th>
                                <th className="p-3 font-medium">Created</th>
                                <th className="p-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {settings.data.map((setting) => (
                                <tr key={setting.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="p-3 font-medium font-mono text-xs">{setting.key}</td>
                                    <td className="p-3 text-muted-foreground max-w-[300px] truncate">
                                        {setting.value ?? <span className="italic">Not set</span>}
                                    </td>
                                    <td className="p-3">
                                        <Badge variant="outline">{setting.group}</Badge>
                                    </td>
                                    <td className="p-3 text-muted-foreground">{setting.created_at}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link href={`/admin/settings/${setting.id}/edit`}>
                                                <Button variant="ghost" size="sm">Edit</Button>
                                            </Link>
                                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(setting.id, setting.key)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {settings.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                                        No settings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {settings.from}–{settings.to} of {settings.total}</span>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: settings.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/settings?page=${page}`}
                                preserveState
                                className={`inline-flex size-8 items-center justify-center rounded text-sm ${
                                    page === settings.current_page
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

SettingsIndex.layout = {
    breadcrumbs: [
        { title: 'Dashboard', href: '/admin/dashboard' },
        { title: 'Settings', href: '/admin/settings' },
    ],
};
