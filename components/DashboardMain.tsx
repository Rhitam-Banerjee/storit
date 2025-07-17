/* eslint-disable @typescript-eslint/no-unused-vars */
import FileTableView from "@/components/FileTableView";
import type { DashboardTableFileContents } from "@/exportTypes";
interface FileUploadChanges {
  files: DashboardTableFileContents[];
  currentFolder: string | null;
  handleFolderClick?: (
    folderId: string | null,
    folderName: string | null
  ) => void;
}
export default function DashboardMain({
  files,
  currentFolder,
  handleFolderClick,
}: FileUploadChanges) {
  return (
    <div className="w-full flex flex-col justify-center items-start rounded-md ">
      <FileTableView files={files} handleFolderClick={handleFolderClick} />
    </div>
  );
}
