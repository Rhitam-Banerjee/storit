"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FileViewer() {
  const searchParams = useSearchParams();

  const url = searchParams.get("url");
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    if (url && typeof url === "string") {
      setFileUrl(url);
    }
  }, [url]);

  if (!fileUrl) return <div>Loading...</div>;

  return (
    <iframe
      src={`https://docs.google.com/gview?url=${encodeURIComponent(
        fileUrl
      )}&embedded=true`}
      className="h-[calc(100vh-62px)] w-full"
    />
  );
}
