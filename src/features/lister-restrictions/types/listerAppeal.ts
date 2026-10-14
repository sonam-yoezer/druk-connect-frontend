export interface SubmitAppealRequest {
  reason: string;
}

export interface SubmitAppealResponse {
  appealId: string;
  listerUserId: string;
  restrictionId: string;
  sourceReportId: string | null;
  status: string;
  appealReason: string;
  submittedAt: string;
  moderatedAt: string | null;
  moderationReason: string | null;
  message: string;
}
