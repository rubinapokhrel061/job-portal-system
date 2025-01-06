import { NextResponse } from "next/server";
import JobApply from "@/app/models/jobApplyModel";

import connectToDatabase from "@/app/utils/db";

// Job apply
export const jobApply = async (req) => {
  try {
    await connectToDatabase();

    const { fullName, email, resume, coverletter, jobDetails } =
      await req.json();

    if (!fullName || !email || !coverletter || !jobDetails) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }
    const existingApplication = await JobApply.findOne({ email });
    if (existingApplication) {
      return NextResponse.json(
        { message: "An application with this email already exists." },
        { status: 400 }
      );
    }
    const newJob = new JobApply({
      fullName,
      email,
      resume,
      coverletter,
      jobDetails,
    });

    const savedJobApply = await newJob.save();

    return NextResponse.json(
      { message: "Job Applied successfully", jobApply: savedJobApply },
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
