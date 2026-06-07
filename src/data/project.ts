export const SITE = {
  name: 'Hawthorne East Village Milton',
  domain: 'hawthorneeastvillagemilton.com',
  url: 'https://www.hawthorneeastvillagemilton.com',
  brand: 'Hawthorne East Village VIP',
  agent: 'VIP Sales Team',
} as const;

export const PROJECT = {
  name: 'Hawthorne East Village',
  builder: 'Mattamy Homes',
  builderNote:
    'Mattamy Homes has been building communities across North America since 1978 and is one of the largest privately owned homebuilders on the continent.',
  city: 'Milton',
  region: 'Halton Region',
  province: 'Ontario',
  country: 'Canada',
  status: 'Pre-construction (released in phases)',
  occupancy: 'TBD by phase — confirm with VIP registration',
  address: {
    street: 'Fourth Line & Louis St. Laurent Ave',
    area: 'Milton',
    city: 'Milton',
    province: 'ON',
    postalCode: 'L9T',
  },
  geo: {
    latitude: 43.4939,
    longitude: -79.8519,
  },
  sizes: { min: 1348, max: 2777, unit: 'sq ft' },
  priceRange: { low: 719990, high: 1376990, currency: 'CAD' },
  lastUpdated: 'June 2026',
  homeTypes: [
    {
      id: 'village-townhomes',
      name: 'Village Townhomes',
      slug: '/townhomes/',
      description: 'Freehold village-style townhomes with front-facing street appeal.',
      beds: '2–4',
      baths: '2–3',
      sizeMin: 1348,
      sizeMax: 1800,
      priceFrom: 719990,
      priceTo: 739990,
    },
    {
      id: 'rear-lane-townhomes',
      name: 'Rear Lane Townhomes',
      slug: '/townhomes/',
      description: 'Common-element rear lane townhomes with private rear garage access.',
      beds: '3–4',
      baths: '2–3',
      sizeMin: 1500,
      sizeMax: 2000,
      priceFrom: 749990,
      priceTo: 849990,
    },
    {
      id: 'detached-single',
      name: 'Single-Car Garage Detached',
      slug: '/detached/',
      description: 'Detached single-family homes with single-car garage configurations.',
      beds: '3–5',
      baths: '2–4',
      sizeMin: 1800,
      sizeMax: 2400,
      priceFrom: 1022990,
      priceTo: 1200000,
    },
    {
      id: 'detached-double',
      name: 'Double-Car Garage Detached',
      slug: '/detached/',
      description: 'Larger detached homes with double-car garage and premium finishes.',
      beds: '4–5',
      baths: '3–5',
      sizeMin: 2200,
      sizeMax: 2777,
      priceFrom: 1150000,
      priceTo: 1376990,
    },
  ],
  deposit: {
    summary:
      'Typical Mattamy pre-construction deposit structures are paid in installments over the construction period. Exact amounts and due dates vary by phase and must be confirmed at VIP registration.',
    typical: [
      'Initial deposit on signing (amount varies by phase)',
      'Additional installments during construction',
      'Balance on closing',
    ],
  },
  incentives:
    'Limited VIP incentives may be available for early registrants. Incentives change frequently and are subject to builder approval — register for current details.',
  amenities: [
    'Highway 401 (~10 mins) & Highway 407 (~7 mins)',
    'Milton GO Station (~8 mins drive)',
    'Milton District Hospital (~6 mins drive)',
    'Milton Sports Centre (~7 mins drive)',
    'Kelso & Rattlesnake Point Conservation Areas (~12 mins)',
    'Springridge Farm & local markets (~10 mins)',
  ],
  schools: [
    'Boyne Public School (Public Elementary, ~3 mins)',
    'St. Francis Xavier Catholic Secondary School (~4 mins)',
    'Elsie MacGill Secondary School (Public Secondary, ~5 mins)',
    'Planned Milton Education Village (Wilfrid Laurier & Conestoga, ~5 mins)',
  ],
} as const;

export const CONTACT = {
  name: 'VIP Sales Team',
  title: 'Authorized Platinum Access',
  brokerage: 'Independent Real Estate Professionals',
  address: 'Milton, ON',
  email: '',
  phone: 'Register for Access',
  phoneTel: '#register',
  web: '',
  webLabel: '',
} as const;

export const DISCLAIMER = {
  marketed:
    'Marketed by authorized independent real estate professionals.',
  notOfficial:
    'Independent buyer representation — we do not represent Mattamy Homes.',
  preliminary:
    'All renderings, pricing, sizes, and incentives are preliminary, for illustration only, and subject to change without notice. E&OE.',
} as const;

export function formatPrice(n: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}
