import { notFound } from 'next/navigation';
import DealView from '@/components/DealView';
import { BUNDLES } from '@/data/products';
import { getBundle, getProducts, imageSrc } from '@/lib/products';

// Pre-build one page per bundle
export function generateStaticParams() {
  return BUNDLES.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const b = getBundle(slug);
  if (!b) return {};
  const title = `${b.name} set`;
  return {
    title,
    description: `${b.desc} Save $${b.save} when bought together.`,
    alternates: { canonical: `/deals/${b.slug}` },
    openGraph: { title, description: b.desc, images: [{ url: imageSrc(b.image), alt: b.name }] },
  };
}

export default async function DealPage({ params }) {
  const { slug } = await params;
  const b = getBundle(slug);
  if (!b) notFound();
  return <DealView key={b.slug} bundle={b} products={getProducts(b.ids)} />;
}