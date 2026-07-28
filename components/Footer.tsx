import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Youtube,
} from 'lucide-react';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/jae.cutes.7',
    icon: Facebook,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/jae.cutes.7',
    icon: Instagram,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@ayukjosephinee8484',
    icon: Youtube,
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/13012567848?text=Hello%20Tracy%27s%20Kitchen%2C%20I%27d%20like%20to%20place%20a%20preorder.',
    icon: MessageCircle,
  },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-charcoal">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/tracys-kitchen-logo.jpg"
              alt="Tracy's Kitchen logo"
              width={48}
              height={48}
              className="h-12 w-12 rounded-full bg-white object-contain ring-1 ring-white/10"
            />
            <h3 className="font-display text-lg font-semibold">
              Tracy&apos;s <span className="gold-text">Kitchen</span>
            </h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Fresh homemade meals and snacks, prepared exclusively by pre-order.
            Pickup or delivery always made with care.
          </p>
          <div className="mt-5">
            <p className="section-eyebrow mb-3">Follow Tracy&apos;s Kitchen</p>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow Tracy's Kitchen on ${name}`}
                  title={name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-gold/50 hover:bg-gold/10 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
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
              <MapPin className="h-4 w-4 text-gold" /> 3461 Andrew Court, Laurel MD 20724
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
