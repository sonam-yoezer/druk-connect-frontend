export type MicroFeedbackRating = "EASY" | "NEUTRAL" | "DIFFICULT";

export interface SubmitMicroFeedbackRequest {
  rating: MicroFeedbackRating;
  comment?: string;
}

export interface SubmitMicroFeedbackResponse {
  rating: MicroFeedbackRating;
  comment: string | null;
}

export type FeedbackType = "BUG" | "SUGGESTION" | "OTHER";

export type FeedbackPerspective = "LISTER" | "BUYER" | "PROVIDER";

export type SubmitFeedbackRequest = {
  type: FeedbackType;
  perspective: FeedbackPerspective;
  message: string;
  anonymous: boolean;
};

export type SubmitFeedbackResponse = {
  feedbackId: string;
  source: "FORM";
  type: FeedbackType;
  status: string;
  submittedAt: string;
  message: string;
};
