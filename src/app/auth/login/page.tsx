import SigninPage from "@/src/components/auth/SigninPage";
import { RedirectIfAuthenticatedRoute } from "@/src/shared/routes/RedirectIfAuthenticatedRoute";

export default function Signin() {
  return (
    <RedirectIfAuthenticatedRoute>
      <SigninPage />
    </RedirectIfAuthenticatedRoute>
  );
}
