"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useVouchRecoveryStore } from "./store/vouchRecoveryStore";
import { useAuthStore } from "./store/authStore";
import { useLogin } from "./hooks/useLogin";
import { SignInForm } from "./ui/sign-in/SignInForm";
import { Button, Label, TextInput } from "./ui/Primitives";
import { searchRecoveryBuyers, requestRecoveryVouch, inviteRecoveryBuyer, getRecoveryVouchCount, getRecoveryRequestCount } from "./api/vouchRecovery";
import { getDashboardRoute } from "@/src/shared/routes/getDashboardRoute";

export default function VouchRecoveryPage() {
  const router = useRouter();
  const { session, expiresAt, pendingBuyerIds, markPending, clear, start, complete } = useVouchRecoveryStore();
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [queryInput, setQueryInput] = useState("");
  const query = queryInput.trim();
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const login = useLogin();

  useEffect(() => {
    if (!session) return;
    const timer = setTimeout(() => {
      clear();
      setError("Your recovery session has expired. Sign in again to continue.");
    }, Math.max(0, expiresAt - Date.now()));
    return () => clearTimeout(timer);
  }, [session, expiresAt, clear]);

  const vouchCount = useQuery({
    queryKey: ["vouch-recovery-count", session?.vouchRecoveryToken],
    queryFn: ({ signal }) => getRecoveryVouchCount(signal),
    enabled: Boolean(session),
    refetchInterval: session ? 5000 : false,
    retry: false,
  });
  const requestCount = useQuery({
    queryKey: ["vouch-recovery-request-count", session?.vouchRecoveryToken],
    queryFn: ({ signal }) => getRecoveryRequestCount(signal),
    enabled: Boolean(session),
    refetchInterval: session ? 5000 : false,
    retry: false,
  });

  useEffect(() => {
    if (!session || !vouchCount.data?.requirementMet || vouchCount.data.userId !== session.user.id) return;
    complete();
    router.replace("/auth/login");
  }, [session, vouchCount.data, complete, router]);

  const buyers = useQuery({
    queryKey: ["vouch-recovery-buyers", session?.vouchRecoveryToken, query, page],
    queryFn: ({ signal }) => searchRecoveryBuyers(query, page, signal),
    enabled: Boolean(session && query.length >= 2),
    retry: false,
  });
  const request = useMutation({
    mutationFn: requestRecoveryVouch,
    onSuccess: (response, buyerId) => {
      if (response.status === "PENDING") markPending(buyerId);
      setNotice(response.message || "Vouch request sent successfully.");
      void requestCount.refetch();
      void vouchCount.refetch();
    },
    onError: (error: Error) => setError(error.message),
  });
  const invite = useMutation({
    mutationFn: inviteRecoveryBuyer,
    onSuccess: () => {
      setEmail("");
      void requestCount.refetch();
      void vouchCount.refetch();
    },
  });

  const resetFeedback = () => { setError(""); setNotice(""); };
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-ink">
      <div className="mx-auto max-w-2xl space-y-6">
        <Link href="/auth/login" className="text-brand underline">Back to sign in</Link>
        <h1 className="font-serif text-3xl">Restore your access</h1>
        <p className="text-muted">Request another vouch from a registered Buyer or invite someone by email.</p>
        {error && <p role="alert" className="rounded-lg bg-danger-tint p-4 text-danger">{error}</p>}
        {notice && <p role="status" className="rounded-lg bg-brand-tint p-4">{notice}</p>}
        {!session ? (
          <>
            <p>Sign in to verify your account and start a temporary recovery session. If you refresh this page, sign in again.</p>
            <SignInForm isLoading={login.isPending} onSubmit={(data) => {
              resetFeedback();
              login.mutate({ identifier: data.email, password: data.password }, {
                onSuccess: (response) => {
                  if (response.loginStatus === "VOUCH_REQUIRED") {
                    useAuthStore.getState().clearSession();
                    start(response);
                  } else if (response.loginStatus === "AUTHENTICATED" && response.tokens?.accessToken && response.tokens?.refreshToken) {
                    clear();
                    useAuthStore.getState().setSession(response.tokens);
                    router.push(getDashboardRoute(response.tokens.user));
                  } else {
                    useAuthStore.getState().clearSession();
                    setError("Unable to sign in: invalid login response.");
                  }
                },
                onError: (error) => setError(error.message),
              });
            }} />
          </>
        ) : (
          <>
            <section className="space-y-3 rounded-xl border border-line-strong bg-surface p-5">
              <h2 className="text-xl font-medium">Your vouch progress</h2>
              <p>You currently have {vouchCount.data?.activeVouches ?? session.activeVouchCount} active vouches out of {vouchCount.data?.requiredVouches ?? session.requiredVouchCount} required. You need {vouchCount.data?.remainingVouches ?? session.vouchesNeeded} more to restore full access.</p>
              {requestCount.data && <p>Pending vouch requests: {requestCount.data.pendingRequestCount}</p>}
              {(vouchCount.isPending || requestCount.isPending) && <p role="status" className="text-sm text-muted">Checking your progress…</p>}
              {vouchCount.error && <p role="alert" className="text-danger">{vouchCount.error.message}</p>}
              {requestCount.error && <p role="alert" className="text-danger">{requestCount.error.message}</p>}
              <p className="text-sm text-muted">Progress updates automatically every five seconds. Once you meet the requirement, we’ll take you to sign in.</p>
              <Button variant="secondary" loading={vouchCount.isFetching || requestCount.isFetching} onClick={() => { void vouchCount.refetch(); void requestCount.refetch(); }}>Refresh progress</Button>
            </section>
            <section className="space-y-4 rounded-xl border border-line-strong bg-surface p-5">
              <h2 className="text-xl font-medium">Find a registered Buyer</h2>
              <div className="space-y-3">
                <Label htmlFor="buyer-search">Name, email or phone</Label>
                <TextInput id="buyer-search" type="search" value={queryInput} onChange={(event) => {
                  setQueryInput(event.target.value);
                  setPage(1);
                }} placeholder="Start typing to find a member…" />
                {query.length < 2 && <p className="text-sm text-muted">Type at least two characters to search. Results appear as you type.</p>}
                {query.length >= 2 && buyers.isFetching && <p role="status" className="text-sm text-muted">Searching members…</p>}
              </div>
              {query.length >= 2 && buyers.error && <p role="alert" className="text-danger">{buyers.error.message}</p>}
              {query.length >= 2 && !buyers.isFetching && buyers.data?.buyers?.length === 0 && <p>No registered Buyers found. Try another search or invite someone below.</p>}
              {query.length >= 2 && buyers.data?.buyers?.map((buyer) => (
                <div key={buyer.userId} className="flex flex-wrap items-center justify-between gap-3 border-t border-line-strong py-3">
                  <div><p>{buyer.firstName} {buyer.lastName}</p><p className="text-sm text-muted">{buyer.email}</p></div>
                  <Button disabled={request.isPending || buyer.alreadyVouched || buyer.requestPending || pendingBuyerIds.includes(buyer.userId)} onClick={() => { resetFeedback(); request.mutate(buyer.userId); }}>
                    {buyer.alreadyVouched ? "Already Vouched" : buyer.requestPending || pendingBuyerIds.includes(buyer.userId) ? "Request Pending" : request.isPending && request.variables === buyer.userId ? "Sending…" : "Request Vouch"}
                  </Button>
                </div>
              ))}
              {query.length >= 2 && buyers.data?.currentPage !== undefined && buyers.data?.totalPages !== undefined && <div className="flex items-center gap-3">
                <Button variant="secondary" disabled={!buyers.data.hasPrevious || buyers.isFetching} onClick={() => setPage(page - 1)}>Previous</Button>
                <span>Page {buyers.data.currentPage} of {Math.max(1, buyers.data.totalPages)}</span>
                <Button variant="secondary" disabled={!buyers.data.hasNext || buyers.isFetching} onClick={() => setPage(page + 1)}>Next</Button>
              </div>}
            </section>
            <section className="space-y-4 rounded-xl border border-line-strong bg-surface p-5">
              <h2 className="text-xl font-medium">Invite someone by email</h2>
              <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); resetFeedback(); invite.mutate(email.trim()); }}>
                <Label htmlFor="invite-email">Email address</Label>
                <TextInput id="invite-email" type="email" required value={email} disabled={invite.isPending} onChange={(event) => { setEmail(event.target.value); invite.reset(); }} />
                <Button type="submit" loading={invite.isPending} disabled={!email.trim()}>{invite.isPending ? "Sending invitation…" : "Send invitation"}</Button>
                {invite.isSuccess && <p role="status" className="rounded-lg bg-brand-tint p-3 text-sm">{invite.data.message || "Invitation sent successfully."} Sent to {invite.variables}.</p>}
                {invite.isError && <p role="alert" className="rounded-lg bg-danger-tint p-3 text-sm text-danger">{invite.error.message || "Unable to send invitation. Please try again."}</p>}
              </form>
            </section>
            <Button variant="quiet" onClick={() => { clear(); resetFeedback(); }}>End recovery session</Button>
          </>
        )}
      </div>
    </main>
  );
}
