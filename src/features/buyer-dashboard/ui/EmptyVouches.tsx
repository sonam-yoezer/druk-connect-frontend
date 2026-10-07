import { Users } from "lucide-react";

export default function EmptyVouches() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#7A2E33]/10">
        <Users className="h-6 w-6 text-[#7A2E33]" />
      </div>

      <h3 className="mt-4 font-semibold text-[#1C2541]">No vouches yet</h3>

      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
        You haven't vouched for anyone yet. When you vouch for a trusted lister,
        they'll appear here.
      </p>
    </div>
  );
}
