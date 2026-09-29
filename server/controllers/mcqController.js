const Document = require("../models/Document");
const { generateAnswer } = require("../services/llmService");
const { successResponse, errorResponse } = require("../utils/response");

const generateMCQs = async (req, res) => {
  try {
    const { documentId, count, level } = req.body;

    if (!documentId || !count || !level) {
      return errorResponse(res, "Missing fields", 400);
    }

    if (count > 100) {
      return errorResponse(res, "MCQs limit is 100", 400);
    }

    const doc = await Document.findById(documentId);

    if (!doc) {
      return errorResponse(res, "Document not found", 404);
    }

    const prompt = `
Generate ${count} multiple choice questions from the document.

Difficulty level: ${level}

Rules:
- Each MCQ must have 4 options
- Only 1 correct answer
- Return STRICT JSON format

Format:
[
  {
    "question": "",
    "options": ["", "", "", ""],
    "answer": "",
    "difficulty": "${level}"
  }
]

Document:
${doc.content}
`;

    const result = await generateAnswer(prompt);

    let mcqs;

    try {
      mcqs = JSON.parse(result);
    } catch (err) {
      return errorResponse(res, "Failed to parse MCQs", 500);
    }

    // save MCQs in DB (tracking)
    doc.mcqs = [...(doc.mcqs || []), ...mcqs];
    await doc.save();

    return successResponse(res, "MCQs generated", {
      mcqs,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = { generateMCQs };