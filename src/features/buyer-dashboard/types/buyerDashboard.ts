export interface BuyerDashboardResponse {
  servicesAvailedCount: number;
  uniqueProvidersUsed: number;
  servicesAvailedLast30Days: number;
  submittedReviewCount: number;
  approvedReviewCount: number;
  pendingReviewCount: number;
  rejectedReviewCount: number;
  pendingReviewInvitationCount: number;
  pendingVouchRequestsReceived: number;
  activeVouchesGiven: number;
  generatedAt: string;
}
