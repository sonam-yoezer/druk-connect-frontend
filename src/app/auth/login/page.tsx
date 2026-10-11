import SigninPage from "@/src/features/auth/SigninPage";
import { RedirectIfAuthenticatedRoute } from "@/src/shared/routes/RedirectIfAuthenticatedRoute";

export default async function Signin({ searchParams }: { searchParams: Promise<{ redirect?: string }> }) {
  const { redirect } = await searchParams;
  return (
    <RedirectIfAuthenticatedRoute redirectTo={redirect}>
      <SigninPage redirectTo={redirect} />
    </RedirectIfAuthenticatedRoute>
  );
}
