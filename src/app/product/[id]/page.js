import { notFound } from 'next/navigation';
import ProductView from '@/components/ProductView';
import { ALL_PRODUCTS, getProduct, imageSrc } from '@/lib/products';

// Pre-build one page per product
export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) return {};
  const title = `${p.name} | ${p.type}`;
  return {
    title,
    description: p.desc,
    alternates: { canonical: `/product/${p.id}` },
    openGraph: { title, description: p.desc, images: [{ url: imageSrc(p.image), alt: p.name }] },
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const p = getProduct(id);
  if (!p) notFound();
  return <ProductView key={p.id} product={p} />;
}
