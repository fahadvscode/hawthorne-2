import { CONTACT, PROJECT, SITE } from '../data/project';
import type { FAQ } from '../data/faqs';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hawthorne East Village VIP Sales',
    url: SITE.url,
    logo: `${SITE.url}/images/1780773913252_Hawthrone-East-Village-logo.webp`,
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    publisher: { '@id': `${SITE.url}/#organization` },
    inLanguage: 'en-CA',
  };
}

export function listingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateListing', 'Residence'],
    name: PROJECT.name,
    description: `${PROJECT.name} is a pre-construction community by ${PROJECT.builder} in ${PROJECT.city}, ${PROJECT.province}. Home types include village townhomes, rear lane townhomes, and detached homes from ${PROJECT.sizes.min} to ${PROJECT.sizes.max} ${PROJECT.sizes.unit}.`,
    url: SITE.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: PROJECT.address.street,
      addressLocality: PROJECT.address.city,
      addressRegion: PROJECT.province,
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
    },
    dateModified: '2026-06-01',
  };
}

export function productOffersSchema() {
  return PROJECT.homeTypes.map((ht) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${PROJECT.name} — ${ht.name}`,
    description: ht.description,
    brand: { '@type': 'Brand', name: PROJECT.builder },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'CAD',
      lowPrice: ht.priceFrom,
      highPrice: ht.priceTo,
      availability: 'https://schema.org/PreOrder',
      url: `${SITE.url}${ht.slug}`,
    },
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
