import { UploadCloud } from "lucide-react";

export default function EmptyState({ onUpload }) {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      
      {/* Icon */}
      <div className="bg-gray-100 p-6 rounded-full mb-4">
        <UploadCloud className="w-10 h-10 text-gray-500" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800">
        No Documents Yet
      </h2>

      {/* Description */}
      <p className="text-gray-500 mt-2 max-w-md">
        Upload your first document to start chatting, generating summaries,
        and creating MCQs with AI.
      </p>

      {/* Button */}
      <button
        onClick={onUpload}
        className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition"
      >
        Upload Document
      </button>
    </div>
  );
}