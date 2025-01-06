"use client";

export default function HeroSec() {
  return (
    <section className="pt-20 pb-12 ">
      <div className="container mx-auto flex gap-3 md:gap-8 md:w-[94%] flex-col-reverse sm:flex-row items-center min-h-[45vh]">
        <div className="sm:w-3/5 flex flex-col items-start  my-8 sm:mt-0">
          <h1 className="text-4xl pb-2 sm:text-3xl lg:text-5xl font-extrabold leading-tight mb-4">
            Find a <span className="text-[#FF5722]">great job</span> near you...
          </h1>
          <p className="text-lg sm:text-xl text-justify tracking-tight max-w-md">
            Find your dream job today. View our job board for all available
            listings
            <span className="text-lg pl-2 text-[#FF5722] sm:text-xl max-w-md">
              and start your journey.
            </span>
          </p>
        </div>

        <div className="sm:w-3/5 flex justify-center sm:justify-end mb-10 sm:mb-0">
          <div className="max-w-xs sm:max-w-sm md:max-w-md">
            <img
              src="/project-team.svg"
              alt="Project Team Illustration"
              className="w-full h-auto rounded-lg "
            />
          </div>
        </div>
      </div>
      {/* <div className="text-3xl p-2 md:text-4xl font-bold text-center">
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
      </form> */}
    </section>
  );
}
