export type MicroFeedbackRating = "EASY" | "NEUTRAL" | "DIFFICULT";

export interface SubmitMicroFeedbackRequest {
  rating: MicroFeedbackRating;
  comment?: string;
}

export interface SubmitMicroFeedbackResponse {
  rating: MicroFeedbackRating;
  comment: string | null;
}
