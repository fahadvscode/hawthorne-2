export interface PageSEO {
  title: string;
  description: string;
  path: string;
  h1: string;
  ogImage?: string;
}

const CTA = 'Free VIP registration for pricing, floor plans & incentives.';
const LOC = 'Milton, Ontario (Halton Region)';

export const pages: Record<string, PageSEO> = {
  home: {
    title: 'Hawthorne East Village Milton | Mattamy Homes Pre-Construction',
    description:
      `Hawthorne East Village is a new Mattamy Homes pre-construction community in ${LOC}. Townhomes & detached homes from $719,990, 1,348–2,777 sq ft. ${CTA}`,
    path: '/',
    h1: 'Hawthorne East Village Milton — Mattamy Homes Pre-Construction',
    ogImage: '/images/og-home.jpg',
  },
  floorPlans: {
    title: 'Hawthorne East Village Floor Plans | Milton Mattamy',
    description:
      'Hawthorne East Village floor plans — townhomes & detached 1,348–2,777 sq ft. Download plans & VIP price list. ' +
      CTA,
    path: '/floor-plans/',
    h1: 'Hawthorne East Village Floor Plans & Home Sizes',
    ogImage: '/images/og-floor-plans.jpg',
  },
  prices: {
    title: 'Hawthorne East Village Prices | Milton Pre-Construction',
    description:
      'Hawthorne East Village prices from $719,990 — deposit structure, incentives & VIP price list. Updated June 2026. ' +
      CTA,
    path: '/prices/',
    h1: 'Hawthorne East Village Prices & Deposit Structure',
    ogImage: '/images/og-prices.jpg',
  },
  townhomes: {
    title: 'Hawthorne East Village Townhomes | Milton Freehold',
    description:
      'Hawthorne East Village townhomes — freehold village & rear lane from $719,990 in Milton. Sizes, features & VIP access. ' +
      CTA,
    path: '/townhomes/',
    h1: 'Hawthorne East Village Townhomes in Milton',
    ogImage: '/images/og-townhomes.jpg',
  },
  detached: {
    title: 'Hawthorne East Village Detached Homes | Milton',
    description:
      'Hawthorne East Village detached homes from $1,022,990 — single & double garage. Sizes up to 2,777 sq ft. ' +
      CTA,
    path: '/detached/',
    h1: 'Hawthorne East Village Detached Homes',
    ogImage: '/images/og-detached.jpg',
  },
  location: {
    title: 'Hawthorne East Village Location | Milton ON Map & Schools',
    description:
      `Hawthorne East Village is in ${LOC} at Fourth Line & Louis St. Laurent Ave. Hwy 401 (10 min), Hwy 407 (7 min), Milton GO (8 min), top schools & Milton Education Village. ${CTA}`,
    path: '/location/',
    h1: 'Hawthorne East Village Location & Milton Lifestyle',
    ogImage: '/images/og-location.jpg',
  },
  faq: {
    title: 'Hawthorne East Village FAQ | Milton Mattamy Homes',
    description:
      'Answers about Hawthorne East Village Milton — prices, deposits, schools, VIP registration & occupancy. ' +
      CTA,
    path: '/faq/',
    h1: 'Hawthorne East Village FAQ',
    ogImage: '/images/og-faq.jpg',
  },
  register: {
    title: 'Hawthorne East Village VIP Registration | Milton',
    description:
      'Register for Hawthorne East Village VIP pricing, floor plans & incentives in Milton. Priority access before public launch. ' +
      CTA,
    path: '/register/',
    h1: 'VIP Registration — Hawthorne East Village Milton',
    ogImage: '/images/og-register.jpg',
  },
  thankYou: {
    title: 'Thank You | Hawthorne East Village VIP Registration',
    description:
      'Your Hawthorne East Village VIP registration is confirmed. Download your price list and floor plans.',
    path: '/thank-you/',
    h1: 'Thank You — You\'re Registered for VIP Access',
    ogImage: '/images/og-home.jpg',
  },
};
