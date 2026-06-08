import { CONTACT, PROJECT, SITE } from '../data/project';
import type { FAQ } from '../data/faqs';

const LISTING_ID = `${SITE.url}/#listing`;
const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Hawthorne East Village VIP Sales',
    alternateName: SITE.name,
    url: SITE.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE.url}/images/1780773913252_Hawthrone-East-Village-logo.webp`,
      width: 512,
      height: 512,
    },
    description:
      'Independent VIP buyer representation for Hawthorne East Village Milton by Mattamy Homes. Not affiliated with the builder.',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Milton, Ontario, Canada',
    },
    ...(CONTACT.email && {
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: CONTACT.email,
        areaServed: 'CA',
        availableLanguage: ['English', 'en-CA'],
      },
    }),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    alternateName: 'Hawthorne East Village',
    url: SITE.url,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-CA',
    about: { '@id': LISTING_ID },
  };
}

export function webPageSchema(title: string, description: string, path: string) {
  const url = path === '/' ? `${SITE.url}/` : `${SITE.url}${path.endsWith('/') ? path : `${path}/`}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': LISTING_ID },
    inLanguage: 'en-CA',
    dateModified: '2026-06-08',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE.url}/images/1780773913252_hero_community_picture.webp`,
    },
  };
}

export function listingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateListing', 'Residence'],
    '@id': LISTING_ID,
    name: PROJECT.name,
    alternateName: `${PROJECT.name} Milton`,
    description: `${PROJECT.name} is a pre-construction community by ${PROJECT.builder} in ${PROJECT.city}, ${PROJECT.province}. Home types include village townhomes, rear lane townhomes, and detached homes from ${PROJECT.sizes.min} to ${PROJECT.sizes.max} ${PROJECT.sizes.unit}.`,
    url: SITE.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: PROJECT.address.street,
      addressLocality: PROJECT.address.city,
      addressRegion: PROJECT.province,
      postalCode: PROJECT.address.postalCode,
      addressCountry: PROJECT.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: PROJECT.geo.latitude,
      longitude: PROJECT.geo.longitude,
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'CAD',
      lowPrice: PROJECT.priceRange.low,
      highPrice: PROJECT.priceRange.high,
      offerCount: PROJECT.homeTypes.length,
      availability: 'https://schema.org/PreOrder',
    },
    numberOfRooms: '2-5',
    floorSize: {
      '@type': 'QuantitativeValue',
      minValue: PROJECT.sizes.min,
      maxValue: PROJECT.sizes.max,
      unitCode: 'FTK',
    },
    developer: {
      '@type': 'Organization',
      name: PROJECT.builder,
      foundingDate: '1978',
    },
    amenityFeature: PROJECT.amenities.map((a) => ({
      '@type': 'LocationFeatureSpecification',
      name: a,
      value: true,
    })),
    dateModified: '2026-06-08',
  };
}

export function placeSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': `${SITE.url}/#place`,
    name: PROJECT.name,
    description: `Pre-construction community in ${PROJECT.city}, ${PROJECT.region}, ${PROJECT.province}`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: PROJECT.geo.latitude,
      longitude: PROJECT.geo.longitude,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: PROJECT.address.street,
      addressLocality: PROJECT.address.city,
      addressRegion: PROJECT.province,
      postalCode: PROJECT.address.postalCode,
      addressCountry: PROJECT.country,
    },
    containedInPlace: {
      '@type': 'City',
      name: PROJECT.city,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: PROJECT.region,
      },
    },
  };
}

export function itemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${PROJECT.name} Home Types`,
    description: 'Available home types at Hawthorne East Village Milton by Mattamy Homes',
    numberOfItems: PROJECT.homeTypes.length,
    itemListElement: PROJECT.homeTypes.map((ht, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: ht.name,
      url: `${SITE.url}${ht.slug}`,
      item: {
        '@type': 'Product',
        name: `${PROJECT.name} — ${ht.name}`,
        description: ht.description,
      },
    })),
  };
}

export function productOffersSchema(homeTypeIds?: string[]) {
  const types = homeTypeIds
    ? PROJECT.homeTypes.filter((ht) => homeTypeIds.includes(ht.id))
    : PROJECT.homeTypes;

  return types.map((ht) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${PROJECT.name} — ${ht.name}`,
    description: ht.description,
    brand: { '@type': 'Brand', name: PROJECT.builder },
    category: 'New Home Construction',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'CAD',
      price: ht.priceFrom,
      priceValidUntil: '2026-12-31',
      availability: 'https://schema.org/PreOrder',
      url: `${SITE.url}${ht.slug}`,
      seller: {
        '@type': 'Organization',
        name: PROJECT.builder,
      },
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Bedrooms', value: ht.beds },
      { '@type': 'PropertyValue', name: 'Bathrooms', value: ht.baths },
      {
        '@type': 'PropertyValue',
        name: 'Floor Area',
        value: `${ht.sizeMin}–${ht.sizeMax} sq ft`,
      },
    ],
  }));
}

export function faqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Speakable summary for voice assistants and answer engines */
export function speakableSchema(path: string) {
  const url = path === '/' ? `${SITE.url}/` : `${SITE.url}${path.endsWith('/') ? path : `${path}/`}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#speakable`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-summary', 'h1', '.hero-subtitle'],
    },
    url,
  };
}
