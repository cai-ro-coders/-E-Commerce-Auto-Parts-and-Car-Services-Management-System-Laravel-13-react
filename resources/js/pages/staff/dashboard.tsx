import { Head } from '@inertiajs/react';
import { Calendar, Clock, Wrench, Car } from 'lucide-react';
import { ProtectedRoute } from '@/components/protected-route';

interface Stats {
    todayBookings: number;
    pendingBookings: number;
    servicePackages: number;
    totalVehicles: number;
}

export default function StaffDashboard({ stats }: { stats: Stats }) {
    const cards = [
        { label: 'Today\'s Bookings', value: stats.todayBookings, icon: Calendar },
        { label: 'Pending Bookings', value: stats.pendingBookings, icon: Clock },
        { label: 'Service Packages', value: stats.servicePackages, icon: Wrench },
        { label: 'Total Vehicles', value: stats.totalVehicles, icon: Car },
    ];

    return (
        <ProtectedRoute roles={['staff']}>
            <Head title="Staff Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Staff Dashboard</h1>
                <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => (
                        <div
                            key={card.label}
                            className="flex items-center gap-4 rounded-xl border p-6"
                        >
                            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                                <card.icon className="size-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">{card.label}</p>
                                <p className="text-2xl font-semibold">{card.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    );
}

StaffDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Staff Dashboard',
            href: '/staff/dashboard',
        },
    ],
};
