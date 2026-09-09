import { Search } from "lucide-react";

const cities = ["All cities", "Perth", "Melbourne", "Sydney", "Canberra"];

export function SearchBar() {
  return (
    <div className="flex max-w-[560px] gap-2 rounded border-[1.5px] border-ink bg-paper-raised p-2 max-[560px]:flex-col">
      <div className="flex flex-1 items-center">
        <Search className="ml-2 h-4 w-4 shrink-0 text-slate" />

        <input
          type="text"
          placeholder="Try 'car rental in Perth'"
          className="w-full border-none bg-transparent px-3 py-2.5 text-[15px] outline-none placeholder:text-slate"
        />
      </div>

      <select
        defaultValue="All cities"
        className="border-l border-line bg-transparent px-3 text-sm text-slate outline-none max-[560px]:border-l-0 max-[560px]:border-t max-[560px]:pt-2"
      >
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <button type="button" className="btn btn-primary shrink-0 px-[22px]">
        Search
      </button>
    </div>
  );
}
