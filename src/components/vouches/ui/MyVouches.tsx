import { VouchCard } from "./VouchCard";

type Vouch = {
  id: number;
  userId: number;
  name: string;
  avatar: string;
  location: string;
  message: string;
  date: string;
};

type MyVouchesProps = {
  vouches: Vouch[];
};

export function MyVouches({ vouches }: MyVouchesProps) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
            Community trust
          </p>

          <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
            Your vouches
          </h2>
        </div>

        <span className="text-xs text-muted">{vouches.length} received</span>
      </div>

      <div className="mt-5 border border-line bg-surface">
        {vouches.length > 0 ? (
          vouches.map((vouch, index) => (
            <VouchCard
              key={vouch.id}
              vouch={vouch}
              last={index === vouches.length - 1}
            />
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm font-medium text-ink">No vouches yet</p>

            <p className="mt-1 text-xs text-muted">
              Vouches from people in the community will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
