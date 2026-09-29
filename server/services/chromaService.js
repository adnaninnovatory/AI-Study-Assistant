const { ChromaClient } = require("chromadb");
const { embeddings } = require("./embeddingService");

const client = new ChromaClient({
  path: "http://localhost:8000",
});

let collection;

// init collection per user/document
const getCollection = async (userId, docId) => {
  return await client.getOrCreateCollection({
    name: `user_${userId}_doc_${docId}`,
  });
};

//////////////////////////////////////////////////////
// STORE CHUNKS
//////////////////////////////////////////////////////
const storeChunks = async (userId,docId, chunks) => {
  const collection = await getCollection(userId,docId);

  for (let i = 0; i < chunks.length; i++) {
    const embedding = await embeddings.embedQuery(chunks[i]);

    await collection.add({
      ids: [`${docId}_${i}`],
      embeddings: [embedding],
      documents: [chunks[i]],
    });
  }
};

//////////////////////////////////////////////////////
// SEARCH CHUNKS
//////////////////////////////////////////////////////
const searchChunks = async (userId,docId, query, limit = 3) => {
  const collection = await getCollection(userId,docId);

  const queryEmbedding = await embeddings.embedQuery(query);

  const result = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: limit,
  });

  return result.documents[0] || [];
};

module.exports = {
  storeChunks,
  searchChunks,
};