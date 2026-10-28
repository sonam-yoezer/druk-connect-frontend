import { UserAvatar } from "@/src/shared/ui/UserAvatar";
import { CalendarDays, Mail, Phone } from "lucide-react";

import type { GivenVouch } from "../types/vouchRequest";
import VouchStatus from "./VouchStatus";

type VouchCardProps = {
  vouch: GivenVouch;
  onWithdraw: () => void;
};

export default function VouchCard({ vouch, onWithdraw }: VouchCardProps) {
  const vouchedDate = new Date(vouch.vouchedAt).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const isActive = vouch.vouchStatus === "ACTIVE";

  return (
    <article className="rounded-md border border-line bg-white p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <UserAvatar name={vouch.listerName} imageUrl={vouch.profileImageUrl} size={44} />

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-ink">
              {vouch.listerName}
            </h3>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
              <CalendarDays
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0"
              />
              <span>Vouched {vouchedDate}</span>
            </div>
          </div>
        </div>

        <VouchStatus
          status={vouch.vouchStatus}
          withdrawalPending={vouch.withdrawalPending}
        />
      </div>

      <div className="mt-5 space-y-3 rounded-md bg-background p-4">
        <div className="flex min-w-0 items-center gap-3 text-sm text-muted">
          <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-muted" />
          <span className="truncate">{vouch.listerEmail}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted">
          <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-muted" />
          <span>{vouch.listerPhoneNumber}</span>
        </div>
      </div>

      {isActive && (
        <div className="mt-5 flex justify-end border-t border-line pt-4">
          {vouch.withdrawalPending ? (
            <p className="text-sm font-medium text-amber-700">
              Withdrawal request pending
            </p>
          ) : (
            <button
              type="button"
              onClick={onWithdraw}
              className="rounded-md border border-[#7A2E33]/30 px-4 py-2 text-sm font-medium text-[#7A2E33] transition-colors hover:bg-[#7A2E33]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A2E33] focus-visible:ring-offset-2"
            >
              Withdraw vouch
            </button>
          )}
        </div>
      )}
    </article>
  );
}
