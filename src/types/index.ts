export interface NavRoute {
  label: string;
  anchor: string;
  isCta?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  imageSrc: string;
  href: string;
}

export interface FeatureStat {
  metric: string;
  headline: string;
  description: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email?: string;
  serviceCategory: string;
  notes?: string;
}

export interface FooterContactInfo {
  phone: string;
  phoneRaw: string;
  address: string;
  hours: string;
  email: string;
}

export interface BrandInfo {
  name: string;
  tagline: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  established: string;
  copyright: string;
}
