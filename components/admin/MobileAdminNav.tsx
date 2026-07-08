'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ClipboardList,
  KeyRound,
  LayoutDashboard,
  Menu,
  Tags,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import SignOutButton from '@/components/SignOutButton';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/menu', label: 'Menu Items', icon: UtensilsCrossed },
  { href: '/admin/categories', label: 'Categories', icon: Tags },
  { href: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { href: '/admin/passwords', label: 'Passwords', icon: KeyRound },
];

export default function MobileAdminNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white/80"
        aria-label="Open admin navigation"
        aria-expanded={open}
      >
        <Menu className="h-4 w-4" />
        Admin Menu
      </button>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-[70] bg-black/60"
          aria-label="Close admin navigation"
          onClick={close}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-[80] h-dvh w-[min(19rem,calc(100vw-2rem))] bg-charcoal p-4 transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="glass-card flex h-full flex-col p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="px-2 text-xs font-semibold uppercase tracking-wider text-white/40">
              Admin Panel
            </p>
            <button
              type="button"
              onClick={close}
              className="rounded-lg p-2 text-white/60 hover:bg-white/5 hover:text-white"
              aria-label="Close admin navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {NAV.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-gold/10 text-gold'
                      : 'text-white/70 hover:bg-white/5 hover:text-gold'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto border-t border-white/10 pt-4">
            <SignOutButton />
          </div>
        </div>
      </aside>
    </div>
  );
}
