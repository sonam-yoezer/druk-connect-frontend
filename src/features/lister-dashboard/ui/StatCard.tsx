type StatCardProps = {
  label: string;
  value: string;
  description: string;
};

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="border border-line bg-surface p-5">
      <p className="text-xs font-medium uppercase tracking-[0.1em] text-faint">
        {label}
      </p>

      <p className="mt-3 text-2xl font-semibold tracking-tight text-ink">
        {value}
      </p>

      <p className="mt-1 text-xs text-muted">{description}</p>
    </div>
  );
}
