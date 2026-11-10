'use client';

import { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { SEED_REVIEWS } from '@/data/site';
import { reviewStats, starText, trim } from '@/lib/utils';

const ERR = 'text-error text-xs';

// Reviews header, "Write a review" form and review list
export default function ReviewSection({ productId }) {
  const { reviews, pro, addReview } = useStore();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [rv, setRv] = useState({ name: '', rating: 0, text: '' });
  const [errs, setErrs] = useState({});

  const list = [...(reviews[productId] || []), ...SEED_REVIEWS];
  const { avg, count } = reviewStats(list);

  const change = (k, v) => {
    setRv((r) => ({ ...r, [k]: v }));
    setErrs((e) => ({ ...e, [k]: '' }));
  };
  const start = () => {
    setOpen(true);
    setDone(false);
    setRv({ name: pro.name, rating: 0, text: '' });
    setErrs({});
  };
  const cancel = () => {
    setOpen(false);
    setErrs({});
  };
  const submit = () => {
    const e = {};
    if (!trim(rv.name)) e.name = 'Please enter your name';
    if (!(rv.rating >= 1)) e.rating = 'Please choose a star rating';
    if (trim(rv.text).length < 10) e.text = 'Please write at least 10 characters';
    if (Object.keys(e).length) return setErrs(e);
    addReview(productId, { rating: rv.rating, text: trim(rv.text), name: trim(rv.name), date: 'Just now' });
    setOpen(false);
    setDone(true);
    setErrs({});
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 mt-14 mb-5">
        <div>
          <h2 className="text-[40px]">Reviews</h2>
          <div className="mut">★ {avg} · {count} reviews</div>
        </div>
        <button className="btn2" onClick={start}>Write a review</button>
      </div>

      {done && <p className="text-success mb-4">Thank you! Your review has been added.</p>}

      {open && (
        <div className="glass fx p-[clamp(20px,4vw,32px)] mb-6 flex flex-col gap-[10px] max-w-[640px]">
          <h3 className="text-[28px]">Share your experience</h3>
          <label htmlFor="rv_name" className="mut">Your name *</label>
          <input id="rv_name" className={`inp ${errs.name ? '!border-error' : ''}`} value={rv.name} onChange={(e) => change('name', e.target.value)} required aria-required="true" />
          {errs.name && <div className={ERR}>{errs.name}</div>}
          <div className="mut">Your rating *</div>
          <div className="flex gap-[2px]">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => change('rating', n)}
                aria-pressed={rv.rating === n}
                aria-label={n + (n === 1 ? ' star' : ' stars')}
                className={`w-11 h-11 text-[26px] transition-transform ${rv.rating >= n ? 'text-accent' : 'text-[#c9bfb4]'}`}
              >★</button>
            ))}
          </div>
          {errs.rating && <div className={ERR}>{errs.rating}</div>}
          <label htmlFor="rv_text" className="mut">Your review *</label>
          <textarea id="rv_text" className={`inp ${errs.text ? '!border-error' : ''}`} rows={4} value={rv.text} onChange={(e) => change('text', e.target.value)} required aria-required="true" placeholder="How does it feel, and how do you use it?" />
          {errs.text && <div className={ERR}>{errs.text}</div>}
          <div className="flex gap-[10px] flex-wrap">
            <button className="btn" onClick={submit}>Submit review</button>
            <button className="btn2" onClick={cancel}>Cancel</button>
          </div>
        </div>
      )}

      <div className="g3">
        {list.map((r, i) => (
          <div key={i} className="glass hov p-6">
            <div className="text-accent tracking-[2px]">{starText(r.rating)}</div>
            <p className="mut">{r.text}</p>
            <b className="text-[13px]">{r.name}</b> <span className="mut text-xs">· {r.date}</span>
          </div>
        ))}
      </div>
    </>
  );
}
