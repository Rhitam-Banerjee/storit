export interface DashboardTableFileContents {
  id:string;
  name: string;
  path:string;
  size: number;
  type:string
  fileUrl:string;
  thumbnailUrl: string;
  userId:string;
  parentId:string;
  isFolder:boolean;
  isStared:boolean;
  isTrash:boolean;
  createdAt: string;
  updatedAt:string;
}