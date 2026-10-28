import { apiFetch } from "@/src/lib/api/client";
import type { ContactChallenge, ProfileDetails, UserProfile } from "../types/profile";

async function profileRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await apiFetch(`/api/v1/users/me/${path}`, { cache: "no-store", ...options });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || "Unable to update your profile. Please try again.");
  return data;
}
export const getMyProfile = () => profileRequest<UserProfile>("profile");
export const updateMyProfile = (details: ProfileDetails) => profileRequest<UserProfile>("profile", {
  method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(details),
});
export const uploadMyProfileImage = (image: File) => {
  const body = new FormData(); body.append("image", image);
  return profileRequest<UserProfile>("profile-image", { method: "PUT", body });
};
export const removeMyProfileImage = () => profileRequest<UserProfile>("profile-image", { method: "DELETE" });
export const startContactChange = (data: { channel: "EMAIL" | "PHONE"; destination: string; currentPassword: string }) =>
  profileRequest<ContactChallenge>("contact-changes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
export const verifyContactChange = (data: { challengeId: string; otp: string }) => profileRequest<UserProfile>("contact-changes/verify", {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
});
