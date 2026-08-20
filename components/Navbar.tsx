'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import ThemeToggle from '@/components/ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#contact', label: 'Contact' },
];

const socialLinks = [
  {
    label: 'WhatsApp +1 (301) 256-7848',
    href: 'https://wa.me/13012567848?text=Hello%20Tracy%27s%20Kitchen%2C%20I%27d%20like%20to%20place%20a%20special%20order.',
  },
  { label: 'Facebook @jae.cutes.7', href: 'https://www.facebook.com/jae.cutes.7' },
  { label: 'Instagram @jae.cutes.7', href: 'https://www.instagram.com/jae.cutes.7' },
] as const;

const marqueeLinkClass =
  'font-semibold text-gold transition-colors hover:text-gold-light focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const reduceMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const menuTrigger = menuButtonRef.current;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 30);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) return;

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      menuTrigger?.focus();
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-charcoal/85 backdrop-blur-xl'
          : 'bg-charcoal'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:px-6 sm:py-3">
        <Link
          href="/"
          aria-label="Tracy's Kitchen home"
          className="flex min-w-0 items-center gap-2 whitespace-nowrap sm:gap-3"
        >
          <Image
            src="/tracys-kitchen-logo.jpg"
            alt="Tracy's Kitchen logo"
            width={56}
            height={56}
            priority
            className="h-9 w-9 shrink-0 rounded-full bg-[#fff] object-contain ring-1 ring-white/10 min-[375px]:h-10 min-[375px]:w-10 sm:h-12 sm:w-12"
          />
          <span className="truncate font-display text-[1.05rem] font-semibold leading-none tracking-tight min-[375px]:text-xl sm:text-[1.65rem]">
            Tracy&apos;s <span className="gold-text">Kitchen</span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center">
          <ThemeToggle className="h-9 w-9 sm:h-11 sm:w-11" />
          <Link
            href="/checkout"
            aria-label={`View your order with ${itemCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/5 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:h-11 sm:w-11"
          >
            <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            {itemCount > 0 && (
              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-charcoal">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/5 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:h-12 sm:w-12"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-navigation-drawer"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-7 w-7" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
            className="fixed inset-0 z-[70]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 h-full w-full bg-black/55 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              ref={drawerRef}
              id="site-navigation-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Main navigation"
              className="absolute inset-y-0 right-0 flex w-[min(88vw,24rem)] flex-col border-l border-gold/20 bg-charcoal px-6 py-6 text-left shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'tween',
                duration: reduceMotion ? 0 : 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mb-9 flex items-center justify-between border-b border-white/10 pb-5">
                <span className="font-display text-2xl font-semibold">Menu</span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-gold/50 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <ul className="flex flex-col items-start gap-6">
                {links.map((link) => (
                  <li key={link.href} className="w-full">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block w-full text-left font-display text-xl font-semibold text-white/90 transition-colors hover:text-gold focus-visible:outline-none focus-visible:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="w-full">
                  <Link
                    href="/checkout"
                    onClick={() => setOpen(false)}
                    className="block w-full text-left font-display text-xl font-semibold text-white/90 transition-colors hover:text-gold focus-visible:outline-none focus-visible:text-gold"
                  >
                    Cart ({itemCount})
                  </Link>
                </li>
              </ul>

              <Link
                href="/menu"
                onClick={() => setOpen(false)}
                className="btn-primary mt-auto w-full text-base"
              >
                Order Now
              </Link>
            </motion.aside>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      <div
        className="announcement-marquee dark-surface overflow-hidden border-y border-gold/15 bg-black/75 py-2"
        role="region"
        aria-label="Special orders and social media contacts"
      >
        <div className="announcement-marquee-track flex w-max items-center">
          <div className="flex shrink-0 items-center gap-3 px-3 text-[0.7rem] uppercase tracking-[0.14em] text-white/80 sm:gap-4 sm:px-4 sm:text-xs sm:tracking-[0.18em]">
            <span className="whitespace-nowrap">For special orders and requests, contact us:</span>
            {socialLinks.map(({ label, href }) => (
              <span key={label} className="flex items-center gap-3 whitespace-nowrap sm:gap-4">
                <span className="text-gold/50" aria-hidden="true">&bull;</span>
                <a href={href} target="_blank" rel="noopener noreferrer" className={marqueeLinkClass}>
                  {label}
                </a>
              </span>
            ))}
          </div>

          <div
            className="flex shrink-0 items-center gap-3 px-3 text-[0.7rem] uppercase tracking-[0.14em] text-white/80 sm:gap-4 sm:px-4 sm:text-xs sm:tracking-[0.18em]"
            aria-hidden="true"
          >
            <span className="whitespace-nowrap">For special orders and requests, contact us:</span>
            {socialLinks.map(({ label }) => (
              <span key={label} className="flex items-center gap-3 whitespace-nowrap sm:gap-4">
                <span className="text-gold/50">&bull;</span>
                <span className="font-semibold text-gold">{label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
