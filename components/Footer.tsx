import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-charcoal">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <h3 className="font-display text-lg font-semibold">
            Tracy&apos;s <span className="gold-text">Kitchen</span>
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Fresh homemade meals and snacks, prepared exclusively by pre-order.
            Pickup or delivery — always made with care.
          </p>
        </div>

        <div>
          <h4 className="section-eyebrow mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/menu" className="hover:text-gold">Menu</Link></li>
            <li><Link href="/checkout" className="hover:text-gold">Your Order</Link></li>
            <li><Link href="/#policy" className="hover:text-gold">Business Policy</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-gold">How Ordering Works</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="section-eyebrow mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold" /> +1 (301) 256-7848
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold" /> Tracyayuk3@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" /> 329 Ellerton S, Laurel MD 20724
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.06] py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Tracy&apos;s Kitchen. All rights reserved.
      </div>
    </footer>
  );
}
