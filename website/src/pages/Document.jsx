import DocumentGrid from "@/components/DocumentGrid";
import EmptyState from "@/components/EmptyState";
import { useDialog } from "@/context/DialogContext";
import React, { useState } from "react";

const dummyDocs = [
  {
    _id: "doc1",
    title: "Introduction to Machine Learning.pdf",
    createdAt: "2026-04-20T10:30:00Z",
  },
  {
    _id: "doc2",
    title: "Data Structures and Algorithms Notes.pdf",
    createdAt: "2026-04-18T14:15:00Z",
  },
  {
    _id: "doc3",
    title: "Operating Systems Summary.pdf",
    createdAt: "2026-04-15T09:00:00Z",
  },
  {
    _id: "doc4",
    title: "Database Management Systems.pdf",
    createdAt: "2026-04-12T16:45:00Z",
  },
  {
    _id: "doc5",
    title: "Computer Networks Complete Guide.pdf",
    createdAt: "2026-04-10T11:20:00Z",
  },
  {
    _id: "doc6",
    title: "Artificial Intelligence Concepts.pdf",
    createdAt: "2026-04-08T08:10:00Z",
  },
  {
    _id: "doc7",
    title: "Software Engineering Notes.pdf",
    createdAt: "2026-04-05T12:00:00Z",
  },
];

const Document = () => {
  const [docs, setDocs] = useState(dummyDocs);
  const { openUpload } = useDialog();

  // 🧠 Pagination state (NOW IN PARENT)
  const [page, setPage] = useState(1);
  const limit = 6;

  const totalPages = Math.ceil(docs.length / limit);

  const paginatedDocs = docs.slice(
    (page - 1) * limit,
    page * limit
  );

  return (
    <>
      {docs.length === 0 ? (
        <EmptyState onUpload={openUpload} />
      ) : (
        <DocumentGrid
          docs={paginatedDocs}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </>
  );
};

export default Document;