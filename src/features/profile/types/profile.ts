import type { LoginUser } from "../../auth/types/login";
export interface UserProfile extends LoginUser {
  bio: string | null;
  location: string | null;
  emailVerifiedAt: string | null;
  phoneVerifiedAt: string | null;
}
export interface ProfileDetails { firstName: string; lastName: string; bio: string; location: string }
export interface ContactChallenge { challengeId: string; maskedDestination: string; expiresAt: string; resendAfterSeconds: number; message: string }
