"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  addToFavourites,
  removeFromFavourites,
} from "@/app/store/slices/favouriteJobsSlice";
import { fetchJobById } from "@/app/store/slices/jobSlice";
import Link from "next/link";
import { Status } from "@/app/globals/status";
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

export default function JobDetails() {
  const { id } = useParams();
  const { singleJob, status } = useSelector((state) => state.jobs);
  const { FavJobs } = useSelector((state) => state.favJob);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setEmail(parsedUser.email);
    }
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const isFavorite =
    singleJob && FavJobs.some((favJob) => favJob.job._id === singleJob._id);

  const handleClick = () => {
    if (!email) {
      toast.error("You must be logged in first!");
      return;
    }

    const favJobData = {
      job: singleJob,
      favorite: !isFavorite,
      addedBy: email,
    };

    if (isFavorite) {
      dispatch(removeFromFavourites(singleJob?._id, email));
    } else {
      dispatch(addToFavourites(favJobData));
    }
  };
  const fallbackImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAxeJt0yrkxxyfNQGqdl1ABIKlf8GtWz5pVQ&s";
  return (
    <div className="py-10">
      {status === Status.LOADING ? (
        <>
          <div
            role="status"
            aria-label="loading"
            className="flex justify-center items-center min-h-screen"
          >
            <FiLoader className="animate-spin text-indigo-600 w-6 h-6" />
            <span className="sr-only">Loading...</span>
          </div>
        </>
      ) : (
        <>
          <div className="bg-gradient-to-r from-[#ff5622e1] to-[#FF5722] py-12 rounded-lg w-full">
            <div className="container flex items-center justify-center px-6 text-center md:px-8">
              <div className="">
                <h1 className="text-2xl font-bold text-white tracking-tight sm:text-3xl md:text-4xl">
                  {singleJob?.jobPosition}
                </h1>

                <h1>
                  <p className="text-white">at</p>
                  {singleJob?.companyName}
                </h1>
              </div>
            </div>
          </div>

          <div className="container grid gap-12  py-8 text-base   lg:grid-cols-3 ">
            <div className="space-y-6 lg:col-start-2 lg:col-span-3 xl:space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tighter sm:text-3xl">
                  {singleJob?.jobPosition}
                </h2>
                <div className="text-gray-500 flex  capitalize flex-wrap text-sm ">
                  {singleJob?.jobType} &middot; {singleJob?.location} &middot;{" "}
                  {singleJob?.jobMode}
                </div>
              </div>
              <div className="space-y-6 text-lg leading-relaxed lg:space-y-8 xl:text-xl">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Job Description
                  </h3>
                  <p>{singleJob?.description}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Requirements
                  </h3>
                  <p>{singleJob?.requirements}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 border border-gray-200 rounded-lg p-3 lg:col-start-1 lg:row-start-1 ">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Location
                </h3>
                <p className="text-sm font-normal text-gray-700">
                  {singleJob?.location}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Salary Range
                </h3>
                <p className="text-sm font-normal text-gray-700">
                  {singleJob?.salary}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Application Deadline
                </h3>

                <p className="text-sm font-normal text-[#FF5722]">
                  {singleJob?.deadline
                    ? formatDate(singleJob?.deadline)
                    : "No deadline specified"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="">
              <div className="space-y-3">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tighter sm:text-3xl">
                  Company Overview
                </h2>
                <div className="inline-flex items-center gap-3 text-sm font-medium md:gap-5">
                  <Image
                    src={singleJob?.companyLogo || fallbackImage}
                    width="120"
                    height="40"
                    alt="Company Logo"
                    className="aspect-[3/1] overflow-hidden rounded-lg object-contain object-center"
                  />
                  <div className="flex flex-col gap-2">
                    <h1 className="text-[#FF5722]">{singleJob?.companyName}</h1>
                    <a
                      href={singleJob?.companyWebsite}
                      className="text-gray-500 underline dark:text-gray-400"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-8 gap-4">
            <button
              onClick={handleClick}
              className={`inline-flex items-center justify-center h-12 px-2 text-sm font-semibold text-white ${
                isFavorite ? "bg-red-500" : "bg-[#FF5722]"
              } rounded-md shadow-md`}
            >
              {isFavorite ? "Remove from favourites" : "Add to favourites"}
            </button>
            <Link
              href={`/views/job-apply/${singleJob?._id}`}
              className="inline-flex items-center justify-center h-12 px-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-md"
              prefetch={false}
            >
              Apply for this job
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
