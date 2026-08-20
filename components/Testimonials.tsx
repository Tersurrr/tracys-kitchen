'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

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
    text: 'Delivery was right on time and the food was still hot. Tracy’s Kitchen is now our go-to for weekend meals.',
  },
];

const AUTOPLAY_DELAY = 4500;
const RESUME_DELAY = 6000;

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const resumeTimer = useRef<number | null>(null);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimer.current !== null) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  }, []);

  const pause = useCallback(() => {
    clearResumeTimer();
    setPaused(true);
  }, [clearResumeTimer]);

  const scheduleResume = useCallback(() => {
    clearResumeTimer();
    if (reduceMotion) return;
    resumeTimer.current = window.setTimeout(() => setPaused(false), RESUME_DELAY);
  }, [clearResumeTimer, reduceMotion]);

  const goTo = useCallback((nextIndex: number) => {
    setActiveIndex((nextIndex + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const manualGoTo = (nextIndex: number) => {
    pause();
    goTo(nextIndex);
    scheduleResume();
  };

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % TESTIMONIALS.length),
      AUTOPLAY_DELAY
    );
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  useEffect(() => () => clearResumeTimer(), [clearResumeTimer]);

  const testimonial = TESTIMONIALS[activeIndex];

  return (
    <section
      className="mx-auto max-w-7xl px-6 py-16 sm:py-20"
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
      onMouseEnter={pause}
      onMouseLeave={scheduleResume}
      onTouchStart={pause}
      onTouchEnd={scheduleResume}
      onFocusCapture={pause}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) scheduleResume();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') manualGoTo(activeIndex - 1);
        if (event.key === 'ArrowRight') manualGoTo(activeIndex + 1);
      }}
    >
      <p className="section-eyebrow mb-3">Kind Words</p>
      <h2 className="mb-8 font-display text-3xl font-semibold md:text-4xl">
        What Customers Are Saying
      </h2>

      <div className="mx-auto max-w-3xl">
        <div className="relative min-h-[17rem] overflow-hidden rounded-xl2 sm:min-h-[14.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={activeIndex}
              drag={reduceMotion ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragStart={pause}
              onDragEnd={(_, info) => {
                if (info.offset.x < -45) goTo(activeIndex + 1);
                if (info.offset.x > 45) goTo(activeIndex - 1);
                scheduleResume();
              }}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -28 }}
              transition={{ duration: reduceMotion ? 0 : 0.3 }}
              className="glass-card absolute inset-0 flex cursor-grab flex-col justify-center p-7 active:cursor-grabbing sm:p-10"
              aria-label={`Testimonial ${activeIndex + 1} of ${TESTIMONIALS.length}`}
            >
              <div className="mb-5 flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-gold text-gold" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-base leading-relaxed text-white/75 sm:text-lg">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <p className="mt-5 font-display text-sm font-semibold text-gold">
                {testimonial.name}
              </p>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => manualGoTo(activeIndex - 1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold/50 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="flex gap-2" aria-label="Choose testimonial">
            {TESTIMONIALS.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => manualGoTo(index)}
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  index === activeIndex ? 'w-7 bg-gold' : 'w-2.5 bg-white/20 hover:bg-gold/50'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => manualGoTo(activeIndex + 1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-gold/50 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
