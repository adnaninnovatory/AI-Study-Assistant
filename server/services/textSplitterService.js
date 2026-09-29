const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

const splitText = async (docs) => {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  const chunks = await splitter.createDocuments(docs);

  return chunks;
};

module.exports = { splitText };