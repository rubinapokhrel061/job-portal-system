import mongoose, { Schema } from "mongoose";

const JobApplicationSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    resume: {
      type: String,
      trim: true,
    },
    coverletter: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => /\S+@\S+\.\S+/.test(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    jobDetails: {
      companyName: {
        type: String,
        required: true,
        trim: true,
      },
      jobId: {
        type: String,
        required: true,
      },
      jobPosition: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const JobApplication =
  mongoose.models.JobApply || mongoose.model("JobApply", JobApplicationSchema);

export default JobApplication;
