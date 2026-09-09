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
