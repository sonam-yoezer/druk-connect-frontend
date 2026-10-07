import SignupPage from "@/src/features/auth/SignupPage";
import { RedirectIfAuthenticatedRoute } from "@/src/shared/routes/RedirectIfAuthenticatedRoute";

export default function Signup() {
  return (
    <RedirectIfAuthenticatedRoute>
      <SignupPage />
    </RedirectIfAuthenticatedRoute>
  );
}
