export type CreateListingData = {
  listingTitle: string;
  listingCategory: string;
  suburb: string;
  state: string;
  postcode: string;
  description: string;
  serviceType: string;
  dietaryOptions: string[];
  availability: string;
  pricingType: "PAID" | "FREE";
  rateAmount: number | null;
};

export type CreateListingResponse = {
  id: string;
  listingTitle: string;
  listingCategory: string;
  suburb: string;
  state: string;
  postcode: string;
  description: string;
  serviceType: string;
  dietaryOptions: string[];
  availability: string;
  pricingType: string;
  rateAmount: number | null;
};

export type ListingImage = {
  imageId: string;
  imageUrl: string;
  sortOrder: number;
};

export type Listing = {
  id: string;
  listingTitle: string;
  listingCategory: string;
  suburb: string;
  state: string;
  postcode: string;
  serviceType: string;
  availability: string;
  pricingType: "PAID" | "FREE";
  rateAmount: number | null;
  currencyCode: string;
  views: number;
  status: string;
  images: ListingImage[];
  totalReviewer: number;
  averageRating: number;
  averageRatingStar: number;
  createdAt: string;
  updatedAt: string;
};

export type ListingSearchResult = {
  id: string;
  listingTitle: string;
  listingCategory: string;
  suburb: string;
  state: string;
  cuisine: string;
  serviceType: string;
  availability: string;
  pricingType: "PAID" | "FREE";
  rateAmount: number | null;
  currencyCode: string;
  views: number;
  images: ListingImage[];
  totalReviewer: number;
  averageRating: number;
  averageRatingStar: number;
  listerName: string;
  listerProfileImageUrl?: string | null;
};

export type SearchListingsParams = {
  category?: string;
  city?: string;
  q?: string;
  page?: number;
  size?: number;
};

export type ListingsResponse = {
  listings: ListingSearchResult[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type ListingVouch = {
  profileImageUrl?: string | null;
  vouchId: string;
  voucherUserId: string;
  voucherName: string;
  vouchedAt: string;
};

export type ListingLister = {
  profileImageUrl?: string | null;
  userId: string;
  name: string;
  email: string;
  emailLink: string;
  phoneNumber: string;
  whatsappLink: string;
  activeVouches: number;
  vouches: ListingVouch[];
};

export type ListingReview = {
  profileImageUrl?: string | null;
  reviewer?: string;
  reviewId?: string;
  submittedAt?: string;
  id?: string;
  rating?: number;
  comment?: string;
  reviewerName?: string;
  createdAt?: string;
};

export type ListingDetails = {
  id: string;
  listingTitle: string;
  listingCategory: string;
  city: string;
  description: string;
  cuisine: string;
  serviceType: string;
  minimumOrder: number;
  serves: number;
  dietaryOptions: string[];
  availability: string;
  pricingType: "PAID" | "FREE";
  rateAmount: number | null;
  currencyCode: string;
  views: number;
  images: ListingImage[];
  totalReviewer: number;
  averageRating: number;
  averageRatingStar: number;
  lister: ListingLister;
  reviews: ListingReview[];
  createdAt: string;
};

export type MyListingsResponse = Omit<ListingsResponse, "listings"> & {
  listings: Listing[];
};
