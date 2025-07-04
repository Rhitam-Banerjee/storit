import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import ImageKit from "imagekit";

// Initialize ImageKit with your credentials
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});
export async function DELETE() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const isTrashFiles = await db.select().from(files).where(
      and(
        eq(files.userId, userId),
        eq(files.isTrash, true)
      )
    )
    if (isTrashFiles.length === 0) {
      return NextResponse.json({
        error: "Trash is Empty"
      }, {
        status: 404
      })
    }
    const deletedFiles = isTrashFiles.filter(files => !files.isFolder).map(async file => {

      let imagekitFileId = null;

      if (file.fileUrl) {
        const urlWithoutQuery = file.fileUrl.split("?")[0];
        imagekitFileId = urlWithoutQuery.split("/").pop();
      }

      if (!imagekitFileId && file.path) {
        imagekitFileId = file.path.split("/").pop();
      }

      if (imagekitFileId) {
        try {
          const searchResults = await imagekit.listFiles({
            name: imagekitFileId,
            limit: 1,
          });

          if (searchResults && searchResults.length > 0) {
            const file = searchResults[0];
            if ("fileId" in file) {
              await imagekit.deleteFile(file.fileId);
            }
            // await imagekit.deleteFile(searchResults[0].fileId);
          } else {
            await imagekit.deleteFile(imagekitFileId);
          }
        } catch (searchError) {
          console.error(`Error searching for file in ImageKit:`, searchError);
          await imagekit.deleteFile(imagekitFileId);
        }
      }

    })
    await Promise.allSettled(deletedFiles)
    const totalDeletedFiles = await db.delete(files).where(and(
      eq(files.userId, userId),
      eq(files.isTrash, true)
    )).returning()
    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${totalDeletedFiles.length} files from trash`,
    });
  } catch (error) {
    console.error("Error emptying trash:", error);
    return NextResponse.json(
      { error: "Failed to empty trash" },
      { status: 500 }
    );
  }
}