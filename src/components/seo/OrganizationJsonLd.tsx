import {
  sitePhoneDisplay,
  sitePhoneTel,
  siteEmail,
  siteAddress,
} from '@/lib/site-public';
import { absoluteUrl } from '@/lib/site-url';
import { siteImages } from '@/lib/site-images';

function telUri(display: string, digits: string) {
  if (digits?.replace(/\D/g, '')) return `tel:+1${digits.replace(/\D/g, '').replace(/^1/, '')}`;
  const d = display.replace(/\D/g, '');
  return d ? `tel:+1${d}` : undefined;
}

/** Parse "300 Salina St, Syracuse, NY 13202" style lines for Schema.org */
function addressFromLine(line: string) {
  const m = line.match(/^(.+),\s*([^,]+),\s*([A-Z]{2})\s*(\d{5})(?:-\d{4})?$/i);
  if (!m)
    return {
      streetAddress: line,
      addressLocality: 'Syracuse',
      addressRegion: 'NY',
      postalCode: '13202',
    };
  return {
    streetAddress: m[1].trim(),
    addressLocality: m[2].trim(),
    addressRegion: m[3].toUpperCase(),
    postalCode: m[4],
  };
}

export default function OrganizationJsonLd() {
  const url = absoluteUrl('/');
  const phone = telUri(sitePhoneDisplay, sitePhoneTel);
  const addr = addressFromLine(siteAddress);

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${url}#organization`,
        name: 'Syracuse Event Planner',
        url,
        logo: absoluteUrl('/favicon.ico'),
        email: siteEmail,
        ...(phone ? { telephone: phone } : {}),
        address: {
          '@type': 'PostalAddress',
          streetAddress: addr.streetAddress,
          addressLocality: addr.addressLocality,
          addressRegion: addr.addressRegion,
          postalCode: addr.postalCode,
          addressCountry: 'US',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url,
        name: 'Syracuse Event Planner',
        description:
          'Full-service event planning in Syracuse and Onondaga County: weddings, corporate events, galas, and social celebrations.',
        publisher: { '@id': `${url}#organization` },
        inLanguage: 'en-US',
      },
      {
        '@type': 'EventPlanningService',
        '@id': `${url}#local`,
        name: 'Syracuse Event Planner',
        image: siteImages.heroHome,
        url,
        email: siteEmail,
        ...(phone ? { telephone: phone } : {}),
        address: {
          '@type': 'PostalAddress',
          streetAddress: addr.streetAddress,
          addressLocality: addr.addressLocality,
          addressRegion: addr.addressRegion,
          postalCode: addr.postalCode,
          addressCountry: 'US',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 43.0481,
          longitude: -76.1474,
        },
        areaServed: [
          { '@type': 'City', name: 'Syracuse', containedInPlace: { '@type': 'State', name: 'New York' } },
          { '@type': 'AdministrativeArea', name: 'Onondaga County' },
          { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: 43.0481, longitude: -76.1474 }, geoRadius: 75000 },
        ],
        priceRange: '$$–$$$',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
        parentOrganization: { '@id': `${url}#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
