const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    fileUrl: {
      type: String,
    },

    content: {
      type: String, // extracted text
    },

    mcqs: [
      {
        question: String,
        options: [String],
        answer: String,
        difficulty: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Document", documentSchema);