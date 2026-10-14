export interface AdminAppeal {
  appealId: string;
  listerUserId: string;
  restrictionId: string;
  sourceReportId: string | null;
  status: string;
  appealReason: string;
  submittedAt: string;
  moderatedAt: string | null;
  moderationReason: string | null;
  message: string | null;
}

export interface PendingAppealsResponse {
  appeals: AdminAppeal[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export type AppealModerationAction = "APPROVE" | "REJECT";

export interface ModerateAppealRequest {
  action: AppealModerationAction;
  reason: string;
}

export interface ModerateAppealResponse {
  appealId: string;
  listerUserId: string;
  restrictionId: string;
  sourceReportId: string | null;
  status: string;
  appealReason: string;
  submittedAt: string;
  moderatedAt: string | null;
  moderationReason: string | null;
  message: string | null;
}
