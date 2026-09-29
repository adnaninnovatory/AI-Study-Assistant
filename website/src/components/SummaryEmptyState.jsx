const SummaryEmptyState = ({handleClick}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">

      <div className="text-5xl mb-4">🧾</div>

      <h2 className="text-xl font-semibold text-gray-800">
        No summary generated yet
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        Generate a smart AI summary of your document with key points and insights.
      </p>

      <button className="mt-5 bg-indigo-600 text-white px-4 py-2 rounded-lg" onClick={handleClick}>
        Generate Summary
      </button>

    </div>
  );
};

export default SummaryEmptyState;