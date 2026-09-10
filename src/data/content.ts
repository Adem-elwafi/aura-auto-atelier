import type {
  NavRoute,
  ServiceItem,
  FeatureStat,
  FooterContactInfo,
  BrandInfo,
} from '../types';
import { SERVICE_ASSETS } from '../assets/images';

export const NAV_ROUTES: NavRoute[] = [
  { label: 'Services', anchor: '#services' },
  { label: 'About', anchor: '#about' },
  { label: 'Contact', anchor: '#contact' },
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'ppf',
    title: SERVICE_ASSETS.ppf.title,
    tagline: SERVICE_ASSETS.ppf.description,
    imageSrc: SERVICE_ASSETS.ppf.src,
    href: '#contact',
  },
  {
    id: 'ceramic-coating',
    title: SERVICE_ASSETS.ceramic.title,
    tagline: SERVICE_ASSETS.ceramic.description,
    imageSrc: SERVICE_ASSETS.ceramic.src,
    href: '#contact',
  },
  {
    id: 'color-change-wrap',
    title: SERVICE_ASSETS.wrap.title,
    tagline: SERVICE_ASSETS.wrap.description,
    imageSrc: SERVICE_ASSETS.wrap.src,
    href: '#contact',
  },
  {
    id: 'paint-correction',
    title: SERVICE_ASSETS.correction.title,
    tagline: SERVICE_ASSETS.correction.description,
    imageSrc: SERVICE_ASSETS.correction.src,
    href: '#contact',
  },
  {
    id: 'bespoke-interior',
    title: SERVICE_ASSETS.interior.title,
    tagline: SERVICE_ASSETS.interior.description,
    imageSrc: SERVICE_ASSETS.interior.src,
    href: '#contact',
  },
];

export const FEATURE_STATS: FeatureStat[] = [
  {
    metric: '100%',
    headline: 'Dust-Controlled Clean Room',
    description:
      'Hospital-grade HEPA airflow isolation guarantees flawless, contamination-free film and coating installations.',
  },
  {
    metric: '10+ Yrs',
    headline: 'Master Craftsmanship',
    description:
      'Every vehicle is handled exclusively by certified master artisans with over a decade of exotic car experience.',
  },
  {
    metric: '99.8%',
    headline: 'Paint Defect Elimination',
    description:
      'Digital micron-depth paint gauge mapping ensures maximum gloss refinement with zero clear-coat compromise.',
  },
  {
    metric: '10-Yr',
    headline: 'Nationwide Warranty',
    description:
      'Guaranteed protection against yellowing, bubbling, cracking, and premature environmental degradation.',
  },
];

export const FOOTER_CONTACT: FooterContactInfo = {
  phone: '+1 (800) 555-AURA',
  phoneRaw: '+18005552872',
  address: '8490 Wilshire Blvd, Beverly Hills, CA 90211',
  hours: 'Mon – Sat: 8:00 AM – 6:30 PM | Sun: Closed (VIP Appointments Only)',
  email: 'concierge@auraatelier.com',
};

export const BRAND_INFO: BrandInfo = {
  name: 'Aura Auto Atelier',
  tagline: 'The Pinnacle of Automotive Protection & Aesthetics',
  description:
    'Beverly Hills’ premier automotive sanctuary dedicated to ultra-luxury vehicle protection, bespoke styling, and museum-grade surface refinement.',
  heroHeadline: 'Perfection in Every Reflection',
  heroSubheadline:
    'Bespoke paint protection film, nanoceramic shielding, and master-level correction for exotic and luxury marques.',
  established: '2014',
  copyright: `© ${new Date().getFullYear()} Aura Auto Atelier. All rights reserved.`,
};

export const SERVICE_CATEGORIES: string[] = [
  'Paint Protection Film (PPF)',
  'Ceramic & Graphene Coating',
  'Bespoke Color Change Wrap',
  'Multi-Stage Paint Correction',
  'Bespoke Interior Atelier',
  'Nano-Ceramic Window Tint',
];
