import { FileText, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Head from "./Head";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const DocumentsGrid = ({
  docs = [],
  loading = false,
  onDelete,
  page,
  setPage,
  totalPages,
}) => {
  const navigate = useNavigate();

  const handleOpen = (id) => {
    navigate(`/dashboard/workspace/${id}`);
  };

  return (
    <div className="px-6 pb-6">
      {/* Header */}
      <Head
        title="Your Documents"
        description="Upload, manage, and interact with your documents using AI. Chat, generate summaries, and create MCQs instantly."
      />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        
        {/* 🔄 LOADING SKELETON */}
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-40 bg-gray-200 rounded-xl"
            />
          ))}

        {/* 📄 DOCUMENT CARDS */}
        {!loading &&
          docs.map((doc) => (
            <div
              key={doc._id}
              onClick={() => handleOpen(doc._id)}
              className="relative bg-white border border-gray-200 rounded-xl p-4 cursor-pointer 
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
            >
              {/* 🗑️ DELETE BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete && onDelete(doc._id);
                }}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 
                           transition bg-red-100 hover:bg-red-200 p-1.5 rounded-md"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>

              {/* Icon */}
              <div className="bg-indigo-100 p-3 rounded-lg w-fit mb-4">
                <FileText className="text-indigo-600 w-6 h-6" />
              </div>

              {/* Title */}
              <h2 className="text-lg font-medium text-gray-800 truncate">
                {doc.title}
              </h2>

              {/* Badge */}
              <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded mt-2">
                PDF
              </span>

              {/* Date */}
              <p className="text-gray-400 text-sm mt-2">
                {new Date(doc.createdAt).toLocaleDateString()}
              </p>

              {/* Footer */}
              <div className="mt-4 flex justify-end">
                <span className="text-indigo-600 text-sm font-medium">
                  Open →
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* 📄 PAGINATION (NOW PROPERLY INTEGRATED) */}
      {!loading && totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>

              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {/* Pages */}
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* Next */}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setPage((p) => Math.min(p + 1, totalPages))
                  }
                  className={
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DocumentsGrid;