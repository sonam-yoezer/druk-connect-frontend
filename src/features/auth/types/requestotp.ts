export interface ResendOtpPayload {
  userId: string;
  channel: "EMAIL";
}

export interface ResendOtpResponse {
  message: string;
}