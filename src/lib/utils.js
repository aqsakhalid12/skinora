export const trim = (x) => (x || '').trim();
export const isEmail = (x) => /^\S+@\S+\.\S+$/.test(trim(x));
export const digits = (x) => trim(x).replace(/\D/g, '').length;

// Star text, e.g. ★★★★☆
export const starText = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

// Average rating + count for a list of reviews
export const reviewStats = (list) => ({
  count: list.length,
  avg: (list.reduce((a, r) => a + r.rating, 0) / list.length).toFixed(1),
});

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://skinora.vercel.app';
