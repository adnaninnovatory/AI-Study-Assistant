const MCQEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">

      <div className="text-5xl mb-4">🧪</div>

      <h2 className="text-xl font-semibold text-gray-800">
        No MCQs generated yet
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        Create AI-powered quizzes from your document and test your understanding.
      </p>

      <div className="mt-4 text-sm text-gray-400">
        Choose difficulty and number of questions
      </div>

    </div>
  );
};

export default MCQEmptyState;