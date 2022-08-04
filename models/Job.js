const mongoose = require("mongoose");
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    //assign job to whichever user created it, referencing to a model with ref
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  //timestamp will add createdAt and updatedAt to the job
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
