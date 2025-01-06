"use client";
import SearchIcon from "@mui/icons-material/Search";

export default function HeroSec() {
  return (
    <section className="pt-20 pb-6">
      <div className="text-3xl p-2 md:text-4xl font-bold text-center">
        Find Your Next <br />
        <span className="text-[#FF5722] pt-2">Dream Job...</span>
      </div>
      <form className="flex gap-2 mt-8 max-w-md mx-auto">
        <input
          type="search"
          className="border border-gray-400 w-full py-2 px-3 rounded-lg outline-none focus:border-gray-600"
          placeholder="Search Dream Job..."
          aria-label="Search Dream Job"
        />
        <button
          className="py-2 px-3 bg-[#FF5722] rounded-lg "
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      </form>
    </section>
  );
}
