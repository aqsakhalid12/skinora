// Static site content: navigation, categories, quiz, FAQ, seed/demo data

export const NAV_MAIN = [
  { label: 'Shop', href: '/shop' },
  { label: 'Deals', href: '/shop?cat=On%20sale' },
  { label: 'Skin Finder', href: '/quiz' },
  { label: 'About', href: '/about' },
];

export const SHOP_CATEGORIES = ['All', 'Cleanser', 'Serum', 'Moisturizer', 'Sunscreen', 'Oil', 'Toner', 'Mask', 'Eye care', 'Body', 'Lip', 'On sale'];
export const SORTS = ['Featured', 'Price ↑', 'Price ↓'];
export const PAYMENTS = ['Card', 'Cash on delivery'];

// [label, category]
export const RITUALS = [
  ['Cleanse', 'Cleanser'], ['Treat', 'Serum'], ['Hydrate', 'Moisturizer'],
  ['Protect', 'Sunscreen'], ['Refresh', 'Toner'], ['Purify', 'Mask'],
];

export const QUIZ = [
  { k: 'concern', t: 'What is your main skin concern?', o: ['Dryness', 'Dullness', 'Breakouts', 'Fine lines', 'Sensitivity'] },
  { k: 'type', t: 'Which product type do you prefer?', o: ['Cleanser', 'Serum', 'Moisturizer', 'Sunscreen', 'Oil', 'Toner', 'Mask', 'Eye care'] },
  { k: 'goal', t: 'What is your skincare goal?', o: ['Hydrated glow', 'Even tone', 'Clearer-looking skin', 'Smoother look', 'Calm comfort'] },
];

export const FAQS = [
  ['How long does shipping take?', 'Standard delivery takes 2–5 business days.'],
  ['What is your returns policy?', 'Unopened products can be returned within 30 days.'],
  ['Is the skin finder a diagnosis?', 'No. It suggests products based on your preferences and is not medical advice.'],
  ['Are products fragrance-free?', 'Our core range is fragrance-free; see each product page for ingredients.'],
];

export const VALUES = [
  ['Considered', 'Every ingredient has a purpose.'],
  ['Sustainable', 'Recyclable glass and refillable jars.'],
  ['Cruelty-free', 'Never tested on animals.'],
];

// [key, label, input type, placeholder]
export const CHECKOUT_FIELDS = [
  ['name', 'Full name', 'text', 'Your full name'],
  ['email', 'Email', 'email', 'you@example.com'],
  ['phone', 'Phone', 'tel', '+1 555 000 0000'],
  ['addr', 'Shipping address', 'text', 'Street and number'],
  ['city', 'City', 'text', 'City'],
  ['zip', 'Postcode', 'text', 'Postcode'],
];

// [key, label, input type, placeholder, required star]
export const PROFILE_FIELDS = [
  ['name', 'Full name', 'text', 'Your full name', ' *'],
  ['email', 'Email', 'email', 'you@example.com', ' *'],
  ['phone', 'Phone', 'tel', '+1 555 000 0000', ''],
  ['addr', 'Address', 'text', 'Street, city, postcode', ''],
];

export const EMPTY_FORM = { name: '', email: '', phone: '', addr: '', city: '', zip: '' };
export const DEFAULT_PROFILE = { name: 'Amelie Laurent', email: 'amelie@example.com', phone: '', addr: '' };

// Demo data
export const SEED_REVIEWS = [
  { rating: 5, text: 'Absorbs beautifully and my skin feels calm and bouncy by morning.', name: 'Amelie R.', date: '2 weeks ago' },
  { rating: 5, text: 'The texture is luxurious. It has replaced three products in my routine.', name: 'Noor K.', date: '1 month ago' },
  { rating: 4, text: 'Elegant packaging, gentle formula. I would love a larger size.', name: 'Jonas T.', date: '2 months ago' },
];

export const SEED_ORDERS = [
  { id: '#SK-1042', date: 'Oct 28', n: 2, total: 90, status: 'Delivered' },
  { id: '#SK-0987', date: 'Sep 12', n: 1, total: 54, status: 'Delivered' },
  { id: '#SK-0931', date: 'Aug 3', n: 3, total: 118, status: 'Delivered' },
];

export const ADMIN_STATS = [
  ['Revenue (30d)', '$48,320'], ['Orders', '1,284'], ['Customers', '6,910'], ['Quiz completions', '3,402'],
];
export const ADMIN_ORDERS = [
  { id: '#SK-1051', who: 'J. Moreau', total: 96, status: 'Packing' },
  { id: '#SK-1050', who: 'S. Patel', total: 42, status: 'Shipped' },
  { id: '#SK-1049', who: 'L. Weber', total: 130, status: 'Delivered' },
];
export const ADMIN_CUSTOMERS = [
  ['Amelie Laurent', 6, '$412'],
  ['Noor Khan', 4, '$268'],
];
