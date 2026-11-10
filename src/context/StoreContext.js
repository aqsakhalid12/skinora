"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_PROFILE, EMPTY_FORM, SEED_ORDERS } from "@/data/site";
import { trim } from "@/lib/utils";

const StoreContext = createContext(null);
const STORAGE_KEY = "skinora-store-v1";

// Client store: bag, wishlist, profile, orders, reviews, quiz answers, toast
export function StoreProvider({ children }) {
  const [cart, setCart] = useState({});
  const [off, setOff] = useState({}); // ids excluded from the current order
  const [fav, setFav] = useState({ p2: 1 });
  const [pro, setPro] = useState(DEFAULT_PROFILE);
  const [orders, setOrders] = useState(SEED_ORDERS);
  const [reviews, setReviews] = useState({});
  const [form, setFormState] = useState(EMPTY_FORM);
  const [ans, setAns] = useState({});
  const [last, setLast] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [ready, setReady] = useState(false);
  const timer = useRef(null);
  const pathname = usePathname();

  // Load saved data once in the browser
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (s.cart) setCart(s.cart);
      if (s.off) setOff(s.off);
      if (s.fav) setFav(s.fav);
      if (s.pro) setPro(s.pro);
      if (s.orders) setOrders(s.orders);
      if (s.reviews) setReviews(s.reviews);
      if (s.form) setFormState(s.form);
    } catch {}
    setReady(true);
  }, []);

  // Save on every change (after the first load)
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cart, off, fav, pro, orders, reviews, form }),
      );
    } catch {}
  }, [ready, cart, off, fav, pro, orders, reviews, form]);

  // Close the menu and the order confirmation when the page changes
  useEffect(() => {
    setMenuOpen(false);
    setLast(null);
  }, [pathname]);

  const notify = useCallback((text) => {
    setToastMsg(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(""), 1800);
  }, []);

  // Add one or more products to the bag
  const addToCart = (ids, label) => {
    setCart((c) => {
      const x = { ...c };
      ids.forEach((i) => (x[i] = (x[i] || 0) + 1));
      return x;
    });
    setOff((o) => {
      const x = { ...o };
      ids.forEach((i) => (x[i] = false));
      return x;
    });
    notify(label + " added to bag");
  };

  const changeQty = (id, delta) =>
    setCart((c) => {
      const x = { ...c };
      const q = (x[id] || 1) + delta;
      if (q < 1) delete x[id];
      else x[id] = q;
      return x;
    });
  const removeItem = (id) =>
    setCart((c) => {
      const x = { ...c };
      delete x[id];
      return x;
    });
  const toggleSelected = (id) => setOff((o) => ({ ...o, [id]: !o[id] }));
  const setSelection = (ids, selectAll) =>
    setOff(selectAll ? {} : Object.fromEntries(ids.map((i) => [i, true])));

  const toggleFav = (id) =>
    setFav((f) => {
      const x = { ...f };
      if (x[id]) delete x[id];
      else x[id] = 1;
      return x;
    });
  // Save (or remove) a whole set in the wishlist
  const toggleFavMany = (ids, label) => {
    const all = ids.every((i) => fav[i]);
    setFav((f) => {
      const x = { ...f };
      ids.forEach((i) => (all ? delete x[i] : (x[i] = 1)));
      return x;
    });
    notify(label + (all ? " removed from wishlist" : " saved to wishlist"));
  };

  const setField = (k, v) => setFormState((f) => ({ ...f, [k]: v }));

  // Saving the profile also prefills empty checkout fields
  const saveProfile = (np) => {
    setPro(np);
    setFormState((f) => ({
      ...f,
      name: f.name || np.name,
      email: f.email || np.email,
      phone: f.phone || np.phone,
      addr: f.addr || np.addr,
    }));
  };

  const addReview = (pid, rv) =>
    setReviews((r) => ({ ...r, [pid]: [rv, ...(r[pid] || [])] }));

  // Place an order with the selected rows
  const placeOrder = (rows, total) => {
    const n = rows.reduce((a, r) => a + r.qty, 0);
    const id = "#SK-" + (1052 + orders.filter((o) => o.fresh).length);
    removeRows(rows);
    setLast({
      id,
      n,
      total,
      name: trim(form.name),
      email: trim(form.email),
      addr: trim(form.addr) + ", " + trim(form.city),
    });
    setFormState(EMPTY_FORM);
    setOrders((o) => [
      {
        id,
        date: "Today",
        n,
        total,
        status: "Processing",
        fresh: 1,
        who: trim(form.name),
      },
      ...o,
    ]);
  };
  const removeRows = (rows) =>
    setCart((c) => {
      const x = { ...c };
      rows.forEach((r) => delete x[r.id]);
      return x;
    });

  const value = {
    cart,
    off,
    fav,
    pro,
    orders,
    reviews,
    form,
    ans,
    last,
    menuOpen,
    toastMsg,
    cartCount: Object.values(cart).reduce((a, b) => a + b, 0),
    favCount: Object.keys(fav).length,
    addToCart,
    changeQty,
    removeItem,
    toggleSelected,
    setSelection,
    toggleFav,
    toggleFavMany,
    setField,
    saveProfile,
    addReview,
    placeOrder,
    setAns,
    clearLast: () => setLast(null),
    closeMenu: () => setMenuOpen(false),
    toggleMenu: () => setMenuOpen((m) => !m),
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
