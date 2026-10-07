export interface VouchCountResponse {
  userId: string;
  activeVouches: number;
  requiredVouches: number;
  remainingVouches: number;
  requirementMet: boolean;
}

export interface VouchUserSearchResponse {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  accessType: string;
}

export interface InviteUserRequest {
  email: string;
  message: string;
}

export interface InviteUserResponse {
  message?: string;
}

export interface CreateVouchRequestPayload {
  targetUserId: string;
  message: string;
}
