'use client';

import { useState } from 'react';
import Chip from './Chip';
import { useStore } from '@/context/StoreContext';
import { CHECKOUT_FIELDS, PAYMENTS } from '@/data/site';
import { digits, isEmail, trim } from '@/lib/utils';

const ERR = 'text-error text-xs';

// Delivery details, payment choice, totals and "Place order"
export default function CheckoutForm({ selected, sub, ship }) {
  const { form, setField, placeOrder } = useStore();
  const [errs, setErrs] = useState({});
  const [pay, setPay] = useState('Card');
  const total = sub + ship;

  const place = () => {
    const e = {};
    if (!trim(form.name)) e.name = 'Please enter your full name';
    if (!isEmail(form.email)) e.email = 'Please enter a valid email';
    if (digits(form.phone) < 7) e.phone = 'Please enter a valid phone number';
    if (!trim(form.addr)) e.addr = 'Please enter your shipping address';
    if (!trim(form.city)) e.city = 'Please enter your city';
    if (!trim(form.zip)) e.zip = 'Please enter your postcode';
    if (!selected.length) e.items = 'Select at least one product to order';
    if (Object.keys(e).length) return setErrs(e);
    setErrs({});
    placeOrder(selected, total);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="glass flex-[1_1_340px] p-7 flex flex-col gap-[10px]">
      <h3 className="text-[28px]">Delivery details</h3>
      {CHECKOUT_FIELDS.map(([k, label, type, ph]) => (
        <div key={k} className="flex flex-col gap-[6px]">
          <label htmlFor={`f_${k}`} className="mut">{label} *</label>
          <input
            id={`f_${k}`} type={type} placeholder={ph} value={form[k]} required aria-required="true"
            className={`inp ${errs[k] ? '!border-error' : ''}`}
            onChange={(ev) => {
              setField(k, ev.target.value);
              setErrs((x) => ({ ...x, [k]: '' }));
            }}
          />
          {errs[k] && <div className={ERR}>{errs[k]}</div>}
        </div>
      ))}
      <div className="mut">Payment</div>
      <div className="flex gap-2 flex-wrap">
        {PAYMENTS.map((c) => (
          <Chip key={c} active={pay === c} onClick={() => setPay(c)}>{c}</Chip>
        ))}
      </div>
      <div className="flex justify-between"><span className="mut">{selected.length} item(s) selected</span>${sub}</div>
      <div className="flex justify-between"><span className="mut">Shipping (free over $75)</span>${ship}</div>
      <div className="flex justify-between text-[20px]"><b>Total</b><b>${total}</b></div>
      {errs.items && <div className="text-error text-[13px]">{errs.items}</div>}
      <button className="btn" onClick={place}>Place order</button>
      <p className="mut text-xs m-0">Fields marked * are required. Only selected items are ordered; the rest stay in your bag.</p>
    </div>
  );
}
