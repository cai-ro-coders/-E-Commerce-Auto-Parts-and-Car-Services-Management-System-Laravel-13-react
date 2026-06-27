import { Head } from '@inertiajs/react';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { DollarSign, Package, ShoppingBag, ShoppingCart, TrendingUp, Wrench, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';
import { ProtectedRoute } from '@/components/protected-route';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface BestSeller {
    id: number;
    name: string;
    total_qty: number;
    revenue: number;
    image: string | null;
}

interface OrderItem {
    name: string;
    quantity: number;
    image: string | null;
}

interface RecentOrder {
    id: number;
    order_number: string;
    customer_name: string;
    total: number;
    status: string;
    payment_status: string;
    items: OrderItem[];
    created_at: string;
}

interface Stats {
    totalRevenue: number;
    todayRevenue: number;
    todayOrders: number;
    yesterdayOrders: number;
    totalOrders: number;
    totalProducts: number;
    totalCustomers: number;
    totalVehicles: number;
    totalBookings: number;
}

interface ServiceStats {
    total: number;
    waiting: number;
    assigned: number;
    inProgress: number;
    completed: number;
    cancelled: number;
}

interface CompletedService {
    id: number;
    job_number: string;
    customer_name: string;
    customer_phone: string;
    vehicle_name: string | null;
    vehicle_plate: string | null;
    mechanic_name: string;
    total_cost: number;
    services: string[];
    completed_at: string;
}

export default function AdminDashboard({
    stats,
    weeklySales,
    salesAnalytic,
    bestSellers,
    recentOrders,
    serviceStats,
    completedServices,
}: {
    stats: Stats;
    weeklySales: Record<string, number>;
    salesAnalytic: Record<string, number>;
    bestSellers: BestSeller[];
    recentOrders: RecentOrder[];
    serviceStats: ServiceStats;
    completedServices: CompletedService[];
}) {
    const weekLabels = Object.keys(weeklySales);
    const weekData = Object.values(weeklySales);

    const weeklyChart = {
        labels: weekLabels.map((d) => {
            const date = new Date(d + 'T00:00:00');

            return date.toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' });
        }),
        datasets: [
            {
                label: 'Sales ($)',
                data: weekData,
                backgroundColor: 'rgba(59, 130, 246, 0.6)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1,
            },
        ],
    };

    const analyticLabels = Object.keys(salesAnalytic);
    const analyticData = Object.values(salesAnalytic);

    const analyticChart = {
        labels: analyticLabels.map((m) => {
            const [year, month] = m.split('-');
            const date = new Date(Number(year), Number(month) - 1);

            return date.toLocaleDateString('en', { month: 'short', year: 'numeric' });
        }),
        datasets: [
            {
                label: 'Revenue ($)',
                data: analyticData,
                borderColor: 'rgb(34, 197, 94)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } },
    };

    return (
        <ProtectedRoute roles={['admin']}>
            <Head title="Admin Dashboard" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto p-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <StatCard icon={DollarSign} label="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} />
                    <StatCard icon={TrendingUp} label="Today Revenue" value={`$${stats.todayRevenue.toLocaleString()}`} />
                    <StatCard icon={ShoppingCart} label="Today Orders" value={String(stats.todayOrders)} />
                    <StatCard icon={ShoppingBag} label="Yesterday Orders" value={String(stats.yesterdayOrders)} />
                    <StatCard icon={ShoppingBag} label="Total Orders" value={String(stats.totalOrders)} />
                    <StatCard icon={Package} label="Total Products" value={String(stats.totalProducts)} />
                </div>

                <div>
                    <h2 className="mb-4 text-lg font-semibold">Service Statistics</h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <StatCard icon={Wrench} label="Total Services" value={String(serviceStats.total)} />
                        <StatCard icon={CheckCircle} label="Completed" value={String(serviceStats.completed)} />
                        <StatCard icon={Clock} label="In Progress" value={String(serviceStats.inProgress)} />
                        <StatCard icon={XCircle} label="Cancelled" value={String(serviceStats.cancelled)} />
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border p-4">
                        <h2 className="mb-4 text-lg font-semibold">Weekly Sales</h2>
                        <Bar data={weeklyChart} options={chartOptions} />
                    </div>
                    <div className="rounded-xl border p-4">
                        <h2 className="mb-4 text-lg font-semibold">Sales Analytic</h2>
                        <Line data={analyticChart} options={chartOptions} />
                    </div>
                </div>

                <div className="rounded-xl border p-4">
                    <h2 className="mb-4 text-lg font-semibold">Completed Services</h2>
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-left text-muted-foreground">
                                <th className="pb-2 font-medium">Job #</th>
                                <th className="pb-2 font-medium">Customer</th>
                                <th className="pb-2 font-medium">Vehicle</th>
                                <th className="pb-2 font-medium">Mechanic</th>
                                <th className="pb-2 font-medium">Services</th>
                                <th className="pb-2 font-medium">Total</th>
                                <th className="pb-2 font-medium">Completed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedServices.map((s) => (
                                <tr key={s.id} className="border-b last:border-0">
                                    <td className="py-3 font-medium">{s.job_number}</td>
                                    <td className="py-3">
                                        <div>{s.customer_name}</div>
                                        {s.customer_phone && <div className="text-xs text-muted-foreground">{s.customer_phone}</div>}
                                    </td>
                                    <td className="py-3">
                                        {s.vehicle_name ? <div>{s.vehicle_name}</div> : null}
                                        {s.vehicle_plate ? <div className="text-xs text-muted-foreground">{s.vehicle_plate}</div> : null}
                                        {!s.vehicle_name && !s.vehicle_plate ? <span className="text-muted-foreground">\u2014</span> : null}
                                    </td>
                                    <td className="py-3">{s.mechanic_name || '\u2014'}</td>
                                    <td className="py-3">
                                        <div className="flex flex-wrap gap-1">
                                            {s.services.slice(0, 2).map((svc, i) => (
                                                <span key={i} className="inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">{svc}</span>
                                            ))}
                                            {s.services.length > 2 && (
                                                <span className="text-xs text-muted-foreground">+{s.services.length - 2}</span>
                                            )}
                                            {s.services.length === 0 && <span className="text-muted-foreground">\u2014</span>}
                                        </div>
                                    </td>
                                    <td className="py-3">${s.total_cost.toLocaleString()}</td>
                                    <td className="py-3 text-xs text-muted-foreground">{s.completed_at}</td>
                                </tr>
                            ))}
                            {completedServices.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-6 text-center text-muted-foreground">No completed services yet</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border p-4">
                        <h2 className="mb-4 text-lg font-semibold">Best Selling Products</h2>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left text-muted-foreground">
                                    <th className="pb-2 font-medium">Product</th>
                                    <th className="pb-2 font-medium">Qty Sold</th>
                                    <th className="pb-2 font-medium">Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bestSellers.map((product) => (
                                    <tr key={product.id} className="border-b last:border-0">
                                        <td className="flex items-center gap-3 py-3">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="size-10 rounded object-cover" />
                                            ) : (
                                                <div className="flex size-10 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                                                    N/A
                                                </div>
                                            )}
                                            <span className="font-medium">{product.name}</span>
                                        </td>
                                        <td className="py-3">{product.total_qty}</td>
                                        <td className="py-3">${product.revenue.toLocaleString()}</td>
                                    </tr>
                                ))}
                                {bestSellers.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="py-6 text-center text-muted-foreground">No sales data yet</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="rounded-xl border p-4">
                        <h2 className="mb-4 text-lg font-semibold">Recent Orders</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b text-left text-muted-foreground">
                                        <th className="pb-2 font-medium">Order</th>
                                        <th className="pb-2 font-medium">Customer</th>
                                        <th className="pb-2 font-medium">Items</th>
                                        <th className="pb-2 font-medium">Total</th>
                                        <th className="pb-2 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className="border-b last:border-0">
                                            <td className="py-3 font-medium">{order.order_number}</td>
                                            <td className="py-3">{order.customer_name}</td>
                                            <td className="py-3">
                                                <div className="flex items-center gap-1">
                                                    {order.items.map((item, i) => (
                                                        <div key={i} className="relative" title={`${item.name} (${item.quantity})`}>
                                                            {item.image ? (
                                                                <img src={item.image} alt={item.name} className="size-8 rounded border object-cover" />
                                                            ) : (
                                                                <div className="flex size-8 items-center justify-center rounded border bg-muted text-[10px] text-muted-foreground">
                                                                    N/A
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                    {order.items.length === 0 && <span className="text-muted-foreground">—</span>}
                                                </div>
                                            </td>
                                            <td className="py-3">${order.total.toLocaleString()}</td>
                                            <td className="py-3">
                                                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                                    order.status === 'completed' ? 'bg-green-100 text-green-700'
                                                    : order.status === 'pending' ? 'bg-yellow-100 text-yellow-700'
                                                    : order.status === 'cancelled' ? 'bg-red-100 text-red-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {recentOrders.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-muted-foreground">No orders yet</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

function StatCard({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-4 rounded-xl border p-5">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="size-6 text-primary" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-xl font-semibold">{value}</p>
            </div>
        </div>
    );
}

AdminDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Admin Dashboard',
            href: '/admin/dashboard',
        },
    ],
};
