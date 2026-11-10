import { Suspense } from 'react';
import ShopView from '@/components/ShopView';

export const metadata = {
  title: 'Shop skincare',
  description: 'Browse serums, cleansers, moisturizers, sunscreen, masks and more from SKINORA. Filter by type or shop the current offers.',
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopView />
    </Suspense>
  );
}
