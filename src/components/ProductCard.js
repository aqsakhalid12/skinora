'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { imageSrc } from '@/lib/products';

export default function ProductCard({ product: p }) {
  const { fav, toggleFav, addToCart } = useStore();
  const isFav = !!fav[p.id];

  return (
    <div className="glass hv p-4 flex flex-col gap-3">
      <Link href={`/product/${p.id}`} aria-label={p.name} className="photo-bg relative block h-[230px] rounded-[18px] overflow-hidden">
        {p.hasDeal && (
          <span className="absolute top-3 left-3 z-[1] bg-brand text-white text-xs px-[10px] py-1 rounded-full">{p.badge}</span>
        )}
        <Image src={imageSrc(p.image)} alt={p.name} fill sizes="(max-width: 600px) 100vw, (max-width: 1200px) 45vw, 380px" className="object-cover" />
      </Link>
      <div className="flex justify-between items-start gap-2">
        <div>
          <div className="font-serif font-medium text-[22px] leading-[1.15]">{p.name}</div>
          <div className="text-xs text-muted mt-1">{p.type} · {p.note}</div>
        </div>
        <button
          onClick={() => toggleFav(p.id)}
          aria-label={isFav ? 'Remove from wishlist' : 'Add to wishlist'}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-accent"
        >
          <Heart size={22} strokeWidth={1.6} fill={isFav ? 'currentColor' : 'none'} aria-hidden />
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div className="font-medium text-[18px]">
          ${p.price} {p.hasDeal && <s className="text-[13px] text-muted font-normal">${p.was}</s>}
        </div>
        <button
          onClick={() => addToCart([p.id], p.name)}
          className="px-5 py-3 min-h-[44px] rounded-full bg-ink text-white text-[13px] tracking-[.5px] transition-transform"
        >
          Add to bag
        </button>
      </div>
    </div>
  );
}
