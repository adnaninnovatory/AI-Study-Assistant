const { extractPDFText } = require("./pdfService");
const { splitText } = require("./textSplitterService");
const { embeddings } = require("./embeddingService");
const { storeInChroma, searchSimilar } = require("./chromaService");
const { generateAnswer } = require("./llmService");

//////////////////////////////////////////////////////
// PROCESS PDF (UPLOAD FLOW)
//////////////////////////////////////////////////////
const processPDF = async (filePath) => {
  const docs = await extractPDFText(filePath);

  const chunks = await splitText(docs);

  await storeInChroma(chunks, embeddings);

  return {
    message: "PDF processed and stored in ChromaDB",
    chunks: chunks.length,
  };
};

//////////////////////////////////////////////////////
// CHAT WITH PDF
//////////////////////////////////////////////////////
const chatWithPDF = async (question) => {
  const relevantChunks = await searchSimilar(question, embeddings);

  const context = relevantChunks.join("\n");

  const prompt = `
Answer ONLY using context below:

Context:
${context}

Question:
${question}
`;

  const answer = await generateAnswer(prompt);

  return answer;
};

module.exports = {
  processPDF,
  chatWithPDF,
};