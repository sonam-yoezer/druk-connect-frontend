export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  accessType: "BUYER" | "LISTER";
  communityGuidelinesAccepted: boolean;
  vouchInvitationToken?: string;
}

export interface SignupResponse {
  userId: string;
  status: string;
  emailOtpRequired: boolean;
  phoneOtpRequired: boolean;
  message: string;
}

export interface VerifyOtpRequest {
  userId: string;
  channel: "EMAIL" | "PHONE";
  otp: string;
}

export interface VerifyOtpResponse {
  message?: string;
}
