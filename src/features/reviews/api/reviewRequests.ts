import { apiFetch } from "@/src/lib/api/client";

export interface ReviewEligibility {
  listingId: string;
  canReview: boolean;
  whatsappContacted: boolean;
  invited: boolean;
  reviewAlreadyExists: boolean;
  message: string;
}
export interface ReviewInvitation {
  requestId: string;
  listingId: string;
  listingTitle: string;
  buyerUserId: string;
  buyerName: string;
  status: string;
  requestedAt: string;
  expiresAt: string;
  reviewUrl: string;
  message: string;
}
export interface ReviewRecipient {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  requestPending: boolean;
  serviceAvailed?: boolean;
  alreadyReviewed: boolean;
}
interface Page<T> {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  buyers?: T[];
  requests?: T[];
}
async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await apiFetch(`/api/v1${path}`, options);
  const data = await response.json().catch(() => null);
  if (!response.ok)
    throw new Error(
      data?.message || "Unable to complete this request. Please try again.",
    );
  if (!data) throw new Error("The server returned an invalid response.");
  return data;
}
export const getReviewEligibility = (id: string) =>
  request<ReviewEligibility>(`/listings/${id}/review-eligibility`);
export const recordReviewContact = (id: string) =>
  request<ReviewEligibility>(`/listings/${id}/review-contact`, {
    method: "POST",
  });
export const getReviewInvitation = (id: string) =>
  request<ReviewInvitation>(`/review-requests/${id}`);
export const searchReviewRecipients = (
  id: string,
  query: string,
  page: number,
  signal?: AbortSignal,
) =>
  request<Page<ReviewRecipient>>(
    `/listings/${id}/review-requests/buyers/search?${new URLSearchParams({ query, page: String(page), size: "10" })}`,
    { signal },
  );
export const listReviewRequests = (id: string) =>
  request<Page<ReviewInvitation>>(
    `/listings/${id}/review-requests?page=1&size=10`,
  );
export const sendReviewRequest = (id: string, buyerUserId: string) =>
  request<ReviewInvitation>(`/listings/${id}/review-requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ buyerUserId }),
  });

export interface ServiceAvailment {
  availmentId: string;
  listingId: string;
  listingTitle: string;
  listingStatus: string;
  buyerUserId: string;
  buyerName: string;
  listerUserId: string;
  listerName: string;
  availedAt: string;
  alreadyReviewed: boolean;
  message: string;
}
export interface ServiceAvailmentHistory {
  availments: ServiceAvailment[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
export const markServiceAvailed = (listingId: string, buyerUserId: string) =>
  request<ServiceAvailment>(`/listings/${listingId}/availments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ buyerUserId }),
  });
export const getServiceAvailmentHistory = (page: number) =>
  request<ServiceAvailmentHistory>(
    `/service-availments/me?page=${page}&size=10`,
  );

export async function markAvailedAndRequestReview(
  listingId: string,
  buyerUserId: string,
  requestPending = false,
) {
  const record = await markServiceAvailed(listingId, buyerUserId);
  if (record.alreadyReviewed || requestPending) {
    return {
      ...record,
      message: record.alreadyReviewed
        ? "Service marked as availed. This Buyer has already submitted a review."
        : "Service marked as availed. A review invitation is already pending.",
    };
  }
  try {
    const invitation = await sendReviewRequest(listingId, buyerUserId);
    return {
      ...record,
      message: `Service marked as availed. ${invitation.message}`,
    };
  } catch (error) {
    throw new Error(
      `Service was saved in both accounts’ history, but the review email was not sent. ${error instanceof Error ? error.message : "Please try again."}`,
    );
  }
}
