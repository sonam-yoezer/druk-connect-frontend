export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  accessType: "BUYER" | "LISTER";
}

export interface LoginResponse {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  user: LoginUser;
}
