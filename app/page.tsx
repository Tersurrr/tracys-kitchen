import { Suspense } from 'react';
import Hero from '@/components/Hero';
import FeaturedMeals from '@/components/FeaturedMeals';
import Categories from '@/components/Categories';
import WhyChooseUs from '@/components/WhyChooseUs';
import HowItWorks from '@/components/HowItWorks';
import PolicyCard from '@/components/PolicyCard';
import Testimonials from '@/components/Testimonials';
import MapSection from '@/components/MapSection';
import ContactSection from '@/components/ContactSection';
import { MenuGridSkeleton } from '@/components/Skeletons';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-24"><MenuGridSkeleton /></div>}>
        <FeaturedMeals />
      </Suspense>
      <Categories />
      <WhyChooseUs />
      <HowItWorks />
      <PolicyCard />
      <Testimonials />
      <MapSection />
      <ContactSection />
    </>
  );
}
