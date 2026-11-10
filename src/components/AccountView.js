'use client';

import { useState } from 'react';
import DataTable from './DataTable';
import PageShell from './PageShell';
import { useStore } from '@/context/StoreContext';
import { PROFILE_FIELDS } from '@/data/site';
import { digits, isEmail, trim } from '@/lib/utils';

// Profile card (view + inline edit) and order history
export default function AccountView() {
  const { pro, orders, saveProfile } = useStore();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [draft, setDraft] = useState(pro);
  const [errs, setErrs] = useState({});

  const initials = pro.name.split(' ').map((w) => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'U';

  const startEdit = () => {
    setEditing(true);
    setSaved(false);
    setDraft({ ...pro });
    setErrs({});
  };
  const cancel = () => {
    setEditing(false);
    setErrs({});
  };
  const save = () => {
    const e = {};
    if (!trim(draft.name)) e.name = 'Please enter your name';
    if (!isEmail(draft.email)) e.email = 'Please enter a valid email';
    if (trim(draft.phone) && digits(draft.phone) < 7) e.phone = 'Please enter a valid phone number';
    if (Object.keys(e).length) return setErrs(e);
    saveProfile({ name: trim(draft.name), email: trim(draft.email), phone: trim(draft.phone), addr: trim(draft.addr) });
    setEditing(false);
    setSaved(true);
    setErrs({});
  };

  return (
    <PageShell title="My account">
      <div className="flex flex-wrap gap-6">
        <div className="glass flex-[1_280px] p-7 self-start">
          <div className="w-14 h-14 rounded-full bg-[linear-gradient(135deg,#f0b894,#a8715a)] text-white flex items-center justify-center font-serif font-medium text-[22px] mb-[14px]">
            {initials}
          </div>
          {!editing ? (
            <>
              <h3 className="text-[28px]">{pro.name}</h3>
              <p className="mut">
                {pro.email}<br />{pro.phone || 'No phone added'}<br />{pro.addr || 'No address added'}<br />Member since 2025 · 240 Orchid points
              </p>
              <button className="btn2" onClick={startEdit}>Edit profile</button>
              {saved && <p className="text-success mt-3 mb-0">Profile updated. Your details will prefill checkout.</p>}
            </>
          ) : (
            <div className="flex flex-col gap-[10px]">
              <h3 className="text-[26px]">Edit profile</h3>
              {PROFILE_FIELDS.map(([k, label, type, ph, star]) => (
                <div key={k} className="flex flex-col gap-[6px]">
                  <label htmlFor={`p_${k}`} className="mut">{label}{star}</label>
                  <input
                    id={`p_${k}`} type={type} placeholder={ph} value={draft[k]}
                    className={`inp ${errs[k] ? '!border-error' : ''}`}
                    onChange={(ev) => {
                      setDraft((d) => ({ ...d, [k]: ev.target.value }));
                      setErrs((x) => ({ ...x, [k]: '' }));
                    }}
                  />
                  {errs[k] && <div className="text-error text-xs">{errs[k]}</div>}
                </div>
              ))}
              <div className="flex gap-[10px] flex-wrap">
                <button className="btn" onClick={save}>Save changes</button>
                <button className="btn2" onClick={cancel}>Cancel</button>
              </div>
            </div>
          )}
        </div>

        <div className="glass flex-[3_1_480px] p-7 overflow-x-auto">
          <h3 className="text-[28px] mb-[10px]">Order history</h3>
          <DataTable
            columns={['Order', 'Date', 'Items', 'Total', 'Status']}
            rows={orders.map((o) => [o.id, o.date, o.n, `$${o.total}`, o.status])}
          />
        </div>
      </div>
    </PageShell>
  );
}
