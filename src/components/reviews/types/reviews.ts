export type SubmitReviewData = {
  rating: number;
  comment: string;
  tags: string[];
};

export type SubmitReviewResponse = {
  reviewId: string;
  listingId: string;
  rating: number;
  comment: string;
  tags: string[];
  status: string;
  submittedAt: string;
  message: string;
};

export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface AdminReview {
  reviewId: string;
  listingId: string;
  listingTitle: string;
  reviewerUserId: string;
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  comment: string;
  tags: string[];
  status: ReviewStatus;
  submittedAt: string;
}

export interface AdminReviewsResponse {
  reviews: AdminReview[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}

export type ReviewModerationAction = "APPROVE" | "REJECT";

export interface ModerateReviewData {
  action: ReviewModerationAction;
  reason: string;
}

export interface ReviewModerationResponse {
  reviewId: string;
  listingId: string;
  reviewerUserId: string;
  reviewer: string;
  rating: number;
  comment: string;
  tags: string[];
  status: "APPROVED" | "REJECTED";
  rejectionReason: string | null;
  submittedAt: string;
  moderatedAt: string;
  message: string;
}
