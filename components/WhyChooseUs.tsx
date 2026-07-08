import { ChefHat, Clock, Truck, HeartHandshake } from 'lucide-react';

const FEATURES = [
  {
    icon: ChefHat,
    title: 'Made Fresh, Always',
    desc: 'Every meal is prepared from scratch with quality ingredients after you order. Nothing sits under a heat lamp.',
  },
  {
    icon: Clock,
    title: 'Quick Turnaround',
    desc: 'Most orders are prepared and ready promptly after your deposit is confirmed.',
  },
  {
    icon: Truck,
    title: 'Pickup or Delivery',
    desc: 'Choose whichever works best for you. Swing by, or have it brought to your door.',
  },
  {
    icon: HeartHandshake,
    title: 'Made With Care',
    desc: 'Special requests and dietary notes are welcome. We cook it your way.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <p className="section-eyebrow mb-3">Why Tracy&apos;s Kitchen</p>
      <h2 className="mb-12 font-display text-3xl font-semibold md:text-4xl">
        Why Choose Us
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f) => (
          <div key={f.title} className="glass-card p-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient">
              <f.icon className="h-6 w-6 text-charcoal" />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">{f.title}</h3>
            <p className="text-sm leading-relaxed text-white/60">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
