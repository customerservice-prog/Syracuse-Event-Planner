import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/site-url';
import { siteImages } from '@/lib/site-images';

/** Full-width Unsplash URL — reliable for Open Graph without a generated image route. */
const defaultOgImage = siteImages.heroHome;

export function pageMetadata(opts: {
  title: string;
  description: string;
  path: string;
  /** Extra keywords are optional; keep descriptions human-first. */
  keywords?: string[];
  /** Use on home page to avoid duplicate brand suffix in the tab title. */
  titleAbsolute?: string;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const ogImage = defaultOgImage;
  const displayTitle = opts.titleAbsolute ?? opts.title;

  return {
    ...(opts.titleAbsolute
      ? { title: { absolute: opts.titleAbsolute } }
      : { title: opts.title }),
    description: opts.description,
    ...(opts.keywords?.length ? { keywords: opts.keywords } : {}),
    alternates: { canonical: opts.path },
    openGraph: {
      title: displayTitle,
      description: opts.description,
      url,
      siteName: 'Syracuse Event Planner',
      locale: 'en_US',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 800, alt: displayTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description: opts.description,
      images: [ogImage],
    },
  };
}
