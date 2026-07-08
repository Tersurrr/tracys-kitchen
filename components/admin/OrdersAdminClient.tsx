'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { updateOrderStatus } from '@/actions/order-actions';
import { formatCurrency, formatDate, STATUS_LABELS, STATUS_COLORS } from '@/utils/format';
import type { Order, OrderStatus } from '@/types';

const STATUSES: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready', 'delivered'];

export default function OrdersAdminClient({ orders }: { orders: Order[] }) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchesQuery =
        query.trim() === '' ||
        o.customer_name.toLowerCase().includes(query.toLowerCase()) ||
        o.phone.includes(query);
      const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [orders, query, statusFilter]);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    const result = await updateOrderStatus(orderId, status);
    if (!result.success) {
      toast.error(result.error ?? 'Failed to update status');
      return;
    }
    toast.success('Status updated');
  };

  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or phone..."
            className="w-full rounded-full border border-white/10 bg-white/5 py-2.5 pl-11 pr-4 text-sm focus:border-gold focus:outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
          className="min-h-11 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm focus:border-gold focus:outline-none md:w-auto"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filtered.map((order) => (
          <div key={order.id} className="glass-card min-w-0 p-4 sm:p-5">
            <div
              className="flex cursor-pointer flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
              onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
            >
              <div className="min-w-0">
                <p className="break-words font-display font-semibold">{order.customer_name}</p>
                <p className="break-words text-xs text-white/50">{order.phone} &middot; {formatDate(order.created_at)}</p>
              </div>
              <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-3">
                <span className="text-sm font-semibold text-gold">
                  {formatCurrency(order.total)}
                </span>
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold capitalize ${STATUS_COLORS[order.status]}`}>
                  {STATUS_LABELS[order.status]}
                </span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs capitalize text-white/60">
                  {order.delivery_type}
                </span>
              </div>
            </div>

            {expandedId === order.id && (
              <div className="mt-5 border-t border-white/10 pt-5">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
                  Items
                </p>
                <ul className="mb-4 space-y-1 text-sm text-white/70">
                  {order.order_items?.map((oi) => (
                    <li key={oi.id} className="break-words">
                      {oi.quantity} x {oi.menu_item?.name ?? 'Item'} — {formatCurrency(oi.price * oi.quantity)}
                    </li>
                  ))}
                </ul>

                {order.special_request && (
                  <div className="mb-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/40">
                      Special Request
                    </p>
                    <p className="text-sm text-white/70">{order.special_request}</p>
                  </div>
                )}

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-white/40">
                    Update Status
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStatusChange(order.id, s)}
                        className={`min-h-10 rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                          order.status === s
                            ? 'border-gold bg-gold text-charcoal'
                            : 'border-white/15 text-white/60 hover:border-gold/50'
                        }`}
                      >
                        {STATUS_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="glass-card p-8 text-center text-sm text-white/40">
            No orders match your search.
          </p>
        )}
      </div>
    </div>
  );
}
