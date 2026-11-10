"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { imageSrc } from "@/lib/products";

// Product set with combined price. Image and title open the deal page.
// Mobile (<600px): cropped photo, 200px high. Desktop: taller box + slight vertical squeeze so less is cut.
export default function BundleCard({ bundle: b, priority = false }) {
  const { addToCart } = useStore();
  const href = `/deals/${b.slug}`;
  return (
    <div className="glass hov flex-[1_1_320px] min-w-0 p-5 flex flex-col gap-3">
      <Link
        href={href}
        aria-label={`${b.name} details`}
        className="photo-bg-b relative block h-[200px] min-[600px]:h-[340px] rounded-[18px] overflow-hidden"
      >
        <Image
          src={imageSrc(b.image)}
          alt={b.name}
          fill
          priority={priority}
          sizes="(max-width: 600px) 90vw, 560px"
          className="object-cover min-[600px]:scale-y-[.85]"
        />
      </Link>
      <Link
        href={href}
        className="font-serif font-medium text-[28px] leading-[1.1]"
      >
        {b.name}
      </Link>
      <div className="mut text-[13px]">{b.blurb}</div>
      <div className="flex items-center gap-[10px] flex-wrap">
        <b className="text-[20px]">${b.now}</b>
        <s className="mut">${b.was}</s>
        <span className="bg-brand text-white text-xs px-[10px] py-1 rounded-full">
          Save ${b.save}
        </span>
      </div>
      <button className="btn" onClick={() => addToCart(b.ids, b.name)}>
        Add set to bag
      </button>
    </div>
  );
}
