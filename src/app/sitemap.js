import { BUNDLES } from "@/data/products";
import { ALL_PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/utils";

export default function sitemap() {
  const pages = ["", "/shop", "/quiz", "/about"].map((p) => ({
    url: `${SITE_URL}${p}`,
  }));
  const products = ALL_PRODUCTS.map((p) => ({
    url: `${SITE_URL}/product/${p.id}`,
  }));
  const deals = BUNDLES.map((b) => ({ url: `${SITE_URL}/deals/${b.slug}` }));
  return [...pages, ...deals, ...products];
}
