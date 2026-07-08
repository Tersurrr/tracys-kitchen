'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-charcoal/80 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/tracys-kitchen-logo.jpg"
            alt="Tracy's Kitchen logo"
            width={48}
            height={48}
            priority
            className="h-12 w-12 rounded-full bg-white object-contain ring-1 ring-white/10"
          />
          <span className="font-display text-xl font-semibold tracking-tight">
            Tracy&apos;s <span className="gold-text">Kitchen</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-gold"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/checkout" className="relative">
            <ShoppingBag className="h-6 w-6 text-white/90 transition-colors hover:text-gold" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-charcoal">
                {itemCount}
              </span>
            )}
          </Link>
          <Link href="/menu" className="btn-primary text-sm">
            Order Now
          </Link>
        </div>

        <button
          className="md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] bg-charcoal/95 px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-white/80 hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-gold"
              >
                Cart ({itemCount})
              </Link>
            </li>
            <li>
              <Link href="/menu" onClick={() => setOpen(false)} className="btn-primary w-full text-sm">
                Order Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
