"use client";

import { Heart } from "lucide-react";
import ProductPhotoPanel from "./ProductPhotoPanel";
import ReviewSection from "./ReviewSection";
import { useStore } from "@/context/StoreContext";
import { SEED_REVIEWS } from "@/data/site";
import { imageSrc } from "@/lib/products";
import { reviewStats } from "@/lib/utils";

// Product detail: photo panel, price, benefits, reviews
export default function ProductView({ product: p }) {
  const { fav, toggleFav, addToCart, reviews } = useStore();
  const isFav = !!fav[p.id];
  const { avg, count } = reviewStats([
    ...(reviews[p.id] || []),
    ...SEED_REVIEWS,
  ]);

  return (
    <div className="wrap sec fx pt-4">
      <div className="flex flex-wrap gap-10">
        <div className="flex-[1_1_400px]">
          <ProductPhotoPanel src={imageSrc(p.image)} alt={p.name} />
        </div>

        <div className="flex-[1_1_400px]">
          <div className="eye">{p.type}</div>
          <h1 className="text-[56px] my-2">{p.name}</h1>
          <div className="text-[22px]">
            ${p.price}{" "}
            {p.hasDeal && (
              <>
                <s className="mut text-base">${p.was}</s>{" "}
                <span className="bg-brand text-white text-xs px-[10px] py-1 rounded-full align-middle">
                  {p.badge}
                </span>
              </>
            )}{" "}
            <span className="mut text-sm">
              · {p.note} · ★ {avg} ({count} reviews)
            </span>
          </div>
          <p className="mut my-[18px]">{p.desc}</p>
          <div className="flex gap-3 flex-wrap">
            <button className="btn" onClick={() => addToCart([p.id], p.name)}>
              Add to bag
            </button>
            <button className="btn2 gap-2" onClick={() => toggleFav(p.id)}>
              <Heart
                size={18}
                strokeWidth={1.6}
                fill={isFav ? "currentColor" : "none"}
                aria-hidden
              />{" "}
              Wishlist
            </button>
          </div>
          <div className="glass p-6 mt-7">
            <h3 className="text-[24px]">Benefits</h3>
            <p className="mut">
              Visibly supports a soft, hydrated-looking finish. Lightweight,
              non-greasy feel. Fragrance-free.
            </p>
            <h3 className="text-[24px] mt-[14px]">Key ingredients</h3>
            <p className="mut">{p.ing}</p>
            <h3 className="text-[24px] mt-[14px]">How to use</h3>
            <p className="mut">
              Apply 2–3 drops or a pea-sized amount to clean skin, morning and
              evening. Patch-test before first use.
            </p>
          </div>
        </div>
      </div>
      <ReviewSection productId={p.id} />
    </div>
  );
}
