"use client";
import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";

import { addJob } from "@/app/store/slices/jobSlice";
import { FiLock } from "react-icons/fi";
import { Status } from "@/app/globals/status";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function CreateNewJob() {
  const dispatch = useDispatch();
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const [companyLogoName, setCompanyLogoName] = useState("");
  const [companyLogoUrl, setCompanyLogoUrl] = useState("");
  const [user, setUser] = useState(null);
  const { status } = useSelector((state) => state.jobs);
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    companyLogo: companyLogoUrl,
    jobPosition: "",
    location: "",
    salary: "",
    experience: "Entry-Level",
    jobType: "Full-Time",
    jobMode: "onsite",
    deadline: new Date(),
    description: "",
    requirements: "",
    createdBy: user ? user : { email: "", id: "", name: "" },
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        createdBy: user,
      }));
    }
    if (companyLogoUrl) {
      setFormData((prev) => ({
        ...prev,
        companyLogo: companyLogoUrl,
      }));
    }
  }, [user, companyLogoUrl]);
  const handleUploadSuccess = ({ info }) => {
    if (info && info?.secure_url) {
      setCompanyLogoUrl(info?.secure_url);
      setCompanyLogoName(
        info?.display_name ? `${info?.display_name}.${info?.format}` : ""
      );
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,
    };
    console.log("Form Data Submitted:", jobData);
    dispatch(addJob(jobData));
    if (status === Status.SUCCESS) {
      router.push("/");
      setFormData({
        companyName: "",
        companyWebsite: "",
        companyLogo: companyLogoUrl,
        jobPosition: "",
        location: "",
        salary: "",
        experience: "Entry-Level",
        jobType: "Full-Time",
        jobMode: "onsite",
        deadline: new Date(),
        description: "",
        requirements: "",
        createdBy: user ? user : { email: "", id: "", name: "" },
      });
      setCompanyLogoUrl("");
      setCompanyLogoName("");
    }
  };

  return (
    <div className="overflow-y-auto flex items-center justify-center py-10 min-h-screen">
      {!user ? (
        <div className="flex flex-col items-center justify-center p-8  rounded-3xl shadow-xl space-y-4">
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
        <div className="w-full max-w-4xl  border border-[#FF5722] p-4 sm:p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-[#FF5722] mb-6 text-center">
            Create New Job
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="companyWebsite"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Website
                </label>
                <input
                  type="url"
                  id="companyWebsite"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="companyLogo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Logo
                </label>

                <CldUploadWidget
                  uploadPreset={UPLOAD_PRESET}
                  onSuccess={handleUploadSuccess}
                  onError={(error) => {
                    console.error("Upload error:", error);
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-full px-2 py-2 mt-1 bg-white border border-gray-400 rounded-lg outline-none focus:border-gray-600"
                    >
                      {companyLogoUrl ? companyLogoName : "Upload Company Logo"}
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              <div>
                <label
                  htmlFor="jobPosition"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Position
                </label>
                <input
                  type="text"
                  id="jobPosition"
                  name="jobPosition"
                  value={formData.jobPosition}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Salary Range
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Experience Level
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-1 py-3 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
                >
                  <option value="Entry-Level">Entry-Level</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior-Level">Senior-Level</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="jobType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Type
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleInputChange}
                  className="w-full px-1 py-3 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
                >
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="jobMode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Job Mode
                </label>
                <select
                  id="jobMode"
                  name="jobMode"
                  value={formData.jobMode}
                  onChange={handleInputChange}
                  className="w-full px-1 py-3 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
                >
                  <option value="onSite">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700"
                >
                  Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  value={formData.deadline.toISOString().split("T")[0]}
                  onChange={handleInputChange}
                  className="w-full px-2 py-2 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-2 py-2 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="requirements"
                className="block text-sm font-medium text-gray-700"
              >
                Job Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                className="w-full px-2 py-2 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full h-12 px-10 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-md "
            >
              Post Job
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
