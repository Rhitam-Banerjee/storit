"use client";

import { Suspense } from "react";
import FileViewer from "./viewer";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FileViewer />
    </Suspense>
  );
}
