'use client';

import { Check, Minus, Plus, X } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

// One line in the bag: select tick, name, qty, line price, remove
export default function CartRow({ row: r }) {
  const { toggleSelected, changeQty, removeItem } = useStore();
  return (
    <div className={`flex flex-wrap items-center gap-3 py-[14px] border-b border-[rgba(31,27,24,.1)] transition-opacity duration-300 ${r.on ? 'opacity-100' : 'opacity-50'}`}>
      <button
        onClick={() => toggleSelected(r.id)}
        aria-pressed={r.on}
        aria-label={(r.on ? 'Exclude ' : 'Include ') + r.name + ' in this order'}
        className={`w-11 h-11 rounded-xl text-white border-2 border-ink flex items-center justify-center ${r.on ? 'bg-ink' : 'bg-transparent'}`}
      >
        {r.on && <Check size={18} strokeWidth={2} aria-hidden />}
      </button>
      <div className="flex-[1_1_120px]">
        <b>{r.name}</b>
        <div className="mut text-[13px]">${r.price} · {r.note}</div>
      </div>
      <div className="flex items-center gap-2">
        <button className="chip" onClick={() => changeQty(r.id, -1)} aria-label="Decrease quantity"><Minus size={16} aria-hidden /></button>
        <span>{r.qty}</span>
        <button className="chip" onClick={() => changeQty(r.id, 1)} aria-label="Increase quantity"><Plus size={16} aria-hidden /></button>
      </div>
      <b className="min-w-[48px] text-right">${r.line}</b>
      <button className="ic" onClick={() => removeItem(r.id)} aria-label={`Remove ${r.name}`}><X size={18} aria-hidden /></button>
    </div>
  );
}
