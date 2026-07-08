export type Category = {
  id: string;
  name: string;
  created_at: string;
};

export type MenuItem = {
  id: string;
  category_id: string | null;
  name: string;
  description: string;
  price: number;
  image: string | null;
  available: boolean;
  created_at: string;
  category?: Category;
};

export type DeliveryType = 'pickup' | 'delivery';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'delivered';

export type Order = {
  id: string;
  customer_name: string;
  phone: string;
  delivery_type: DeliveryType;
  special_request: string | null;
  total: number;
  status: OrderStatus;
  created_at: string;
  order_items?: OrderItem[];
};

export type OrderItem = {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price: number;
  menu_item?: MenuItem;
};

export type CartLine = {
  menuItem: MenuItem;
  quantity: number;
  specialRequest?: string;
};
