'use client';

import PageShell from './PageShell';
import ProductGrid from './ProductGrid';
import { useStore } from '@/context/StoreContext';
import { ALL_PRODUCTS } from '@/lib/products';

export default function WishlistView() {
  const { fav } = useStore();
  const saved = ALL_PRODUCTS.filter((p) => fav[p.id]);
  return (
    <PageShell title="Wishlist">
      {saved.length === 0 && <p className="mut">Nothing saved yet. Tap the heart on any product.</p>}
      <ProductGrid products={saved} />
    </PageShell>
  );
}
