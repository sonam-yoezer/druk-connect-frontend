const flags = Array.from({ length: 20 });

export function PrayerFlags() {
  return (
    <div className="flex h-3.5 w-full">
      {flags.map((_, index) => {
        const colorIndex = index % 5;

        const colors = [
          "bg-pine",
          "bg-white",
          "bg-maroon",
          "bg-marigold",
          "bg-ink",
        ];

        return (
          <span
            key={index}
            className={`flex-1 [clip-path:polygon(0_0,100%_0,50%_100%)] ${colors[colorIndex]}`}
          />
        );
      })}
    </div>
  );
}
