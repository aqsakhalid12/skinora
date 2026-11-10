import { SITE_URL } from '@/lib/utils';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/cart', '/account'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
