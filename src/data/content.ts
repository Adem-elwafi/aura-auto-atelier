import type {
  NavRoute,
  ServiceItem,
  FeatureStat,
  FooterContactInfo,
  BrandInfo,
} from '../types';
import { SERVICE_ASSETS } from '../assets/images';

export const NAV_ROUTES: NavRoute[] = [
  { label: 'Home', anchor: '#hero' },
  { label: 'Service', anchor: '#services' },
  { label: 'Shop', anchor: '#shop' },
  { label: 'Company', anchor: '#brand-intro' },
  { label: 'Contacts', anchor: '#contact' },
];

export const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 'full-car-painting',
    title: 'Full Car Painting',
    tagline: 'Complete vehicle respray with factory-grade clear coat and exact OEM pigmentation.',
    imageSrc: SERVICE_ASSETS.wrap.src,
    href: '#contact',
  },
  {
    id: 'detailed-car-painting',
    title: 'Detailed Car Painting',
    tagline: 'Precision panel-by-panel refinishing with seamless color blending and edge finishing.',
    imageSrc: SERVICE_ASSETS.ceramic.src,
    href: '#contact',
  },
  {
    id: 'caliper-painting',
    title: 'Painting of Calipers',
    tagline: 'High-temperature multi-coat brake caliper finishes with custom laser-etched insignia.',
    imageSrc: SERVICE_ASSETS.ppf.src,
    href: '#contact',
  },
  {
    id: 'wheel-painting',
    title: 'Painting of Wheels',
    tagline: 'Powder coating and wet-spray refinishing delivering deep gloss and corrosion resistance.',
    imageSrc: SERVICE_ASSETS.tint.src,
    href: '#contact',
  },
  {
    id: 'local-car-painting',
    title: 'Local Car Painting',
    tagline: 'Surgical spot repair and localized panel touch-up eliminating micro-scratches without full respray.',
    imageSrc: SERVICE_ASSETS.correction.src,
    href: '#contact',
  },
];

export const FEATURE_STATS: FeatureStat[] = [
  {
    metric: '100%',
    headline: 'COLOR HIT 100%',
    description:
      'Computerized spectrophotometer matching guarantees an absolute 100% factory color match on every panel.',
  },
  {
    metric: '№1',
    headline: 'CLUB SERVICE №1',
    description:
      'Recognized as the premier detailing and paint atelier by top supercar and sports car clubs.',
  },
  {
    metric: '0%',
    headline: '0 HIDDEN FEES',
    description:
      'Transparent, fixed estimates with zero unexpected post-work markups.',
  },
  {
    metric: 'OEM',
    headline: 'FLAWLESS SPECTROPHOTOMETER MATCH',
    description:
      'Clear-coat leveling and micro-jewel polishing ensuring factory-identical orange peel and texture.',
  },
];

export const FOOTER_CONTACT: FooterContactInfo = {
  phone: '+1 (800) 555-COLOR',
  phoneRaw: '+18005552656',
  address: '8490 Wilshire Blvd, Beverly Hills, CA 90211',
  hours: 'Mon – Sat: 8:00 AM – 6:30 PM | Sun: Closed (VIP Appointments Only)',
  email: 'concierge@maxcolor.com',
};

export const BRAND_INFO: BrandInfo = {
  name: 'MAX COLOR',
  tagline: 'Professional Auto Atelier',
  description:
    'Premium automotive atelier specializing in high-precision painting, computerized color matching, protective film applications, and bespoke vehicle aesthetics.',
  heroOverline: 'PROFESSIONAL AUTO ATELIER',
  heroHeadline: 'TURN THE COLOR TO THE MAXIMUM',
  heroSubheadline:
    'We offer a wide range of services from partial painting to complete restoration of the body.',
  heroSubhead:
    'We offer a wide range of services from partial painting to complete restoration of the body.',
  heroCta: 'Book Paint Assessment',
  heroCtaPrimary: 'Book Paint Assessment',
  established: '2014',
  copyright: `© ${new Date().getFullYear()} MAX COLOR. All rights reserved.`,
  introHeadline: 'AEROSPACE-PRECISION AUTOMOTIVE REFINISHING',
  introParagraphs: [
    'Operating at the intersection of aerospace material science and factory-standard paint booth precision, MAX COLOR sets the benchmark for hypercar, sports car, and luxury vehicle painting and refinishing.',
    'Our master painters utilize computerized spectrophotometer color matching and hospital-grade clean room preparation to achieve exact OEM pigmentation, seamless clear-coat leveling, and zero optical distortion on every vehicle.',
  ],
  introButtonLabel: 'Book Paint Assessment',
  servicesTitle: 'TYPES OF CAR PAINTING',
  ctaBannerHeadline: 'STAND OUT FROM THE CROWD WITH MAX COLOR',
  ctaBannerSubhead:
    'Schedule your vehicle assessment with our master painters. Experience flawless automotive finish.',
  ctaBannerNote: 'Reserve an inspection slot today',
  ctaBannerButton: 'Request Inspection',
};

export const SERVICE_CATEGORIES: string[] = [
  'Full Car Painting',
  'Detailed Car Painting',
  'Painting of Calipers',
  'Painting of Wheels',
  'Local Car Painting',
];
