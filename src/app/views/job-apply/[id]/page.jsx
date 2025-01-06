"use client";
import { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { fetchJobById } from "@/app/store/slices/jobSlice";
import { useParams, useRouter } from "next/navigation";
import { JobApply } from "@/app/store/slices/JobApplySlice";
import { Status } from "@/app/globals/status";
import { useDispatch, useSelector } from "react-redux";

export default function JobApplicationForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleJob } = useSelector((state) => state.jobs);
  const { status } = useSelector((state) => state.jobApply);
  const router = useRouter();

  const [jobDetails, setJobDetails] = useState({
    jobId: "",
    jobPosition: "",
    companyName: "",
  });

  const [resume, setResume] = useState("");
  const [fileName, setFileName] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    resume: resume,
    coverletter: "",
    jobDetails: jobDetails,
  });

  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (singleJob) {
      setJobDetails({
        jobId: singleJob._id,
        jobPosition: singleJob.jobPosition,
        companyName: singleJob.companyName,
      });
      setFormData((prev) => ({
        ...prev,
        jobDetails: {
          jobId: singleJob._id,
          jobPosition: singleJob.jobPosition,
          companyName: singleJob.companyName,
        },
      }));
    }
  }, [singleJob]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadSuccess = ({ info }) => {
    if (info?.secure_url) {
      setResume(info?.secure_url);
      setFileName(
        info?.display_name ? `${info?.display_name}.${info?.format}` : ""
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const applicationData = { ...formData, resume };
    await dispatch(JobApply(applicationData));

    if (status === Status.SUCCESS) {
      router.push(`/views/jobs/${singleJob?._id}`);
      setFormData({
        fullName: "",
        email: "",
        resume: "",
        coverletter: "",
        jobDetails: { jobId: "", jobPosition: "", companyName: "" },
      });
      setFileName("");
      setResume("");
    }
  };

  return (
    <div className="overflow-y-auto flex items-center justify-center py-6 min-h-screen">
      <div className="w-full max-w-4xl border border-[#FF5722] p-4 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-[#FF5722] mb-6 text-center">
          Apply for this job
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-2 py-2 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-2 py-2 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="companyLogo"
              className="block text-sm font-medium text-gray-700"
            >
              Resume (optional)
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
                  {resume ? fileName : "Upload Resume"}
                </button>
              )}
            </CldUploadWidget>
          </div>

          <div className="mb-4">
            <label
              htmlFor="coverletter"
              className="block text-sm font-medium text-gray-700"
            >
              Cover letter
            </label>
            <textarea
              id="coverletter"
              name="coverletter"
              value={formData.coverletter}
              onChange={handleInputChange}
              className="w-full px-2 py-2 mt-1 border border-gray-400 rounded-lg outline-none focus:border-gray-600"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="inline-flex items-center w-full justify-center h-12 px-10 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-md"
          >
            Apply for this job
          </button>
        </form>
      </div>
    </div>
  );
}
