const Document = require("../models/Document");
const { generateAnswer } = require("../services/llmService");
const { successResponse, errorResponse } = require("../utils/response");

const generateSummary = async (req, res) => {
  try {
    const { documentId } = req.body;

    const doc = await Document.findById(documentId);

    if (!doc) {
      return errorResponse(res, "Document not found", 404);
    }

    const prompt = `
Summarize the following document and extract key points.

Return format:
1. Short Summary
2. Bullet Key Points (5-10)

Document:
${doc.content}
`;

    const result = await generateAnswer(prompt);

    return successResponse(res, "Summary generated", {
      summary: result,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = { generateSummary };