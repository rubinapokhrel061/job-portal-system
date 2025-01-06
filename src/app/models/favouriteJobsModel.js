import mongoose, { Schema } from "mongoose";

const FavouriteJobSchema = new Schema(
  {
    job: {
      _id: {
        type: String,
        required: true,
      },
      companyName: {
        type: String,
        required: true,
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
      },
      location: {
        type: String,
        required: true,
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
      },
      requirements: {
        type: String,
        required: true,
      },
      createdBy: {
        name: {
          type: String,
          required: true,
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
    favorite: {
      type: Boolean,
      default: true,
    },
    addedBy: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /\S+@\S+\.\S+/.test(v),
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
  },
  { timestamps: true }
);

FavouriteJobSchema.index({ "job._id": 1, addedBy: 1 }, { unique: true });

export default mongoose.model("FavouriteJob", FavouriteJobSchema);
