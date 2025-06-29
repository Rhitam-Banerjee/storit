import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid"

import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";

import ImageKit from "imagekit"
import { NextRequest, NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || ""
})
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorised USER" }, { status: 401 })
    }
    const formData = await req.formData()
    const file = formData.get("file") as File
    const formUserId = formData.get("userId") as string
    const parentId = formData.get("parentId") as string || null

    if (formUserId !== userId) {
      return NextResponse.json({ error: "Unauthorised USER" }, { status: 401 })
    }
    if (!file) {
      return NextResponse.json({ error: "Filer Not provided" }, { status: 401 })
    }
    if (parentId) {
      const [parentFolder] = await db.select().from(files).where(
        and(
          eq(files.userId, userId),
          eq(files.id, parentId),
          eq(files.isFolder, true)
        )
      )
      if (!parentFolder) {
        return NextResponse.json(
          { error: "Parent folder not found" },
          { status: 404 }
        );
      }
    }
    if (!parentId) {
      return NextResponse.json({ error: "Parent folder not found" }, { status: 401 })
    }
    if (!file.type.startsWith("image/") && file.type !== "application/pdf" && file.type !== "application/doc") {
      return NextResponse.json({ error: "File type not suppourted" }, { status: 401 })
    }
    const buffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(buffer)

    const folderPath = parentId ? `/storit/${userId}/folder/${parentId}` : `/storit/${userId}/`

    const originalFileName = file.name
    const fileExtension = originalFileName.split(".").pop()
    const uniqueFileName = `${uuidv4()}.${fileExtension}`

    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: uniqueFileName,
      folder: folderPath,
      useUniqueFileName: false
    })
    const fileData = {
      name: originalFileName,
      path: uploadResponse.filePath,
      size: file.size,
      type: file.type,
      fileUrl: uploadResponse.url,
      thumbnailUrl: uploadResponse.thumbnailUrl || null,
      userId: userId,
      parentId: parentId,
      isFolder: false,
      isStarred: false,
      isTrash: false,
    };
    const [newFile] = await db.insert(files).values(fileData).returning();

    return NextResponse.json(newFile);
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}