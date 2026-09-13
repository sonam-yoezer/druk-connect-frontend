type Vouch = {
  id: number;
  userId: number;
  name: string;
  avatar: string;
  location: string;
  message: string;
  date: string;
};

type VouchCardProps = {
  vouch: Vouch;
  last: boolean;
};

export function VouchCard({ vouch, last }: VouchCardProps) {
  return (
    <article className={`p-6 sm:p-7 ${!last ? "border-b border-line" : ""}`}>
      <div className="flex items-start gap-4">
        <img
          src={vouch.avatar}
          alt={vouch.name}
          className="h-11 w-11 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-ink">{vouch.name}</h3>

              <p className="mt-1 text-xs text-muted">{vouch.location}</p>
            </div>

            <span className="shrink-0 text-xs text-faint">{vouch.date}</span>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
            “{vouch.message}”
          </p>
        </div>
      </div>
    </article>
  );
}
