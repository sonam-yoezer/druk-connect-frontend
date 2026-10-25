export interface AdminDashboardResponse {
  totalUsers: number;
  activeUsers: number;
  newUsersLast7Days: number;
  totalListings: number;
  activeListings: number;
  newListingsLast7Days: number;
  pendingReviewCount: number;
  pendingVouchWithdrawalCount: number;
  pendingScamReportCount: number;
  pendingAppealCount: number;
  unresolvedFeedbackCount: number;
  generatedAt: string;
}
