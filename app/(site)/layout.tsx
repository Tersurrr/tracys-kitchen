import { CartProvider } from '@/hooks/useCart';
import Navbar from '@/components/Navbar';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <main className="min-h-screen">{children}</main>
    </CartProvider>
  );
}
