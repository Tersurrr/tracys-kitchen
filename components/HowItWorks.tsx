import {
  UtensilsCrossed,
  ListChecks,
  MessageSquarePlus,
  Truck,
  Send,
  Smartphone,
  BadgeCheck,
  CookingPot,
} from 'lucide-react';

const STEPS = [
  { icon: UtensilsCrossed, label: 'Browse the Menu' },
  { icon: ListChecks, label: 'Select Your Meals' },
  { icon: MessageSquarePlus, label: 'Add Special Requests' },
  { icon: Truck, label: 'Choose Pickup or Delivery' },
  { icon: Send, label: 'Submit Your Preorder' },
  { icon: Smartphone, label: 'WhatsApp Opens Automatically' },
  { icon: BadgeCheck, label: 'We Confirm Your Order' },
  { icon: CookingPot, label: 'Preparation Begins After Deposit' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-charcoal-light/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <p className="section-eyebrow mb-3">The Process</p>
        <h2 className="mb-12 font-display text-3xl font-semibold md:text-4xl">
          How Ordering Works
        </h2>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STEPS.map((step, i) => (
            <div key={step.label} className="glass-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40">
                  <step.icon className="h-5 w-5 text-gold" />
                </div>
                <span className="font-display text-2xl font-semibold text-white/15">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="text-sm font-medium leading-snug">{step.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
