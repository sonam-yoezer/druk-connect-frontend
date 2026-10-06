import VouchRecoveryPage from "@/src/components/auth/VouchRecoveryPage";
import { RedirectIfAuthenticatedRoute } from "@/src/shared/routes/RedirectIfAuthenticatedRoute";

export default function Page() {
  return <RedirectIfAuthenticatedRoute><VouchRecoveryPage /></RedirectIfAuthenticatedRoute>;
}
