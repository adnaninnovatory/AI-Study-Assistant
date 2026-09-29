const { searchChunks } = require("../services/chromaService");
const { generateAnswer } = require("../services/llmService");
const { successResponse, errorResponse } = require("../utils/response");

const chatWithDocument = async (req, res) => {
  try {
    const { documentId, question } = req.body;

    if (!documentId || !question) {
      return errorResponse(res, "Missing fields", 400);
    }
    const userId = req.user.id
    // 1. Search relevant chunks
    const chunks = await searchChunks(userId,documentId, question);

    const context = chunks.join("\n");

    // 2. Build prompt
    const prompt = `
Answer ONLY using the context below:

Context:
${context}

Question:
${question}
`;

    // 3. Generate answer
    const answer = await generateAnswer(prompt);

    return successResponse(res, "Answer generated", {
      answer,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = { chatWithDocument };