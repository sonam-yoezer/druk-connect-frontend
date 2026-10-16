export type AdminFeedbackItem = {
  feedbackId: string;
  source: "FORM" | "MICRO" | string;
  type: string;
  perspective: string | null;
  microRating: string | null;
  message: string;
  anonymous: boolean;
  submittedByUserId: string | null;
  submitterName: string | null;
  submitterEmail: string | null;
  submitterAccessType: string | null;
  canFollowUp: boolean;
  screenshotPath: string | null;
  status: string;
  themeKey: string | null;
  themeLabel: string | null;
  submittedAt: string;
  updatedAt: string;
  resolvedAt: string | null;
};

export type AdminFeedbackResponse = {
  feedback: AdminFeedbackItem[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
};
