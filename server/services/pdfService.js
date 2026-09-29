const { PDFLoader } = require("@langchain/community/document_loaders/fs/pdf");

const loadPDF = async (filePath) => {
  const loader = new PDFLoader(filePath);

  const docs = await loader.load();

  return docs;
};

module.exports = { loadPDF };