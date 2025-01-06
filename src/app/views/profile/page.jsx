"use client";

import { Status } from "@/app/globals/status";

import { deleteJob, fetchJobByemail } from "@/app/store/slices/jobSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiLoader, FiLock } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

export default function UserProfile() {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const dispatch = useDispatch();
  const { jobByEmail, status } = useSelector((state) => state.jobs);

  console.log(jobByEmail);
  useEffect(() => {
    const User = localStorage.getItem("user");

    if (User) {
      const parsedUser = JSON.parse(User);
      setUserName(parsedUser.name || "");
      setUserEmail(parsedUser.email || "");
      setProfilePictureUrl(parsedUser.image);
    }
  }, []);

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchJobByemail(userEmail));
    }
  }, [dispatch, userEmail]);

  const handleDelete = (id) => {
    dispatch(deleteJob(id));
  };
  return (
    <div className="container mx-auto min-h-screen p-4 mt-10">
      {!userEmail ? (
        <div className="flex flex-col min-h-[60vh] items-center justify-center p-8   space-y-4">
          <div className="text-5xl animate__animated animate__fadeIn">
            <FiLock className="inline-block text-7xl mb-3" />
          </div>
          <p className="text-2xl font-bold mb-2 animate__animated animate__fadeIn animate__delay-1s">
            You must be logged in to post a job
          </p>
          <p className="text-base  opacity-90 animate__animated animate__fadeIn animate__delay-2s text-center">
            Please log in to access the job posting feature.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 md:flex md:flex-row md:justify-center items-center bg-white p-5 rounded-lg shadow-lg">
            {profilePictureUrl ? (
              <Image
                src={profilePictureUrl}
                alt={userName}
                height={"96"}
                width={"96"}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-24 h-24 text-gray-400" />
            )}
            <div>
              <h2 className="text-xl font-semibold">{userName}</h2>
              <p className="text-gray-500">{userEmail}</p>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white px-5 pt-2 mt-8 mb-10 shadow-default sm:px-7.5 pb-10">
            <div className="py-6 px-4 md:px-6 xl:px-7.5">
              <h4 className="text-xl font-semibold text-black">
                Recently Created Job List:
              </h4>
            </div>

            <div className="max-w-full overflow-x-auto">
              {status === Status.LOADING ? (
                <div className="text-center py-5">
                  <div
                    role="status"
                    aria-label="loading"
                    className="flex justify-center items-center min-h-screen"
                  >
                    <FiLoader className="animate-spin text-indigo-600 w-6 h-6" />
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : jobByEmail && jobByEmail.length > 0 ? (
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200 text-left">
                      <th className="min-w-[220px] text-center py-4 px-4 font-medium text-black xl:pl-11">
                        Job Position
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black">
                        Company Name
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black">
                        Location
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black">
                        Deadline
                      </th>
                      <th className="min-w-[150px] py-4 px-4 font-medium text-black ">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobByEmail.map((job, key) => (
                      <tr key={key}>
                        <td className="border-b border-[#eee] py-5 px-4">
                          <h1 className="font-bold">{job.jobPosition}</h1>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4">
                          {job.companyName}
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4">
                          {job.location}
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4">
                          {new Date(job.deadline).toLocaleDateString()}
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4">
                          <div className="flex items-center space-x-3.5">
                            <Link
                              href={`/views/update-job/${job?._id}`}
                              className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-700"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(job?._id)}
                              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-700"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex justify-center p-5">
                  <p className="text-center text-gray-500">No Jobs found.</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
