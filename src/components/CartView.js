'use client';

import Link from 'next/link';
import CartRow from './CartRow';
import CheckoutForm from './CheckoutForm';
import PageShell from './PageShell';
import { useStore } from '@/context/StoreContext';
import { getProduct } from '@/lib/products';

// Order confirmation shown after "Place order"
function OrderDone({ last, hasRemain, onBack }) {
  return (
    <div className="glass p-[clamp(24px,5vw,48px)] max-w-[640px]">
      <div className="eye">Order confirmed</div>
      <h2 className="text-[44px] my-2">Thank you, {last.name}.</h2>
      <p className="mut">Order {last.id} · {last.n} item(s) · ${last.total} total. We will deliver to {last.addr} and send a confirmation to {last.email}.</p>
      <div className="flex gap-3 flex-wrap">
        <Link href="/shop" className="btn">Continue shopping</Link>
        {hasRemain && <button className="btn2" onClick={onBack}>Back to bag</button>}
        <Link href="/account" className="btn2">View orders</Link>
      </div>
    </div>
  );
}

export default function CartView() {
  const { cart, off, last, clearLast, setSelection } = useStore();

  const ids = Object.keys(cart).filter((k) => cart[k] > 0);
  const rows = ids.map((id) => {
    const p = getProduct(id);
    return { id, name: p.name, price: p.price, note: p.note, qty: cart[id], line: p.price * cart[id], on: !off[id] };
  });
  const selected = rows.filter((r) => r.on);
  const sub = selected.reduce((a, r) => a + r.line, 0);
  const ship = sub === 0 || sub >= 75 ? 0 : 6;
  const anyOff = rows.some((r) => !r.on);

  return (
    <PageShell title="Your bag">
      {last ? (
        <OrderDone last={last} hasRemain={ids.length > 0} onBack={clearLast} />
      ) : (
        <div className="flex flex-wrap gap-8">
          <div className="glass flex-[1_1_440px] p-6 self-start">
            {rows.length === 0 ? (
              <p className="mut">Your bag is empty. <Link href="/shop" className="nav underline">Continue shopping</Link></p>
            ) : (
              <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
                <b>Choose what to order</b>
                <button className="chip" onClick={() => setSelection(ids, anyOff)}>{anyOff ? 'Select all' : 'Clear all'}</button>
              </div>
            )}
            {rows.map((r) => (
              <CartRow key={r.id} row={r} />
            ))}
          </div>
          <CheckoutForm selected={selected} sub={sub} ship={ship} />
        </div>
      )}
    </PageShell>
  );
}
