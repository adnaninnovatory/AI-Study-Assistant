import { createContext, useContext, useState } from "react";
import UploadDialog from "@/components/ui/UploadDialog";

const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const openUpload = () => setIsUploadOpen(true);
  const closeUpload = () => setIsUploadOpen(false);

  return (
    <DialogContext.Provider value={{ openUpload, closeUpload }}>
      {children}

      {/* GLOBAL DIALOG (only rendered once) */}
      <UploadDialog open={isUploadOpen} setOpen={setIsUploadOpen} />
    </DialogContext.Provider>
  );
}

export const useDialog = () => useContext(DialogContext);