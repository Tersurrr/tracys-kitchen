import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Amaka O.',
    text: 'Every order tastes like it came straight from a home kitchen. The jollof rice is unmatched and pickup was quick and easy.',
  },
  {
    name: 'Derrick J.',
    text: 'I love that I can add special requests. They remembered exactly how I like my food less spicy every single time.',
  },
  {
    name: 'Fatima B.',
    text: 'Delivery was right on time and the food was still hot. Tracy\u2019s Kitchen is now our go-to for weekend meals.',
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <p className="section-eyebrow mb-3">Kind Words</p>
      <h2 className="mb-12 font-display text-3xl font-semibold md:text-4xl">
        What Customers Are Saying
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <div key={t.name} className="glass-card p-7">
            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="mb-5 text-sm leading-relaxed text-white/75">
              &ldquo;{t.text}&rdquo;
            </p>
            <p className="font-display text-sm font-semibold text-gold">
              {t.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
