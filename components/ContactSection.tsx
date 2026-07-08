import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="bg-charcoal-light/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-eyebrow mb-3">Get in Touch</p>
            <h2 className="mb-6 font-display text-3xl font-semibold md:text-4xl">
              About Tracy&apos;s Kitchen
            </h2>
            <p className="mb-8 text-white/70 leading-relaxed">
              At Tracy&apos;s Kitchen, we prepare fresh homemade meals and
              snacks exclusively by pre-order. Customers can either pick up
              their orders or request delivery, with most orders prepared and
              delivered promptly. Our goal is to provide delicious, freshly
              made food using quality ingredients while ensuring every order
              is prepared with care.
            </p>

            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold" /> +1 (301) 256-7848
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" /> Tracyayuk3@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gold" /> 329 Ellerton S, Laurel MD 20724
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gold" /> Orders by pre-order only — pickup or delivery
              </li>
            </ul>
          </div>

          <div className="glass-card p-8">
            <h3 className="mb-4 font-display text-xl font-semibold">
              Ready to Order?
            </h3>
            <p className="mb-6 text-sm text-white/60">
              Browse the menu, add your favorites, and place your preorder in
              minutes. We&apos;ll confirm everything over WhatsApp.
            </p>
            <Link href="/menu" className="btn-primary w-full">
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
