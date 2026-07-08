import Link from 'next/link';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Tags,
  ClipboardList,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton';
import MobileAdminNav from '@/components/admin/MobileAdminNav';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/menu', label: 'Menu Items', icon: UtensilsCrossed },
  { href: '/admin/categories', label: 'Categories', icon: Tags },
  { href: '/admin/orders', label: 'Orders', icon: ClipboardList },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) redirect('/admin/login');

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 md:flex-row md:gap-8 md:py-10">
      <MobileAdminNav />

      <aside className="hidden w-56 flex-shrink-0 md:block">
        <div className="glass-card sticky top-24 p-4">
          <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-wider text-white/40">
            Admin Panel
          </p>
          <nav className="space-y-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-gold"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 border-t border-white/10 pt-4">
            <SignOutButton />
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
