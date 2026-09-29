import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { File, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";

export default function UploadDialog({ open, setOpen }) {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showCloseButton={false}>
        <DialogClose asChild>
          <button className="absolute right-2 top-2 rounded-full p-2 h-8 w-8 bg-[#F0F4F7] cursor-pointer  transition">
            <X className="h-4 w-4" />
          </button>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className={"text-[30px] font-bold"}>
            Upload Document
          </DialogTitle>
          <DialogDescription className="text-base text-[#596064] -mt-1">
            Add new files to your AI knowledge base
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* UPLOAD BOX */}
          <div
            onClick={handleClick}
            className="cursor-pointer border-2  border-dashed rounded-xl p-8 text-center hover:border-[#4E45E4] transition bg-gray-50 dark:bg-gray-900"
          >
            <UploadCloud className="mx-auto h-10 w-10 text-gray-500 mb-2" />

            <p className="text-sm font-medium">
              Click to upload or drag & drop
            </p>

            <p className="text-xs text-gray-500 mt-1">PDF up to 10MB</p>

            {/* HIDDEN INPUT */}
            <input
              type="file"
              ref={fileInputRef}
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* FILE PREVIEW */}
          {file && (
            <div className="flex items-center justify-between p-3 border rounded-lg bg-white dark:bg-gray-800">
              {/* File Info */}
              <div className="flex items-center gap-3">
                <File className="h-5 w-5 text-primary" />

                <div className="flex flex-col">
                  <span className="text-sm font-medium">{file.name}</span>

                  <span className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(2)} KB
                  </span>
                </div>
              </div>

              {/* REMOVE BUTTON */}
              <button
                onClick={removeFile}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          )}

          {/* UPLOAD BUTTON */}
          {file && (
            <button className="bg-[#4E45E4] text-white px-4 py-2 rounded-4xl cursor-pointer w-full">
              Upload
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
