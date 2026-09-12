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
    tagline: 'Complete disassembly, computerized color matching, and multi-layer clear coat finish with factory warranty.',
    imageSrc: SERVICE_ASSETS.wrap.src,
    href: '#contact',
  },
  {
    id: 'detailed-car-painting',
    title: 'Detailed Car Painting',
    tagline: 'Micro-precision painting of individual structural elements, door sills, engine bays, and customized accents.',
    imageSrc: SERVICE_ASSETS.ceramic.src,
    href: '#contact',
  },
  {
    id: 'caliper-painting',
    title: 'Painting of Calipers',
    tagline: 'High-temperature ceramic enamel coating with custom emblem application and heat-resistant gloss clear coats.',
    imageSrc: SERVICE_ASSETS.ppf.src,
    href: '#contact',
  },
  {
    id: 'wheel-painting',
    title: 'Painting of Wheels',
    tagline: 'Full powder coating, diamond-cut face refinishing, and multi-stage painted alloy wheel restoration.',
    imageSrc: SERVICE_ASSETS.tint.src,
    href: '#contact',
  },
  {
    id: 'local-car-painting',
    title: 'Local Car Painting',
    tagline: 'Seamless spot repair and computerized spectrophotometer color blending on isolated damaged panels.',
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
    headline: 'EXACTLY ACCORDING TO YOUR BUDGET',
    description:
      'Zero hidden costs or post-work markups. Fixed transparent pricing before work begins.',
  },
  {
    metric: 'OEM',
    headline: "FRIENDS WON'T SEE THE DIFFERENCE",
    description:
      'Precision clear-coat leveling and micro-jewel polishing ensuring factory-identical orange peel and texture.',
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
  heroCta: 'Callback',
  heroCtaPrimary: 'Callback',
  established: '2014',
  copyright: `© ${new Date().getFullYear()} MAX COLOR. All rights reserved.`,
  introHeadline: 'WE OFFER PAINTING SERVICES FOR CARS OF ALL BRANDS',
  introParagraphs: [
    'Operating at the intersection of aerospace material science and factory-standard paint booth precision, MAX COLOR sets the benchmark for hypercar, sports car, and luxury vehicle painting and refinishing.',
    'Our master painters utilize computerized spectrophotometer color matching and hospital-grade clean room preparation to achieve exact OEM pigmentation, seamless clear-coat leveling, and zero optical distortion on every vehicle.',
  ],
  introButtonLabel: 'About company',
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
