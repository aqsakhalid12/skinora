"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import ProductGrid from "./ProductGrid";
import ProductPhotoPanel from "./ProductPhotoPanel";
import { useStore } from "@/context/StoreContext";
import { imageSrc } from "@/lib/products";

// Deal page: set photo, price, what is inside, add to bag / wishlist
export default function DealView({ bundle: b, products }) {
  const { fav, toggleFavMany, addToCart } = useStore();
  const allSaved = b.ids.every((id) => fav[id]);

  return (
    <div className="wrap sec fx pt-4">
      <div className="flex flex-wrap gap-10">
        <div className="flex-[1_1_400px]">
          <ProductPhotoPanel src={imageSrc(b.image)} alt={b.name} />
        </div>

        <div className="flex-[1_1_400px]">
          <div className="eye">Set · {products.length} products</div>
          <h1 className="text-[56px] my-2">{b.name}</h1>
          <div className="flex items-center gap-[10px] flex-wrap text-[22px]">
            <b>${b.now}</b>
            <s className="mut text-base">${b.was}</s>
            <span className="bg-brand text-white text-xs px-[10px] py-1 rounded-full">
              Save ${b.save}
            </span>
          </div>
          <p className="mut my-[18px]">{b.desc}</p>
          <div className="flex gap-3 flex-wrap">
            <button className="btn" onClick={() => addToCart(b.ids, b.name)}>
              Add set to bag
            </button>
            <button
              className="btn2 gap-2"
              onClick={() => toggleFavMany(b.ids, b.name)}
            >
              <Heart
                size={18}
                strokeWidth={1.6}
                fill={allSaved ? "currentColor" : "none"}
                aria-hidden
              />{" "}
              Wishlist
            </button>
          </div>

          <div className="glass p-6 mt-7">
            <h3 className="text-[24px] mb-1">What is inside</h3>
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.id}`}
                className="flex justify-between items-center gap-3 py-3 border-b border-[rgba(31,27,24,.1)] last:border-0"
              >
                <span>
                  <b>{p.name}</b>
                  <span className="mut block text-[13px]">
                    {p.type} · {p.note}
                  </span>
                </span>
                <span className="font-medium">${p.price}</span>
              </Link>
            ))}
            <p className="mut text-[13px] mb-0">
              Set price ${b.now} instead of ${b.was} when bought together.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-[40px] mt-14 mb-5">Products in this set</h2>
      <ProductGrid products={products} />
    </div>
  );
}
