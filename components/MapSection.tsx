import { Navigation } from 'lucide-react';

const LAT = 39.0925;
const LNG = -76.8194;

export default function MapSection() {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;
  const embedSrc = `https://maps.google.com/maps?q=${LAT},${LNG}&z=15&output=embed`;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <p className="section-eyebrow mb-3">Find Us</p>
      <h2 className="mb-8 font-display text-3xl font-semibold md:text-4xl">
        Visit Tracy&apos;s Kitchen
      </h2>

      <div className="glass-card overflow-hidden">
        <div className="aspect-[16/7] w-full">
          <iframe
            title="Tracy's Kitchen location map"
            src={embedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 p-6">
          <p className="text-sm text-white/70">329 Ellerton S, Laurel, MD 20724</p>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            <Navigation className="h-4 w-4" /> Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
