import { ShieldCheck } from 'lucide-react';

const POLICIES = [
  'Fresh meals and snacks are prepared by pre-order only.',
  'A deposit is required before we begin preparing any order.',
  'Customers may choose pickup or delivery.',
  'Orders are prepared as quickly as possible after confirmation.',
  'Soup orders picked up in customers\u2019 own bowls do not require a deposit.',
  'Customers can include special cooking instructions or requests when ordering.',
];

export default function PolicyCard({ compact = false }: { compact?: boolean }) {
  return (
    <section id="policy" className={compact ? '' : 'mx-auto max-w-7xl px-6 py-24'}>
      {!compact && (
        <>
          <p className="section-eyebrow mb-3">Please Note</p>
          <h2 className="mb-12 font-display text-3xl font-semibold md:text-4xl">
            Our Business Policy
          </h2>
        </>
      )}
      <div className="glass-card p-7 md:p-10">
        <ul className="grid gap-4 sm:grid-cols-2">
          {POLICIES.map((p) => (
            <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
              <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
