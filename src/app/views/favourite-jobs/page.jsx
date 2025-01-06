"use client";
import HeroSec from "@/app/components/HeroSec";
import { Status } from "@/app/globals/status";

import { fetchFavouriteJobsByEmail } from "@/app/store/slices/favouriteJobsSlice";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiLoader, FiLock } from "react-icons/fi";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
const defaultImage = "/images/defaultImage.jpg";

export default function FavouriteJob() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const { FavJobs, status } = useSelector((state) => state.favJob);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    }
  }, []);

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchFavouriteJobsByEmail(user.email));
    }
  }, [user?.email, dispatch]);

  return (
    <>
      <HeroSec />
      <div className="overflow-y-auto flex items-center justify-center mb-5">
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

          {!user ? (
            <>
              <div className="overflow-y-auto flex items-center justify-center py-10">
                <div className="flex flex-col items-center justify-center p-8 rounded-3xl shadow-xl space-y-4">
                  <div className="text-5xl animate__animated animate__fadeIn">
                    <FiLock className="inline-block text-5xl mb-3" />
                  </div>
                  <p className="text-xl font-bold mb-2 animate__animated animate__fadeIn animate__delay-1s">
                    You must be logged in to see favourite Jobs.
                  </p>
                  <p className="text-sm opacity-90 animate__animated animate__fadeIn animate__delay-2s text-center">
                    Please log in to access favourite Jobs.
                  </p>
                </div>
              </div>
            </>
          ) : status === Status.LOADING ? (
            <>
              <div
                role="status"
                aria-label="loading"
                className="flex justify-center items-center py-20"
              >
                <FiLoader className="animate-spin text-indigo-600 w-6 h-6" />
                <span className="sr-only">Loading...</span>
              </div>
            </>
          ) : FavJobs.length === 0 ? (
            <p className="m-4 md:m-6 text-center">
              You have no favourite jobs yet.
            </p>
          ) : (
            <div>
              {FavJobs.map((favJob) => (
                <Link
                  href={`/views/jobs/${favJob.job._id}`}
                  key={favJob.job._id}
                  className="bg-white  flex m-4 md:m-6 flex-col md:flex-row justify-between gap-4 rounded-lg p-4 text-gray-700 shadow hover:shadow-sm"
                >
                  <div className="flex md:gap-5 text-sm sm:text-lg">
                    <div className="relative h-[85px] w-[85px] object-cover rounded-xl m-1 overflow-hidden  order-2 md:order-1 p-2">
                      <Image
                        src={favJob.job.companyLogo || defaultImage}
                        alt="Invision company logo"
                        // layout="fill"
                        width={500}
                        height={500}
                        objectFit="contain"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col grow space-y-1 pt-1 md:space-y-0 justify-between order-1 md:order-2">
                      <h3 className="text-base text-gray-800 capitalize">
                        {favJob.job.companyName}
                      </h3>
                      <h6 className="text-xl capitalize md:text-2xl text-[#FF5722] font-semibold sm:text-xl">
                        {favJob.job.jobPosition}
                      </h6>
                      <div className="flex flex-col text-sm sm:text-base gap-1 md:flex-row md:gap-2">
                        <span className="text-sm ">
                          Experience:
                          <span className="bg-green-100  text-green-900 px-2 py-0.5 rounded-full">
                            {favJob.job.experience}
                          </span>
                        </span>
                        <span>
                          Salary:
                          <span className="bg-blue-100  text-blue-900 px-2 py-0.5 rounded-full">
                            {favJob.job.salary}
                          </span>
                        </span>
                      </div>
                      <div className="text-gray-500 flex md:pt-2 capitalize flex-wrap text-sm ">
                        {favJob.job.jobType} &middot; {favJob.job.location}{" "}
                        &middot; {favJob.job.jobMode}
                      </div>
                    </div>
                  </div>
                  <div className="flex  text-sm pb-2 gap-2 items-center justify-end pt-1 md:p-4">
                    <div className="">
                      {favJob.createdAt
                        ? formatDistanceToNow(new Date(favJob.createdAt), {
                            addSuffix: true,
                          })
                        : ""}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
