const Document = require("../models/Document");
const { loadPDF } = require("../services/pdfService");
const { splitText } = require("../services/textSplitterService");
const { successResponse, errorResponse } = require("../utils/response");

const { storeChunks } = require("../services/chromaService");

//////////////////////////////////////////////////////
// UPLOAD DOCUMENT
//////////////////////////////////////////////////////
const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, "No file uploaded", 400);
    }

    const filePath = req.file.path;

    // 1. Extract docs
    const docs = await loadPDF(filePath);

    // 2. Split into chunks
    const chunks = await splitText(docs);

    // 3. Save document in DB
    const doc = await Document.create({
      user: req.user._id,
      title: req.file.originalname,
      fileUrl: filePath,
      content: docs.map((doc) => doc.pageContent).join(" "),
    });

    // 4. STORE IN CHROMA DB (NEW PART)
    await storeChunks(doc.user.toString(),doc._id.toString(), chunks);

    return successResponse(res, "Document uploaded & indexed successfully", {
      documentId: doc._id,
      chunksStored: chunks.length,
    });
  } catch (error) {
    return errorResponse(res, error.message, 500);
  }
};

module.exports = { uploadDocument };