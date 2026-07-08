import {
  ClipboardList,
  Clock,
  CheckCircle2,
  UtensilsCrossed,
  Tags,
} from 'lucide-react';
import { getOrderStats } from '@/services/orders';

export default async function AdminDashboardPage() {
  const stats = await getOrderStats();

  const cards = [
    { label: 'Total Orders', value: stats.totalOrders, icon: ClipboardList },
    { label: 'Pending Orders', value: stats.pendingOrders, icon: Clock },
    { label: 'Completed Orders', value: stats.completedOrders, icon: CheckCircle2 },
    { label: 'Menu Items', value: stats.menuItemCount, icon: UtensilsCrossed },
    { label: 'Categories', value: stats.categoryCount, icon: Tags },
  ];

  return (
    <div className="min-w-0">
      <h1 className="mb-6 font-display text-2xl font-semibold sm:mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="glass-card min-w-0 p-4 sm:p-6">
            <c.icon className="mb-4 h-5 w-5 text-gold sm:h-6 sm:w-6" />
            <p className="font-display text-2xl font-semibold sm:text-3xl">{c.value}</p>
            <p className="mt-1 break-words text-xs text-white/50">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
