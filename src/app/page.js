import Link from "next/link";
import Hero from "@/components/Hero";
import BundleCard from "@/components/BundleCard";
import ProductGrid from "@/components/ProductGrid";
import SectionTitle from "@/components/SectionTitle";
import { DEAL_CARD_IDS, FEATURED_IDS } from "@/data/products";
import { RITUALS } from "@/data/site";
import { getBundles, getProducts } from "@/lib/products";

export const metadata = {
  title: { absolute: "SKINORA | Skincare & Beauty Store" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="wrap sec fx">
        <SectionTitle eyebrow="Seasonal offers">Deals &amp; sets</SectionTitle>
        <div className="flex flex-wrap gap-6">
          {getBundles().map((b, i) => (
            <BundleCard key={b.name} bundle={b} priority={i === 0} />
          ))}
        </div>
        <ProductGrid products={getProducts(DEAL_CARD_IDS)} className="mt-6" />
        <div className="mt-6">
          <Link href="/shop?cat=On%20sale" className="btn2">
            See all offers
          </Link>
        </div>
      </section>

      <section className="wrap sec fx">
        <SectionTitle eyebrow="Bestsellers">Featured products</SectionTitle>
        <ProductGrid products={getProducts(FEATURED_IDS)} />
      </section>

      <section className="wrap">
        <h2 className="text-[44px] mb-6">Shop by ritual</h2>
        <div className="g4">
          {RITUALS.map(([label, cat]) => (
            <Link
              key={cat}
              href={`/shop?cat=${encodeURIComponent(cat)}`}
              className="glass hov block px-5 py-9 text-left text-ink !rounded-3xl"
            >
              <div className="font-serif font-medium text-[28px]">{label}</div>
              <div className="mut text-[13px] mt-[6px]">Explore →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="wrap sec fx">
        <div className="glass p-[clamp(24px,5vw,56px)] flex flex-wrap gap-10">
          <div className="flex-[1_1_300px]">
            <div className="eye">Our story</div>
            <h2 className="text-[48px] mt-[10px]">
              Quiet luxury for everyday skin.
            </h2>
          </div>
          <p className="mut flex-[1_1_340px] text-[16px]">
            SKINORA was founded on a simple idea: skincare should be considered,
            not complicated. Every formula is developed with
            dermatology-informed ingredient science, housed in recyclable glass,
            and finished with a sensorial texture you look forward to.
          </p>
        </div>
      </section>
    </>
  );
}
