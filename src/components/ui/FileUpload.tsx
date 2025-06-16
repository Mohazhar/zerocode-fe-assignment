import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Paperclip,
  X,
  File,
  Image,
  FileText,
  Video,
  Music,
} from "lucide-react";

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  disabled?: boolean;
  maxFiles?: number;
  maxSizeInMB?: number;
  acceptedFileTypes?: string[];
}

interface UploadedFile {
  file: File;
  preview?: string;
  id: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  disabled = false,
  maxFiles = 5,
  maxSizeInMB = 10,
  acceptedFileTypes = ["image/*", "text/*", ".pdf", ".doc", ".docx"],
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return Image;
    if (fileType.startsWith("video/")) return Video;
    if (fileType.startsWith("audio/")) return Music;
    if (
      fileType.includes("text") ||
      fileType.includes("pdf") ||
      fileType.includes("doc")
    )
      return FileText;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileSelect = async (files: FileList) => {
    const validFiles: File[] = [];
    const newUploadedFiles: UploadedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check file size
      if (file.size > maxSizeInMB * 1024 * 1024) {
        alert(
          `File "${file.name}" is too large. Maximum size is ${maxSizeInMB}MB.`,
        );
        continue;
      }

      // Check file count
      if (uploadedFiles.length + validFiles.length >= maxFiles) {
        alert(`Maximum ${maxFiles} files allowed.`);
        break;
      }

      validFiles.push(file);

      // Create preview for images
      let preview: string | undefined;
      if (file.type.startsWith("image/")) {
        preview = URL.createObjectURL(file);
      }

      newUploadedFiles.push({
        file,
        preview,
        id: Math.random().toString(36).substr(2, 9),
      });
    }

    setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
    onFileSelect([...uploadedFiles.map((uf) => uf.file), ...validFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const updated = prev.filter((file) => file.id !== id);
      onFileSelect(updated.map((uf) => uf.file));
      return updated;
    });
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!disabled && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <div className="relative">
      <motion.button
        type="button"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        disabled={disabled}
        onClick={handleButtonClick}
        className={`p-2 rounded-lg transition-colors duration-200 ${
          disabled
            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
            : uploadedFiles.length > 0
              ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
        title="Attach files"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Paperclip className="w-5 h-5" />
        {uploadedFiles.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {uploadedFiles.length}
          </span>
        )}
      </motion.button>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedFileTypes.join(",")}
        onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
        className="hidden"
      />

      {/* File Preview */}
      <AnimatePresence>
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-14 left-0 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-600/50 rounded-2xl shadow-2xl p-4 z-50"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Attached Files ({uploadedFiles.length})
              </h3>
              <button
                onClick={() => {
                  setUploadedFiles([]);
                  onFileSelect([]);
                }}
                className="text-gray-500 hover:text-red-500 transition-colors"
                title="Clear all files"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {uploadedFiles.map((uploadedFile, index) => {
                const IconComponent = getFileIcon(uploadedFile.file.type);
                return (
                  <motion.div
                    key={uploadedFile.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    {uploadedFile.preview ? (
                      <img
                        src={uploadedFile.preview}
                        alt={uploadedFile.file.name}
                        className="w-10 h-10 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(uploadedFile.file.size)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFile(uploadedFile.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-600/50">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Max {maxFiles} files, {maxSizeInMB}MB each • Drag & drop
                supported
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drag overlay */}
      <AnimatePresence>
        {isDragOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-primary-500/20 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border-2 border-dashed border-primary-500">
              <div className="text-center">
                <Paperclip className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Drop files here
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Release to upload your files
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
