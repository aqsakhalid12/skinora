'use client';

import Link from 'next/link';
import PageShell from './PageShell';
import ProductGrid from './ProductGrid';
import { useStore } from '@/context/StoreContext';
import { ALL_PRODUCTS } from '@/lib/products';

// Score: concern x3 + product type x2 + goal x2, top 3 shown
const score = (p, a) => (p.con.includes(a.concern) ? 3 : 0) + (p.type === a.type ? 2 : 0) + (p.goal.includes(a.goal) ? 2 : 0);

export default function QuizResults() {
  const { ans, setAns } = useStore();
  const picks = ALL_PRODUCTS.map((p) => ({ p, sc: score(p, ans) }))
    .sort((a, b) => b.sc - a.sc)
    .slice(0, 3)
    .map((x) => x.p);
  const summary = [ans.concern, ans.type, ans.goal].filter(Boolean).join(' · ') || 'all products';

  return (
    <PageShell>
      <div className="eye">Your personalised edit</div>
      <h1 className="text-[56px] my-2">Picked for you</h1>
      <p className="mut">Based on: {summary}. This is product inspiration, not medical advice.</p>
      <div className="mt-4 mb-7">
        <Link href="/quiz" className="btn2" onClick={() => setAns({})}>Retake quiz</Link>
      </div>
      <ProductGrid products={picks} />
    </PageShell>
  );
}
