import mongoose, { Schema } from "mongoose";

const JobSchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    companyWebsite: {
      type: String,
      required: false,
      validate: {
        validator: (v) => /^https?:\/\/[^\s$.?#].[^\s]*$/.test(v),
        message: (props) => `${props.value} is not a valid URL!`,
      },
    },
    companyLogo: {
      type: String,
      required: false,
    },
    jobPosition: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      enum: ["Entry-Level", "Mid-Level", "Senior-Level"],
      required: true,
    },
    jobType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract"],
      required: true,
    },
    jobMode: {
      type: String,
      enum: ["onsite", "hybrid", "remote"],
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    requirements: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      id: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        validate: {
          validator: (v) => /\S+@\S+\.\S+/.test(v),
          message: (props) => `${props.value} is not a valid email!`,
        },
      },
    },
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

export default Job;
