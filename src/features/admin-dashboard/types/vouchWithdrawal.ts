export type PendingVouchWithdrawal = {
  withdrawalRequestId: string;
  vouchId: string;

  buyerUserId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhoneNumber: string;

  listerUserId: string;
  listerName: string;
  listerEmail: string;
  listerPhoneNumber: string;

  reason: string;

  status: "PENDING" | "APPROVED" | "REJECTED" | string;

  vouchedAt: string;
  requestedAt: string;
};

export type PendingVouchWithdrawalsResponse = {
  requests: PendingVouchWithdrawal[];

  currentPage: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;

  hasNext: boolean;
  hasPrevious: boolean;
};

export type ModerateVouchWithdrawalAction = "APPROVE" | "REJECT";

export type ModerateVouchWithdrawalRequest = {
  action: ModerateVouchWithdrawalAction;
  reason: string;
};

export type ModerateVouchWithdrawalResponse = {
  withdrawalRequestId: string;
  vouchId: string;
  status: "APPROVED" | "REJECTED" | string;
  adminReason: string;
  moderatedAt: string;
  message: string;
};
