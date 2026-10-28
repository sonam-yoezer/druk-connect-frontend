"use client";

import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/store/authStore";
import { UserAvatar } from "@/src/shared/ui/UserAvatar";
import { getMyProfile, updateMyProfile, uploadMyProfileImage, removeMyProfileImage, startContactChange, verifyContactChange } from "../api/profile";
import type { UserProfile } from "../types/profile";

export default function ProfilePage() {
  const userId = useAuthStore(state => state.user?.id);
  const profile = useQuery({ queryKey: ["my-profile", userId], queryFn: getMyProfile, enabled: Boolean(userId), retry: false });
  return <main className="mx-auto max-w-3xl space-y-6">
    <header><p className="text-xs font-semibold uppercase text-brand">Account</p><h1 className="mt-2 font-serif text-3xl">Your profile</h1><p className="mt-2 text-sm text-muted">Manage your details, photo, and verified contact information.</p></header>
    {profile.isPending && <p role="status">Loading profile…</p>}
    {profile.error && <div role="alert" className="rounded-md bg-danger-tint p-4 text-danger">{profile.error.message}<button className="ml-3 underline" onClick={() => { void profile.refetch(); }}>Try again</button></div>}
    {profile.data && <ProfileEditor key={profile.data.id} profile={profile.data} />}
  </main>;
}

function ProfileEditor({ profile }: { profile: UserProfile }) {
  const client = useQueryClient();
  const input = useRef<HTMLInputElement>(null);
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [bio, setBio] = useState(profile.bio ?? "");
  const [location, setLocation] = useState(profile.location ?? "");
  const [photoError, setPhotoError] = useState("");

  async function apply(updated: UserProfile) {
    await client.cancelQueries({ queryKey: ["my-profile", updated.id] });
    client.setQueryData(["my-profile", updated.id], updated);
    useAuthStore.getState().updateUser(updated);
    // Avatar/name changes also affect vouch, listing, review and dashboard queries.
    void client.invalidateQueries({ predicate: query => query.queryKey[0] !== "my-profile" });
  }
  const save = useMutation({ mutationFn: () => updateMyProfile({ firstName, lastName, bio, location }), onSuccess: apply });
  const photo = useMutation({ mutationFn: uploadMyProfileImage, onSuccess: apply });
  const remove = useMutation({ mutationFn: removeMyProfileImage, onSuccess: apply });
  const busy = save.isPending || photo.isPending || remove.isPending;
  const name = `${profile.firstName} ${profile.lastName}`;

  return <>
    <section className="space-y-4 rounded-lg border border-line bg-surface p-6">
      <div className="flex flex-wrap items-center gap-5"><UserAvatar name={name} imageUrl={profile.profileImageUrl} size={88} /><div><h2 className="font-serif text-2xl">{name}</h2><p className="text-sm text-muted">{profile.roles.includes("ADMIN") ? "Administrator" : profile.accessType === "LISTER" ? "Lister" : "Buyer"}</p></div></div>
      <p className="text-sm text-muted">Your photo is visible with your listings, reviews, and vouch activity. JPEG or PNG, up to 5 MB.</p>
      <input ref={input} type="file" accept="image/jpeg,image/png" aria-label="Choose profile photo" disabled={busy} onChange={event => {
        const file = event.target.files?.[0]; event.target.value = ""; setPhotoError("");
        if (!file) return;
        if (!["image/jpeg", "image/png"].includes(file.type) || file.size > 5 * 1024 * 1024) { setPhotoError("Choose a JPEG or PNG image up to 5 MB."); return; }
        photo.mutate(file);
      }} className="block w-full text-sm" />
      {profile.profileImageUrl && <button type="button" disabled={busy} onClick={() => remove.mutate()} className="text-sm text-brand underline">Remove photo</button>}
      {photo.isPending && <p role="status">Uploading photo…</p>}
      {(photo.isSuccess || remove.isSuccess) && <p role="status" className="text-brand">Profile photo updated.</p>}
      {(photoError || photo.error || remove.error) && <p role="alert" className="text-danger">{photoError || photo.error?.message || remove.error?.message}</p>}
    </section>
    <form onSubmit={event => { event.preventDefault(); save.mutate(); }} className="space-y-4 rounded-lg border border-line bg-surface p-6">
      <h2 className="font-serif text-xl">Profile details</h2>
      <fieldset disabled={busy} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2"><ProfileInput label="First name" value={firstName} onChange={setFirstName} required maxLength={100} /><ProfileInput label="Last name" value={lastName} onChange={setLastName} required maxLength={100} /></div>
        <ProfileInput label="Location" value={location} onChange={setLocation} maxLength={180} />
        <label className="block text-sm font-medium">About you<textarea value={bio} onChange={event => setBio(event.target.value)} maxLength={1000} rows={4} className="mt-2 w-full rounded-md border border-line bg-background p-3" /></label>
        <button type="submit" className="rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white">{save.isPending ? "Saving…" : "Save profile"}</button>
      </fieldset>
      {save.isSuccess && <p role="status" className="text-brand">Profile saved successfully.</p>}
      {save.error && <p role="alert" className="text-danger">{save.error.message}</p>}
    </form>
    <ContactEditor channel="EMAIL" value={profile.email} onVerified={apply} />
    <ContactEditor channel="PHONE" value={profile.phoneNumber} onVerified={apply} />
  </>;
}

function ContactEditor({ channel, value, onVerified }: { channel: "EMAIL" | "PHONE"; value: string; onVerified: (profile: UserProfile) => void }) {
  const [destination, setDestination] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [otp, setOtp] = useState("");
  const start = useMutation({ mutationFn: () => startContactChange({ channel, destination, currentPassword }), onSuccess: () => { setCurrentPassword(""); setOtp(""); } });
  const verify = useMutation({ mutationFn: () => verifyContactChange({ challengeId: start.data!.challengeId, otp }), onSuccess: profile => { onVerified(profile); start.reset(); setDestination(""); setOtp(""); } });
  return <section className="space-y-4 rounded-lg border border-line bg-surface p-6">
    <h2 className="font-serif text-xl">{channel === "EMAIL" ? "Email address" : "Phone number"}</h2><p className="break-all text-sm">{value}</p>
    <p className="text-sm text-muted">Confirm your password, then verify a six-digit code sent to the new {channel === "EMAIL" ? "email" : "phone"}. Your current contact stays unchanged until verification succeeds.</p>
    <form className="space-y-3" onSubmit={event => { event.preventDefault(); verify.reset(); start.mutate(); }}>
      <ProfileInput label={channel === "EMAIL" ? "New email" : "New phone (+country code)"} value={destination} onChange={next => { setDestination(next); start.reset(); verify.reset(); }} type={channel === "EMAIL" ? "email" : "tel"} required />
      <ProfileInput label="Current password" value={currentPassword} onChange={setCurrentPassword} type="password" required />
      <button disabled={start.isPending || verify.isPending} className="rounded-md border border-line px-4 py-2 text-sm">{start.isPending ? "Sending…" : "Send verification code"}</button>
    </form>
    {start.data && <form className="space-y-3" onSubmit={event => { event.preventDefault(); verify.mutate(); }}>
      <p role="status" className="text-sm text-brand">Code sent to {start.data.maskedDestination}. Expires at {new Date(start.data.expiresAt).toLocaleTimeString()}. Wait {start.data.resendAfterSeconds} seconds before requesting another.</p>
      <label className="block text-sm">Verification code<input value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" required className="mt-2 block w-full rounded-md border border-line bg-background p-3" /></label>
      <button disabled={verify.isPending} className="rounded-md bg-brand px-4 py-2 text-sm text-white">{verify.isPending ? "Verifying…" : "Verify and update"}</button>
    </form>}
    {verify.isSuccess && <p role="status" className="text-brand">Contact verified and updated successfully.</p>}
    {(start.error || verify.error) && <p role="alert" className="text-danger">{start.error?.message || verify.error?.message}</p>}
  </section>;
}

function ProfileInput({ label, value, onChange, type = "text", required = false, maxLength }: {
  label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean; maxLength?: number;
}) {
  return <label className="block text-sm font-medium">{label}<input type={type} value={value} onChange={event => onChange(event.target.value)} required={required} maxLength={maxLength} className="mt-2 w-full rounded-md border border-line bg-background p-3" /></label>;
}
