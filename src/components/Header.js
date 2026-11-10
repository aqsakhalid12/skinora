'use client';

import Link from 'next/link';
import { Heart, Menu, ShoppingBag, User, X } from 'lucide-react';
import Logo from './Logo';
import { NAV_MAIN } from '@/data/site';
import { useStore } from '@/context/StoreContext';

const ICON = { size: 22, strokeWidth: 1.6, 'aria-hidden': true };

// Icon link with optional count badge
function IconLink({ href, label, count, onClick, children }) {
  return (
    <Link href={href} className="ic" aria-label={label} onClick={onClick}>
      {children}
      {count > 0 && <span className="bd">{count}</span>}
    </Link>
  );
}

export default function Header() {
  const { menuOpen, toggleMenu, closeMenu, clearLast, favCount, cartCount } = useStore();
  const leave = () => {
    closeMenu();
    clearLast();
  };

  return (
    <>
      <div className="wrap flex items-center justify-between gap-2 py-[14px]">
        <button className="ic bgr" onClick={toggleMenu} aria-label="Menu" aria-expanded={menuOpen}>
          {menuOpen ? <X {...ICON} /> : <Menu {...ICON} />}
        </button>
        <Logo onClick={leave} />
        <nav className="dl" aria-label="Main">
          {NAV_MAIN.map((n) => (
            <Link key={n.label} href={n.href} className="nav" onClick={leave}>{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-[2px]">
          <IconLink href="/wishlist" label="Wishlist" count={favCount} onClick={leave}><Heart {...ICON} /></IconLink>
          <IconLink href="/cart" label="Shopping bag" count={cartCount} onClick={leave}><ShoppingBag {...ICON} /></IconLink>
          <IconLink href="/account" label="My account" onClick={leave}><User {...ICON} /></IconLink>
        </div>
      </div>

      {menuOpen && (
        <div className="wrap fx">
          <div className="glass p-[10px] flex flex-col">
            {NAV_MAIN.map((n) => (
              <Link key={n.label} href={n.href} className="nav !text-[16px]" onClick={leave}>{n.label}</Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
