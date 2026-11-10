'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Chip from './Chip';
import PageShell from './PageShell';
import ProductGrid from './ProductGrid';
import { SHOP_CATEGORIES, SORTS } from '@/data/site';
import { ALL_PRODUCTS } from '@/lib/products';

// Shop page: filter and sort live in the URL (?cat=Serum&sort=Price%20%E2%86%91)
export default function ShopView() {
  const router = useRouter();
  const params = useSearchParams();
  const cat = SHOP_CATEGORIES.includes(params.get('cat')) ? params.get('cat') : 'All';
  const sort = SORTS.includes(params.get('sort')) ? params.get('sort') : 'Featured';

  const update = (key, value) => {
    const next = new URLSearchParams(params.toString());
    next.set(key, value);
    router.replace(`/shop?${next.toString()}`, { scroll: false });
  };

  let list = ALL_PRODUCTS.filter((p) => cat === 'All' || (cat === 'On sale' ? p.hasDeal : p.type === cat));
  if (sort === 'Price ↑') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'Price ↓') list = [...list].sort((a, b) => b.price - a.price);

  return (
    <PageShell title="Shop" titleClass="">
      <div className="flex flex-wrap justify-between gap-4 my-6">
        <div className="flex flex-wrap gap-2">
          {SHOP_CATEGORIES.map((c) => (
            <Chip key={c} active={cat === c} onClick={() => update('cat', c)}>{c}</Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="mut">Sort</span>
          {SORTS.map((s) => (
            <Chip key={s} active={sort === s} onClick={() => update('sort', s)}>{s}</Chip>
          ))}
        </div>
      </div>
      <div className="mut mb-4">{list.length + (list.length === 1 ? ' product' : ' products')}</div>
      <ProductGrid products={list} />
    </PageShell>
  );
}
