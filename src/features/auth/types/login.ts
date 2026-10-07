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
  roles: string[];
}

export interface AuthSession {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  user: LoginUser;
}

export type LoginResponse = {
  loginStatus: "AUTHENTICATED";
  tokens: AuthSession;
  user?: LoginUser;
  message: string;
} | {
  loginStatus: "VOUCH_REQUIRED";
  tokens: null;
  vouchRecoveryToken: string;
  vouchRecoveryTokenExpiresIn: number;
  activeVouchCount: number;
  requiredVouchCount: number;
  vouchesNeeded: number;
  user: LoginUser;
  message: string;
};
