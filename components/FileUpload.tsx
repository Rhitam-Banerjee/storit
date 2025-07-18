/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TbFileUpload } from "react-icons/tb";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
interface FileUploadChanges {
  userId: string;
  currentFolder: string | null;
  onUploadSuccess: () => void;
  handleUpload: () => void;
}
export default function FileUpload({
  userId,
  currentFolder,
  onUploadSuccess,
  handleUpload,
}: FileUploadChanges) {
  const { isLoaded } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.size > 5 * 1024 * 1024) {
        toast.error("Upload Failed", {
          description: "The file size exceeds 5MB limit",
        });
        return;
      }
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB limit");
        return;
      }
      setFile(selectedFile);
    }
  };
  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    if (currentFolder) {
      formData.append("parentId", currentFolder);
    }

    setUploading(true);
    setProgress(0);

    try {
      await axios.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        },
      });
      toast.success("Upload success", {
        description: "File was uploaded successfully",
      });
      handleUpload();
    } catch (error) {
      toast.error("Upload Failed", {
        description: "Ther was a problem while uploading file",
      });
    } finally {
      clearFile();
      setProgress(0);
      setUploading(false);
    }
  };
  if (!isLoaded) return <h1>Loading...</h1>;
  return (
    <div
      className="mt-[20px] flex flex-col justify-center items-center h-[150px] bg-secondary/30 w-full border-dashed border-[2px] border-primary/5 rounded-md"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <TbFileUpload className="text-heading3 text-chart-3 max-md:text-center" />
      {!file ? (
        <>
          <span className="text-small-text">
            <b
              className="cursor-pointer mr-[5px] hover:text-primary/70"
              onClick={() => fileInputRef.current?.click()}
            >
              Browse
            </b>
            or drag and drop assets
          </span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </>
      ) : (
        <div className="mt-[10px] flex flex-col justify-center items-center gap-[10px]">
          <span>File name: {file?.name}</span>
          {uploading && <Progress value={progress} />}
          <div className="flex flex-row items-center gap-[10px]">
            <Button onClick={handleFileUpload}>Upload</Button>
            <Button variant="outline" onClick={clearFile}>
              Cancle
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
