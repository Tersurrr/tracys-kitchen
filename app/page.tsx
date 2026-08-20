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
import Footer from '@/components/Footer';
import { MenuGridSkeleton } from '@/components/Skeletons';
import { getMenuItems } from '@/services/menu';

export default async function HomePage() {
  const menuItems = await getMenuItems();
  const heroFood =
    menuItems.find((item) => item.available && Boolean(item.image)) ??
    menuItems.find((item) => Boolean(item.image));

  return (
    <>
      <Hero backgroundImage={heroFood?.image} backgroundAlt={heroFood?.name} />
      <Categories />
      <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-24"><MenuGridSkeleton /></div>}>
        <FeaturedMeals />
      </Suspense>
      <HowItWorks />
      <WhyChooseUs />
      <PolicyCard />
      <Testimonials />
      <MapSection />
      <ContactSection />
      <Footer />
    </>
  );
}
