import { PRODUCTS, DEALS, BUNDLES } from '@/data/products';

// Sale price after the deal percentage
const dealPrice = (p) => (DEALS[p.id] ? Math.round(p.price * (1 - DEALS[p.id] / 100)) : p.price);

// Product with sale fields (price = current price, was = original price)
export const withDeal = (p) => ({
  ...p,
  price: dealPrice(p),
  was: p.price,
  hasDeal: !!DEALS[p.id],
  badge: '-' + (DEALS[p.id] || 0) + '%',
});

export const ALL_PRODUCTS = PRODUCTS.map(withDeal);
export const getProduct = (id) => ALL_PRODUCTS.find((p) => p.id === id);
export const getProducts = (ids) => ids.map(getProduct);

// Bundle with combined prices
export const getBundles = () =>
  BUNDLES.map((b) => {
    const ps = getProducts(b.ids);
    const was = ps.reduce((a, p) => a + p.was, 0);
    const now = ps.reduce((a, p) => a + p.price, 0);
    return { ...b, blurb: ps.map((p) => p.name).join(' + '), was, now, save: was - now };
  });

export const getBundle = (slug) => getBundles().find((b) => b.slug === slug);

export const imageSrc = (file) => `/images/${file}`;