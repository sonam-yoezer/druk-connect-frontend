export interface IncomingVouchRequest {
  requestId: string;
  requesterUserId: string;
  requesterFirstName: string;
  requesterLastName: string;
  requesterEmail: string;
  message: string;
  status: string;
  requestedAt: string;
  respondedAt: string | null;
}

export interface RespondVouchRequestResponse {
  requestId: string;
  requesterUserId: string;
  targetUserId: string;
  status: string;
  requestedAt: string;
  message: string;
}

export type GivenVouch = {
  vouchId: string;
  listerUserId: string;
  listerName: string;
  listerEmail: string;
  listerPhoneNumber: string;
  vouchStatus: "ACTIVE" | "WITHDRAWN" | string;
  vouchedAt: string;
  withdrawalPending: boolean;
};

export type GivenVouchesResponse = {
  totalVouchedUsers: number;
  vouches: GivenVouch[];
};

export type WithdrawVouchRequest = {
  reason: string;
};

export type WithdrawVouchResponse = {
  withdrawalRequestId: string;
  vouchId: string;
  buyerUserId: string;
  buyerName: string;
  listerUserId: string;
  listerName: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | string;
  requestedAt: string;
  message: string;
};
