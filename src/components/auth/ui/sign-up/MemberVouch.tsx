"use client";

import { useState } from "react";
import { Check, Clock, Search, ShieldCheck } from "lucide-react";

import {
  Avatar,
  Button,
  Hint,
  Label,
  StepHeading,
  TextInput,
  cn,
} from "../Primitives";

import { useMemberSearch } from "../../hooks/useMemberSearch";
import { useVouchCount } from "../../hooks/useVouchCount";

import type { VouchUserSearchResponse } from "../../types/vouches";
import { useInviteUser } from "../../hooks/useInviteUser";
import { useRequestVouch } from "../../hooks/useRequestVouch";

interface MemberVouchProps {
  userId: string | null;
  onNext: () => void;
}

export function MemberVouch({ userId, onNext }: MemberVouchProps) {
  const [search, setSearch] = useState("");
  const [inviteTo, setInviteTo] = useState("");
  const [inviteSent, setInviteSent] = useState(false);

  const {
    mutate: requestVouch,
    isPending: isRequestingVouch,
    error: requestVouchError,
  } = useRequestVouch();
  /**
   * Requests sent during this signup session.
   *
   * This is only local UI state for now.
   * The backend vouch count remains the source of truth
   * for whether the requirement has actually been completed.
   */
  const [pending, setPending] = useState<VouchUserSearchResponse[]>([]);

  /**
   * Vouch requirement
   */
  const {
    activeVouches,
    requiredVouches,
    remainingVouches,
    requirementMet,
    isLoading: isVouchCountLoading,
    error: vouchCountError,
    refetch: refetchVouchCount,
  } = useVouchCount(userId);

  const {
    mutate: inviteUser,
    isPending: isInviting,
    error: inviteError,
  } = useInviteUser();

  /**
   * Member search
   */
  const {
    results,
    isLoading: isMemberSearchLoading,
    error: memberSearchError,
  } = useMemberSearch(userId, search);

  /**
   * Remove duplicate users returned by the API.
   */
  const uniqueResults = Array.from(
    new Map(results.map((member) => [member.userId, member])).values(),
  );

  const handleAskToVouch = (member: VouchUserSearchResponse) => {
    console.log("=== VOUCH REQUEST DEBUG ===");
    console.log("Selected member:", member);
    console.log("Selected member ID:", member.userId);
    console.log("Lister user ID:", userId);
    if (!userId) {
      return;
    }

    const alreadyPending = pending.some(
      (item) => item.userId === member.userId,
    );

    if (alreadyPending || pending.length >= requiredVouches || requirementMet) {
      return;
    }

    requestVouch(
      {
        requesterUserId: userId,
        payload: {
          targetUserId: member.userId,
          message: "I'd like you to vouch for me as a community member.",
        },
      },
      {
        onSuccess: () => {
          setPending((current) => {
            if (
              current.some((item) => item.userId === member.userId) ||
              current.length >= requiredVouches
            ) {
              return current;
            }

            return [...current, member];
          });

          setSearch("");

          // Refresh the backend vouch/request status.
          refetchVouchCount();
        },
      },
    );
  };

  /**
   * Remove a locally pending request.
   *
   * This currently only changes the UI.
   * Once the real request API is connected,
   * this should call the backend instead.
   */
  const handleWithdraw = (memberId: string) => {
    setPending((current) =>
      current.filter((member) => member.userId !== memberId),
    );
  };

  /**
   * Continue only after the backend confirms
   * that the vouch requirement is complete.
   */
  const handleContinue = () => {
    if (!requirementMet) {
      return;
    }

    onNext();
  };

  /**
   * Invite someone who isn't currently on DrukConnect.
   */
  const handleSendInvite = () => {
    const email = inviteTo.trim();

    if (!email || !userId) {
      return;
    }

    inviteUser(
      {
        userId,
        data: {
          email,
          message:
            "I'd like you to join DrukConnect and vouch for me as a community member.",
        },
      },
      {
        onSuccess: () => {
          setInviteSent(true);
          setInviteTo("");
        },
      },
    );
  };

  const searchActive = search.trim().length >= 2;

  return (
    <div className="animate-step">
      {/* Heading */}
      <StepHeading
        title="Two members vouch for you"
        description="Posting a listing needs two vouches from members who already know you. Ask people you trust and we'll keep your progress updated."
      />

      {/* ─────────────────────────────────────────
          Vouch progress
      ───────────────────────────────────────── */}
      <section className="mb-6 border-b border-line pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[13px] font-semibold text-ink">
              Community vouch
            </p>

            <p className="mt-1 text-[12.5px] text-muted">
              Two community members need to vouch for you.
            </p>
          </div>

          {!isVouchCountLoading && (
            <span
              className={cn(
                "shrink-0 text-sm font-semibold",
                requirementMet ? "text-jade" : "text-ink",
              )}
            >
              {activeVouches}/{requiredVouches}
            </span>
          )}
        </div>

        {!isVouchCountLoading && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            {Array.from({ length: requiredVouches }, (_, index) => {
              const completed = index < activeVouches;

              return (
                <div
                  key={`vouch-slot-${index}`}
                  className={cn(
                    "flex h-10 items-center gap-2 rounded-lg border px-3 text-xs font-medium",
                    completed
                      ? "border-jade/30 bg-jade-tint text-jade"
                      : "border-line bg-surface text-muted",
                  )}
                >
                  {completed ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
                  )}

                  <span>Vouch {index + 1}</span>

                  <span className="ml-auto">
                    {completed ? "Complete" : "Needed"}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {!isVouchCountLoading && !requirementMet && (
          <p className="mt-3 text-[12px] text-muted">
            {remainingVouches} more{" "}
            {remainingVouches === 1 ? "vouch is" : "vouches are"} needed.
          </p>
        )}

        {requirementMet && (
          <p className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-jade">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            Vouch requirement completed
          </p>
        )}
      </section>

      {/* ─────────────────────────────────────────
          Vouch count error
      ───────────────────────────────────────── */}
      {vouchCountError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3">
          <p className="text-[13px] text-red-600">
            {vouchCountError.message || "Unable to check your vouch status."}
          </p>

          <button
            type="button"
            onClick={() => refetchVouchCount()}
            className="mt-1.5 text-[12.5px] font-medium text-red-700 underline underline-offset-2"
          >
            Try again
          </button>
        </div>
      )}

      {requestVouchError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3">
          <p className="text-[13px] text-red-600">
            {requestVouchError.message || "Unable to send vouch request."}
          </p>
        </div>
      )}

      {/* ─────────────────────────────────────────
          Pending vouch requests
      ───────────────────────────────────────── */}
      {pending.length > 0 && (
        <section className="grid grid-cols-2 gap-2.5">
          {pending.map((member) => {
            const memberName = `${member.firstName} ${member.lastName}`.trim();

            return (
              <div
                key={`pending-${member.userId}`}
                className="rounded-xl border border-line bg-surface p-3.5"
              >
                <div className="flex items-center">
                  <Avatar name={memberName} tone="ink" size={32} />
                </div>

                <p className="mt-2.5 truncate text-[13.5px] font-medium text-ink">
                  {memberName}
                </p>

                <p className="mt-0.5 flex items-center gap-1 text-[12px] text-faint">
                  <Clock className="h-3 w-3" strokeWidth={2} />
                  Waiting for reply
                </p>
              </div>
            );
          })}
        </section>
      )}

      {/* ─────────────────────────────────────────
          Why vouches
      ───────────────────────────────────────── */}
      <div className="mt-4 flex gap-3 rounded-xl border border-brand-line bg-brand-tint p-3.5">
        <ShieldCheck
          className="mt-px h-4.5 w-4.5 shrink-0 text-brand"
          strokeWidth={1.8}
        />

        <p className="text-[13px] leading-5 text-muted">
          Two real members help keep DrukConnect trusted and make it harder for
          fake accounts and scammers to join the marketplace.
        </p>
      </div>

      {/* ─────────────────────────────────────────
          Member search
      ───────────────────────────────────────── */}
      <section className="mt-7">
        <Label htmlFor="member-search">Find a member who knows you</Label>

        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4.25 w-4.25 -translate-y-1/2 text-faint"
            strokeWidth={1.8}
          />

          <TextInput
            id="member-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name"
            autoComplete="off"
            className="pl-10"
          />
        </div>

        {searchActive && (
          <div className="mt-2 overflow-hidden rounded-xl border border-line">
            {isMemberSearchLoading ? (
              <p className="bg-surface px-3.5 py-4 text-[13px] text-muted">
                Searching members...
              </p>
            ) : memberSearchError ? (
              <p className="bg-surface px-3.5 py-4 text-[13px] text-danger">
                {memberSearchError.message}
              </p>
            ) : uniqueResults.length === 0 ? (
              <p className="bg-surface px-3.5 py-4 text-[13px] text-faint">
                No members match that name.
              </p>
            ) : (
              <ul className="divide-y divide-line">
                {uniqueResults.map((member) => {
                  const memberName =
                    `${member.firstName} ${member.lastName}`.trim();

                  const alreadyPending = pending.some(
                    (item) => item.userId === member.userId,
                  );

                  const cannotRequest =
                    alreadyPending ||
                    pending.length >= requiredVouches ||
                    requirementMet;

                  return (
                    <li
                      key={`search-${member.userId}`}
                      className="flex items-center justify-between gap-3 bg-surface px-3.5 py-3"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <Avatar name={memberName} size={32} />

                        <div className="min-w-0">
                          <p className="truncate text-[13.5px] font-medium text-ink">
                            {memberName}
                          </p>

                          <p className="truncate text-[12px] text-faint">
                            {member.email}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={cannotRequest || isRequestingVouch}
                        onClick={() => handleAskToVouch(member)}
                        className="shrink-0 rounded-lg border border-line-strong px-3 py-1.5 text-[12.5px] font-medium text-ink transition hover:border-brand hover:bg-brand-tint hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {alreadyPending
                          ? "Request sent"
                          : isRequestingVouch
                            ? "Sending..."
                            : "Ask to vouch"}{" "}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────
          Invite
      ───────────────────────────────────────── */}
      <section className="mt-6 rounded-xl border border-line bg-surface p-4">
        <p className="text-[13.5px] font-medium text-ink">
          Not on DrukConnect yet?
        </p>

        <p className="mt-1 text-[12.5px] leading-5 text-muted">
          Invite them. When they finish signing up, we'll ask if they want to
          vouch for you.
        </p>

        <div className="mt-3 flex gap-2">
          <TextInput
            type="email"
            value={inviteTo}
            onChange={(event) => {
              setInviteTo(event.target.value);
              setInviteSent(false);
            }}
            placeholder="Their email address"
            autoComplete="email"
            className="h-10 flex-1 text-[14px]"
          />

          <Button
            type="button"
            variant="secondary"
            disabled={!inviteTo.trim() || !userId || isInviting}
            onClick={handleSendInvite}
            className="h-10 shrink-0 px-4 text-[13.5px]"
          >
            {isInviting ? "Sending..." : "Send invite"}
          </Button>
        </div>

        {inviteError && (
          <p className="mt-2 text-[12.5px] text-danger">
            {inviteError.message || "Unable to send invitation."}
          </p>
        )}

        {inviteSent && (
          <Hint>
            <span className="text-jade">Invite sent.</span> We'll let you know
            when they join.
          </Hint>
        )}
      </section>

      {/* ─────────────────────────────────────────
          Continue
      ───────────────────────────────────────── */}
      <div className="mt-8">
        <Button
          type="button"
          fullWidth
          disabled={!requirementMet || isVouchCountLoading}
          onClick={handleContinue}
        >
          {isVouchCountLoading
            ? "Checking vouches..."
            : requirementMet
              ? "Continue"
              : `Need ${remainingVouches} more ${
                  remainingVouches === 1 ? "vouch" : "vouches"
                }`}
        </Button>
      </div>
    </div>
  );
}
