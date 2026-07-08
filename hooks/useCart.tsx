'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { CartLine, MenuItem } from '@/types';
import toast from 'react-hot-toast';

type CartContextValue = {
  cart: CartLine[];
  addToCart: (item: MenuItem, quantity: number, specialRequest?: string) => void;
  removeFromCart: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);

  const addToCart = useCallback(
    (item: MenuItem, quantity: number, specialRequest?: string) => {
      setCart((prev) => {
        const existing = prev.find((l) => l.menuItem.id === item.id);
        if (existing) {
          return prev.map((l) =>
            l.menuItem.id === item.id
              ? { ...l, quantity: l.quantity + quantity, specialRequest: specialRequest ?? l.specialRequest }
              : l
          );
        }
        return [...prev, { menuItem: item, quantity, specialRequest }];
      });
      toast.success(`Added ${item.name} to your order`);
    },
    []
  );

  const removeFromCart = useCallback((menuItemId: string) => {
    setCart((prev) => prev.filter((l) => l.menuItem.id !== menuItemId));
  }, []);

  const updateQuantity = useCallback((menuItemId: string, quantity: number) => {
    setCart((prev) =>
      prev
        .map((l) => (l.menuItem.id === menuItemId ? { ...l, quantity } : l))
        .filter((l) => l.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const total = useMemo(
    () => cart.reduce((sum, l) => sum + l.quantity * l.menuItem.price, 0),
    [cart]
  );

  const itemCount = useMemo(
    () => cart.reduce((sum, l) => sum + l.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
