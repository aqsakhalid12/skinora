'use client';

import { useState } from 'react';
import { FAQS } from '@/data/site';

// FAQ accordion, one item open at a time
export default function FaqList() {
  const [open, setOpen] = useState(-1);
  return (
    <>
      {FAQS.map(([q, a], i) => (
        <div key={q} className="border-b border-[rgba(31,27,24,.1)]">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            className="w-full text-left py-[14px] min-h-[44px] font-medium"
          >
            {q}
          </button>
          {open === i && <p className="mut mt-0 mb-[14px]">{a}</p>}
        </div>
      ))}
    </>
  );
}
