export type ProductCategory = 
  | 'Birthday Cakes'
  | 'Wedding Cakes'
  | 'Cupcakes'
  | 'Cookies'
  | 'Bread'
  | 'Pastries'
  | 'Seasonal Specials';

export type GalleryCategory = 'Cakes' | 'Cookies' | 'Bread' | 'Pastries' | 'Events';

export type AvailabilityStatus = 'In Stock' | 'Made to Order' | 'Seasonal' | 'Sold Out';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  image: string;
  availabilityBadge: AvailabilityStatus;
  isFeatured: boolean;
  isHidden: boolean;
  orderIndex: number;
  ingredients?: string[];
  allergens?: string[];
  priceEstimate?: string; // Optional reference price or starting price text e.g. "From $45"
}

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  description: string;
  uploadDate: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number; // 1 to 5
  comment: string;
  occasion?: string;
  date: string;
  avatarUrl?: string;
  isApproved: boolean;
}

export interface SpecialOrderRequest {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  occasion: string;
  preferredDate: string;
  servingSize: string;
  message: string;
  specialRequirements?: string;
  status: 'Pending' | 'In Review' | 'Confirmed' | 'Completed' | 'Archived';
  createdAt: string;
}

export interface BusinessHours {
  day: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface Baker {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface QualityPromise {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface HomepageContent {
  heroImage: string;
  heroTitle: string;
  tagline: string;
  welcomeTitle: string;
  welcomeSubtitle: string;
  welcomeStory: string;
  ctaText1: string;
  ctaText2: string;
  featuredSectionTitle: string;
  pickupNotice?: string;
}

export interface AboutContent {
  storyTitle: string;
  storyParagraphs: string[];
  mission: string;
  vision: string;
  bakers: Baker[];
  qualityPromises: QualityPromise[];
  timeline: TimelineEvent[];
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  phone: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  pinterestUrl: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  maintenanceMode: boolean;
  visitCount: number;
  pickupNotice?: string;
}

export interface AdminUser {
  username: string;
  isFirstLogin: boolean;
}

export interface FullSiteData {
  homepage: HomepageContent;
  about: AboutContent;
  products: Product[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  businessHours: BusinessHours[];
  settings: SiteSettings;
  specialOrders?: SpecialOrderRequest[]; // Only available for admin
}
