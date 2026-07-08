'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { randomUUID } from 'crypto';
import type { CartLine, DeliveryType, OrderStatus } from '@/types';

type PlaceOrderArgs = {
  customerName: string;
  phone: string;
  deliveryType: DeliveryType;
  specialRequest?: string;
  cart: CartLine[];
};

export async function placeOrder({
  customerName,
  phone,
  deliveryType,
  specialRequest,
  cart,
}: PlaceOrderArgs) {
  const supabase = await createClient();
  const cleanedCart = cart.filter((line) => line.quantity > 0);

  if (!customerName.trim() || !phone.trim() || cleanedCart.length === 0) {
    return { success: false, error: 'Name, phone, and at least one item are required.' };
  }

  const itemIds = [...new Set(cleanedCart.map((line) => line.menuItem.id))];
  const { data: menuItems, error: menuError } = await supabase
    .from('menu_items')
    .select('id, price, available')
    .in('id', itemIds);

  if (menuError) return { success: false, error: menuError.message };

  const menuById = new Map(menuItems?.map((item) => [item.id, item]) ?? []);
  const unavailableItem = cleanedCart.find((line) => !menuById.get(line.menuItem.id)?.available);

  if (unavailableItem) {
    return {
      success: false,
      error: `${unavailableItem.menuItem.name} is not available for preorder right now.`,
    };
  }

  const total = cleanedCart.reduce((sum, line) => {
    const item = menuById.get(line.menuItem.id);
    return sum + line.quantity * Number(item?.price ?? 0);
  }, 0);

  const orderId = randomUUID();
  const { error: orderError } = await supabase
    .from('orders')
    .insert({
      id: orderId,
      customer_name: customerName.trim(),
      phone: phone.trim(),
      delivery_type: deliveryType,
      special_request: specialRequest?.trim() || null,
      total,
      status: 'pending',
    });

  if (orderError) {
    console.error('placeOrder error', orderError);
    return { success: false, error: orderError.message };
  }

  const orderItemsPayload = cleanedCart.map((line) => ({
    order_id: orderId,
    menu_item_id: line.menuItem.id,
    quantity: line.quantity,
    price: Number(menuById.get(line.menuItem.id)?.price ?? 0),
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemsPayload);

  if (itemsError) {
    console.error('placeOrder items error', itemsError);
    return { success: false, error: itemsError.message };
  }

  revalidatePath('/admin/orders');
  return { success: true, orderId };
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: 'Admin session required. Please sign in again.' };
  }

  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) {
    console.error('updateOrderStatus error', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/orders');
  return { success: true };
}
