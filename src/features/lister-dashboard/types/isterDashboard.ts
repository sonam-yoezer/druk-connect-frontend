export interface ListerDashboardResponse {
  totalListings: number;
  activeListings: number;
  inactiveListings: number;
  totalListingViews: number;
  averageRating: number;
  approvedReviewCount: number;
  activeVouchCount: number;
  servicesAvailedCount: number;
  uniqueBuyersServed: number;
  servicesAvailedLast30Days: number;
  generatedAt: string;
}
