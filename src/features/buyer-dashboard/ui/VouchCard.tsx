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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7A2E33] text-sm font-semibold text-white">
            {getInitials(vouch.listerName)}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-[#1C2541]">
              {vouch.listerName}
            </h3>

            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>Vouched {vouchedDate}</span>
            </div>
          </div>
        </div>

        <VouchStatus
          status={vouch.vouchStatus}
          withdrawalPending={vouch.withdrawalPending}
        />
      </div>

      <div className="mt-5 space-y-2.5 rounded-xl bg-gray-50 p-4">
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Mail className="h-4 w-4 shrink-0 text-gray-400" />
          <span className="truncate">{vouch.listerEmail}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Phone className="h-4 w-4 shrink-0 text-gray-400" />
          <span>{vouch.listerPhoneNumber}</span>
        </div>
      </div>

      {isActive && (
        <div className="mt-5 flex justify-end">
          {vouch.withdrawalPending ? (
            <div className="text-sm font-medium text-amber-700">
              Withdrawal request pending
            </div>
          ) : (
            <button
              type="button"
              onClick={onWithdraw}
              className="rounded-lg border border-[#7A2E33]/30 px-4 py-2 text-sm font-medium text-[#7A2E33] transition-colors hover:bg-[#7A2E33]/5"
            >
              Withdraw Vouch
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
