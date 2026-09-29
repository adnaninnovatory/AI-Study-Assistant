const ChatEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">

      <div className="text-5xl mb-4">💬</div>

      <h2 className="text-xl font-semibold text-gray-800">
        Start chatting with your document
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        Ask questions, get explanations, and explore insights from your PDF using AI.
      </p>

      <div className="mt-4 text-sm text-gray-400">
        Example: “Explain this document in simple words”
      </div>

    </div>
  );
};

export default ChatEmptyState;