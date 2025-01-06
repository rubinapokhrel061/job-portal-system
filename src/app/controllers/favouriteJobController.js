import { NextResponse } from "next/server";
import FavouriteJob from "@/app/models/favouriteJobsModel";
import connectToDatabase from "@/app/utils/db";

export const addFavouriteJob = async (req) => {
  try {
    await connectToDatabase();

    const { job, favorite, addedBy } = await req.json();

    if (!job || favorite === undefined) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const email = addedBy;
    const jobId = job._id;

    const existingFavourite = await FavouriteJob.findOne({
      addedBy: email,
      "job._id": jobId,
    });

    if (existingFavourite) {
      return NextResponse.json(
        { message: "This job is already in your favourites!" },
        { status: 400 }
      );
    }

    const newFavouriteJob = new FavouriteJob({
      job: job,
      favorite: favorite,
      addedBy: addedBy,
    });

    const savedFavouriteJob = await newFavouriteJob.save();

    return NextResponse.json(
      {
        message: "Job added to favourites successfully",
        favouriteJob: savedFavouriteJob,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "This job is already in your favourites!" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Error adding job to favourites",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const getFavouriteJobsByEmail = async (req, { params }) => {
  try {
    await connectToDatabase();

    const { email } = await params;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const favouriteJobs = await FavouriteJob.find({
      addedBy: email,
    });

    if (favouriteJobs.length === 0) {
      return NextResponse.json(
        { message: "No favourite jobs found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Favourite jobs retrieved successfully", favouriteJobs },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching favourite jobs:", error);
    return NextResponse.json(
      {
        message: "Error fetching favourite jobs",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const deleteFavouriteJob = async (req, { params }) => {
  try {
    await connectToDatabase();
    const id = params.slug[0];
    const addedBy = params.slug[1];
    if (!params || !id || !addedBy) {
      return NextResponse.json(
        { message: "Job ID and user email are required" },
        { status: 400 }
      );
    }

    const deletedFavouriteJob = await FavouriteJob.findOneAndDelete({
      "job._id": id,
      addedBy: addedBy,
    });

    if (!deletedFavouriteJob) {
      return NextResponse.json(
        { message: "Job not found in your favourites " },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Job removed from favourites", deletedFavouriteJob },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing job from favourites:", error);
    return NextResponse.json(
      {
        message: "Error removing job from favourites",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
