"use client";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  searchReviewRecipients,
  markAvailedAndRequestReview,
} from "../api/reviewRequests";
import { ChevronDown, ChevronUp, MessageSquareText } from "lucide-react";

export function RequestReviewPanel({ listingId }: { listingId: string }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const client = useQueryClient();
  const query = search.trim();
  const buyers = useQuery({
    queryKey: ["review-recipients", listingId, query, page],
    queryFn: ({ signal }) =>
      searchReviewRecipients(listingId, query, page, signal),
    enabled: open && query.length >= 2,
    retry: false,
  });
  const send = useMutation({
    mutationFn: (buyerId: string) =>
      markAvailedAndRequestReview(
        listingId,
        buyerId,
        buyers.data?.buyers?.find((buyer) => buyer.userId === buyerId)
          ?.requestPending,
      ),
    onSettled: () => {
      void client.invalidateQueries({
        queryKey: ["review-recipients", listingId],
      });
      void client.invalidateQueries({ queryKey: ["service-availed-history"] });
    },
  });
  return (
    <section className="mt-4 rounded-md border border-line bg-surface p-5">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`review-panel-${listingId}`}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-brand/20 bg-brand/5 px-4 py-3.5 text-left transition-all duration-200 hover:border-brand/40 hover:bg-brand/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
            <MessageSquareText className="h-5 w-5" />
          </span>

          <span className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-ink">
              {open ? "Close review panel" : "Request a review"}
            </span>
            <span className="text-xs text-muted">
              Mark a completed service and invite the buyer to review
            </span>
          </span>
        </span>

        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-muted" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted" />
        )}
      </button>
      {open && (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-muted">
            Mark this service as availed by a Buyer. It will appear in both
            accounts’ Service Availed History. We’ll also email them an
            invitation to review this service.
          </p>
          <label
            htmlFor={`review-search-${listingId}`}
            className="block text-sm font-semibold"
          >
            Find a Buyer by name, email or phone
          </label>
          <input
            id={`review-search-${listingId}`}
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            type="search"
            placeholder="Type at least two characters…"
            className="w-full rounded-md border border-line bg-background p-3"
          />
          {buyers.isFetching && <p role="status">Searching…</p>}
          {buyers.error && (
            <p role="alert" className="text-danger">
              {buyers.error.message}
            </p>
          )}
          {query.length >= 2 && buyers.data?.buyers?.length === 0 && (
            <p>No Buyers found.</p>
          )}
          {send.isSuccess && (
            <p role="status" className="rounded-md bg-brand-tint p-3">
              {send.data.message} Marked for {send.data.buyerName}.
            </p>
          )}
          {send.error && (
            <p role="alert" className="text-danger">
              {send.error.message}
            </p>
          )}
          {query.length >= 2 &&
            buyers.data?.buyers?.map((buyer) => (
              <div
                key={buyer.userId}
                className="space-y-2 border-t border-line py-3"
              >
                <p className="font-semibold">
                  {buyer.firstName} {buyer.lastName}
                </p>
                <p className="break-all text-sm text-muted">
                  {buyer.email} · {buyer.phoneNumber}
                </p>
                <button
                  type="button"
                  disabled={
                    send.isPending ||
                    (buyer.serviceAvailed &&
                      (buyer.requestPending || buyer.alreadyReviewed)) ||
                    (send.isSuccess && send.variables === buyer.userId)
                  }
                  onClick={() => send.mutate(buyer.userId)}
                  className="rounded-md bg-brand px-3 py-2 text-sm text-white disabled:opacity-50"
                >
                  {buyer.serviceAvailed && buyer.alreadyReviewed
                    ? "Already reviewed"
                    : (buyer.serviceAvailed && buyer.requestPending) ||
                        (send.isSuccess && send.variables === buyer.userId)
                      ? "Marked · Review requested"
                      : send.isPending && send.variables === buyer.userId
                        ? "Saving and sending…"
                        : buyer.serviceAvailed
                          ? "Request Review"
                          : "Mark as Avail"}
                </button>
              </div>
            ))}
          {query.length >= 2 && buyers.data && (
            <div className="flex justify-between text-sm">
              <button
                disabled={!buyers.data.hasPrevious || buyers.isFetching}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <span>Page {page}</span>
              <button
                disabled={!buyers.data.hasNext || buyers.isFetching}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
          <a
            href="/lister-dashboard/service-availed-history"
            className="block text-sm font-semibold text-brand underline"
          >
            View Service Availed History
          </a>
        </div>
      )}
    </section>
  );
}
