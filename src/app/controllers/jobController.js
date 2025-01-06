import { NextResponse } from "next/server";
import Job from "@/app/models/jobModel";

import connectToDatabase from "@/app/utils/db";

// Create Job
export const createJob = async (req) => {
  try {
    await connectToDatabase();

    const {
      companyName,
      companyWebsite,
      companyLogo,
      jobPosition,
      location,
      salary,
      experience,
      jobType,
      jobMode,
      deadline,
      description,
      createdBy,
      requirements,
    } = await req.json();

    if (
      !companyName ||
      !jobPosition ||
      !location ||
      !experience ||
      !jobType ||
      !jobMode ||
      !deadline ||
      !description ||
      !createdBy ||
      !companyLogo ||
      !requirements
    ) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const newJob = new Job({
      companyName,
      companyWebsite,
      companyLogo,
      jobPosition,
      location,
      salary,
      experience,
      jobType,
      jobMode,
      deadline,
      description,
      createdBy,
      requirements,
    });

    const savedJob = await newJob.save();

    return NextResponse.json(
      { message: "Job created successfully", job: savedJob },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during job creation:", error);
    return NextResponse.json(
      { message: "Error creating job post", error: error.message },
      { status: 500 }
    );
  }
};

// Get All Jobs
// export const getAllJob = async (req) => {
//   try {
//     await connectToDatabase();

//     const jobs = await Job.find({});

//     if (jobs.length === 0) {
//       return NextResponse.json({ message: "No jobs found" }, { status: 404 });
//     }

//     return NextResponse.json(
//       { message: "Jobs retrieved successfully", jobs },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching jobs:", error);
//     return NextResponse.json(
//       { message: "Error fetching jobs", error: error.message },
//       { status: 500 }
//     );
//   }
// };

// Get All Jobs with Pagination
export const getAllJob = async (req, { params }) => {
  try {
    const page = params.slug[0];
    const limit = params.slug[1];
    const parsedPage = parseInt(page, 10);
    const parsedLimit = parseInt(limit, 10);

    if (isNaN(parsedPage) || parsedPage < 1) {
      return NextResponse.json(
        { message: "Invalid page number" },
        { status: 400 }
      );
    }
    if (isNaN(parsedLimit) || parsedLimit < 1) {
      return NextResponse.json(
        { message: "Invalid limit number" },
        { status: 400 }
      );
    }

    const skip = (parsedPage - 1) * parsedLimit;

    await connectToDatabase();

    const jobs = await Job.find({}).skip(skip).limit(parsedLimit);
    const totalJobs = await Job.countDocuments();
    const totalPages = Math.ceil(totalJobs / parsedLimit);

    if (jobs.length === 0) {
      return NextResponse.json({ message: "No jobs found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Jobs retrieved successfully",
        jobs,
        totalJobs,
        totalPages,
        currentPage: parsedPage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Error fetching jobs", error: error.message },
      { status: 500 }
    );
  }
};
// Get Single Job
export const getSingleJob = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { id } = await params;
    const job = await Job.findById(id);
    console.log(id);
    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Job retrieved successfully", job },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { message: "Error fetching job", error: error.message },
      { status: 500 }
    );
  }
};
//get jobs by email
export const getJobByEmail = async (req, { params }) => {
  try {
    await connectToDatabase();

    const { email } = params;
    console.log(email);
    const job = await Job.find({ "createdBy.email": email });

    if (!job) {
      return NextResponse.json(
        { message: "Job not found for this email" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Job retrieved successfully", job },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching job:", error);
    return NextResponse.json(
      { message: "Error fetching job", error: error.message },
      { status: 500 }
    );
  }
};
export const deleteJobByID = async (req, { params }) => {
  try {
    await connectToDatabase();
    const { id } = params;
    const job = await Job.findById(id);

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    await Job.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { message: "Error deleting job", error: error.message },
      { status: 500 }
    );
  }
};

export const updateJob = async (req, { params }) => {
  try {
    await connectToDatabase();

    const {
      companyName,
      companyWebsite,
      companyLogo,
      jobPosition,
      location,
      salary,
      experience,
      jobType,
      jobMode,
      deadline,
      description,
      createdBy,
      requirements,
    } = await req.json();

    const { id } = params;

    if (
      !companyName ||
      !jobPosition ||
      !location ||
      !experience ||
      !jobType ||
      !jobMode ||
      !deadline ||
      !createdBy ||
      !companyWebsite ||
      !companyLogo ||
      !salary ||
      !description ||
      !requirements
    ) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        companyName,
        companyWebsite,
        companyLogo,
        jobPosition,
        location,
        salary,
        experience,
        jobType,
        jobMode,
        deadline,
        description,
        createdBy,
        requirements,
      },
      { new: true }
    );

    if (!updatedJob) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Job updated successfully", job: updatedJob },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during job update:", error);
    return NextResponse.json(
      { message: "Error updating job post", error: error.message },
      { status: 500 }
    );
  }
};
