import type { Metadata } from 'next';
import CheckoutClient from '@/components/CheckoutClient';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Review your order and submit your preorder to Tracy\u2019s Kitchen.',
  alternates: { canonical: '/checkout' },
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
