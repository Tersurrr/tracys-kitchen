import { getOrders } from '@/services/orders';
import OrdersAdminClient from '@/components/admin/OrdersAdminClient';

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div className="min-w-0">
      <h1 className="mb-6 font-display text-2xl font-semibold sm:mb-8">Orders</h1>
      <OrdersAdminClient orders={orders} />
    </div>
  );
}
