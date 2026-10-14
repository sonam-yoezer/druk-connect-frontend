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
