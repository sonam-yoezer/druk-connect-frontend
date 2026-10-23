import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../auth/store/authStore";
import { useReportScam } from "../../listing/hooks/useReportScam";
import { ListingDetails } from "../../listing/types/listing";
import {
  recordReviewContact,
  getReviewEligibility,
  getReviewInvitation,
} from "../../reviews/api/reviewRequests";

type UseReviewFlowOptions = {
  listingId: ListingDetails["id"];
  reviewRequestId?: string;
  autoReview: boolean;
  contactReturn: boolean;
};

export function useReviewFlow({
  listingId,
  reviewRequestId,
  autoReview,
  contactReturn,
}: UseReviewFlowOptions) {
  const router = useRouter();
  const client = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);

  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [invitationDismissed, setInvitationDismissed] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewNotice, setReviewNotice] = useState("");

  const waitingForReturn = useRef(false);
  const contactRecorded = useRef<ReturnType<typeof recordReviewContact> | null>(
    null,
  );

  const eligibility = useQuery({
    queryKey: ["review-eligibility", listingId, userId],
    queryFn: () => getReviewEligibility(listingId),
    enabled: Boolean(userId),
    retry: false,
  });

  const invitation = useQuery({
    queryKey: ["review-invitation", reviewRequestId, userId],
    queryFn: () => getReviewInvitation(reviewRequestId!),
    enabled: Boolean(reviewRequestId && userId),
    retry: false,
  });

  const validInvitation =
    invitation.data?.listingId === listingId &&
    invitation.data?.buyerUserId === userId;

  const invitationReview =
    autoReview && (!reviewRequestId || validInvitation) && !invitationDismissed;

  const canReview = Boolean(eligibility.data?.canReview);

  const invalidateEligibility = () =>
    client.invalidateQueries({
      queryKey: ["review-eligibility", listingId, userId],
    });

  // When the buyer comes back from WhatsApp, check if they can review.
  useEffect(() => {
    const onReturn = () => {
      if (document.visibilityState !== "visible" || !waitingForReturn.current)
        return;

      waitingForReturn.current = false;

      void (contactRecorded.current || Promise.resolve(null))
        .then(() => getReviewEligibility(listingId))
        .then((result) => {
          void client.invalidateQueries({
            queryKey: ["review-eligibility", listingId, userId],
          });
          if (result.canReview) setShowReviewPrompt(true);
          else setReviewNotice(result.message);
        })
        .catch((error) => setReviewError(error.message));
    };

    window.addEventListener("focus", onReturn);
    document.addEventListener("visibilitychange", onReturn);

    return () => {
      window.removeEventListener("focus", onReturn);
      document.removeEventListener("visibilitychange", onReturn);
    };
  }, [listingId, userId, client]);

  const handleContacted = () => {
    setReviewError("");
    waitingForReturn.current = true;
    contactRecorded.current = recordReviewContact(listingId);

    void contactRecorded.current
      .then(() => invalidateEligibility())
      .catch((error) => {
        waitingForReturn.current = false;
        setReviewError(error.message);
      });
  };

  const openReviewModal = () => setShowReviewModal(true);

  const acceptReviewPrompt = () => {
    setShowReviewPrompt(false);
    setShowReviewModal(true);
    setInvitationDismissed(true);
  };

  const dismissReviewPrompt = () => {
    setShowReviewPrompt(false);
    setInvitationDismissed(true);
  };

  const closeReviewModal = () => {
    setShowReviewModal(false);
    setInvitationDismissed(true);

    if (reviewRequestId || contactReturn)
      router.replace(`/buyer-dashboard/services/${listingId}`, {
        scroll: false,
      });
  };

  const handleReviewSubmitted = () => {
    closeReviewModal();
    setReviewNotice(
      "Review submitted successfully and is awaiting admin approval.",
    );
    void invalidateEligibility();
    router.refresh();
  };

  const isPromptOpen =
    (showReviewPrompt || (contactReturn && !invitationDismissed)) &&
    canReview &&
    !showReviewModal;

  const isModalOpen = (showReviewModal || invitationReview) && canReview;

  return {
    eligibility,
    invitation,
    validInvitation,
    canReview,
    reviewError,
    reviewNotice,
    isPromptOpen,
    isModalOpen,
    handleContacted,
    openReviewModal,
    acceptReviewPrompt,
    dismissReviewPrompt,
    closeReviewModal,
    handleReviewSubmitted,
  };
}

export type ReviewFlow = ReturnType<typeof useReviewFlow>;

export function useReportFlow(listingId: ListingDetails["id"]) {
  const mutation = useReportScam();

  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const open = () => {
    setError("");
    setNotice("");
    setReason("");
    setDetails("");
    setIsOpen(true);
  };

  const close = () => {
    if (mutation.isPending) return;

    setIsOpen(false);
    setError("");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setNotice("");

    try {
      await mutation.mutateAsync({
        listingId,
        reason,
        details: details.trim(),
      });

      setIsOpen(false);
      setNotice(
        "Your report has been submitted successfully. Thank you for helping keep the community safe.",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to submit your report. Please try again.",
      );
    }
  };

  return {
    isOpen,
    reason,
    details,
    error,
    notice,
    isSubmitting: mutation.isPending,
    setReason,
    setDetails,
    open,
    close,
    submit,
  };
}
