import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    
    language: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],     // tags will be array of strings
      default: [],
    },

    description: {
      type: String,
      required: true,
    },

    code: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Snippet", snippetSchema);
