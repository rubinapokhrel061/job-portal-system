import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

import { useEffect } from "react";
import { fetchJobs } from "@/app/store/slices/jobSlice";
import { Status } from "@/app/globals/status";
import { FiLoader } from "react-icons/fi";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function JobList() {
  const dispatch = useDispatch();
  const { jobs, status, currentPage, totalPages } = useSelector(
    (state) => state.jobs
  );

  useEffect(() => {
    dispatch(fetchJobs(currentPage));
  }, [dispatch, currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(fetchJobs(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchJobs(currentPage + 1));
    }
  };

  return (
    <div className="py-8 my-4 grow bg-[#eef2f5] rounded-lg min-h-[300px]">
      <div className="flex justify-between">
        <Link href={`/`}>
          <h1 className="mx-4 md:m-6 font-bold">Recent Jobs..</h1>
        </Link>

        <Link href={"/views/favourite-jobs"}>
          <h1 className="mx-4 md:m-6 text-[#FF5722] font-bold">
            Favourite Jobs
          </h1>
        </Link>
      </div>

      {status === Status.LOADING ? (
        <div
          role="status"
          aria-label="loading"
          className="flex justify-center items-center py-20"
        >
          <FiLoader className="animate-spin text-indigo-600 w-6 h-6" />
          <span className="sr-only">Loading...</span>
        </div>
      ) : jobs.length === 0 ? (
        <div className="flex justify-center items-center py-20">
          <p>No jobs found</p>
        </div>
      ) : (
        <>
          {jobs.map((job, index) => (
            <Link
              href={`/views/jobs/${job._id}`}
              key={index}
              className="bg-white flex m-4 md:m-6 flex-col md:flex-row justify-between gap-4 rounded-lg p-4 text-gray-700 shadow hover:shadow-sm"
            >
              <div className="flex md:gap-5 text-sm sm:text-lg">
                <div className="relative h-[85px] w-[85px] object-cover rounded-xl m-1 overflow-hidden order-2 md:order-1 p-2">
                  <Image
                    src={job.companyLogo}
                    alt="Company Logo"
                    width={500}
                    height={500}
                    className="h-full w-full object-contain rounded-lg"
                  />
                </div>
                <div className="flex flex-col grow space-y-1 pt-1 md:space-y-0 justify-between order-1 md:order-2">
                  <h3 className="text-base text-gray-800 capitalize">
                    {job.companyName}
                  </h3>
                  <h6 className="text-xl capitalize md:text-2xl text-[#FF5722] font-semibold sm:text-xl">
                    {job.jobPosition}
                  </h6>
                  <div className="flex flex-col text-sm sm:text-base gap-1 pt-2 md:flex-row md:gap-2">
                    <span className="text-sm ">
                      Experience:
                      <span className="bg-green-100 text-green-900 px-2 py-0.5 rounded-full">
                        {job.experience}
                      </span>
                    </span>
                    <span>
                      Salary:
                      <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full">
                        {job.salary}
                      </span>
                    </span>
                  </div>
                  <div className="text-gray-500 flex md:pt-2 capitalize flex-wrap text-sm ">
                    {job.jobType} &middot; {job.location} &middot; {job.jobMode}
                  </div>
                </div>
              </div>
              <div className="flex text-sm pb-2 items-center justify-end">
                {job?.createdAt
                  ? formatDistanceToNow(new Date(job.createdAt), {
                      addSuffix: true,
                    })
                  : ""}
              </div>
            </Link>
          ))}

          <div className="flex justify-center gap-4 items-center mx-auto py-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="bg-gray-500 active:bg-[#FF5722] px-4 py-2 rounded-md text-white"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-500 active:bg-[#FF5722] px-4 py-2 rounded-md text-white"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
