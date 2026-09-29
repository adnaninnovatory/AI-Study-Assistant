const { HuggingFaceInference } = require("@langchain/community/llms/hf");

const llm = new HuggingFaceInference({
  model: "mistralai/Mistral-7B-Instruct-v0.2", // good model
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

const generateAnswer = async (prompt) => {
  const response = await llm.invoke(prompt);
  return response;
};

module.exports = { generateAnswer };