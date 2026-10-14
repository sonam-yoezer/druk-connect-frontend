export type ScamReportStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ScamReport {
  reportId: string;
  reportedListerUserId: string;
  reportedListerName: string;
  reporterUserId: string;
  sourceListingId: string;
  sourceListingTitle: string;
  reason: string;
  details: string;
  status: ScamReportStatus;
  reportedAt: string;
  moderatedAt: string | null;
  moderationReason: string | null;
  message: string | null;
}

export interface ScamReportsResponse {
  reports: ScamReport[];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface GetScamReportsParams {
  page: number;
  size: number;
  status?: ScamReportStatus;
}

export type ScamModerationAction = "APPROVE" | "REJECT";

export interface ModerateScamReportRequest {
  action: ScamModerationAction;
  reason: string;
}

export interface ModerateScamReportResponse {
  reportId: string;
  reportedListerUserId: string;
  reportedListerName: string;
  reporterUserId: string;
  sourceListingId: string;
  sourceListingTitle: string;
  reason: string;
  details: string;
  status: "APPROVED" | "REJECTED" | "PENDING";
  reportedAt: string;
  moderatedAt: string | null;
  moderationReason: string | null;
  message: string | null;
}
