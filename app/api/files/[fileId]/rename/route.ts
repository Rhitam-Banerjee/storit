/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(
  req: NextRequest,
  props: { params: Promise<{ fileId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { fileId } = await props.params;
    if (!fileId) {
      return NextResponse.json({ error: "File Id not found" }, { status: 400 });
    }
    const searchParams = req.nextUrl.searchParams;
    const queryUserId = searchParams.get("userId");
    const renameValue = searchParams.get("renameValue") || "";
    if (queryUserId !== userId || !queryUserId) {
      return NextResponse.json(
        {
          error: "Unauthorised USER",
        },
        {
          status: 401,
        }
      );
    }
    const userFiles = await db
      .select()
      .from(files)
      .where(and(eq(files.userId, userId), eq(files.id, fileId)));
    if (!userFiles) {
      return NextResponse.json(
        {
          error: "File not found",
        },
        {
          status: 401,
        }
      );
    }
    const updatedFiles = await db
      .update(files)
      .set({ name: renameValue })
      .where(and(eq(files.id, fileId), eq(files.userId, userId)))
      .returning();
    const updatedFile = updatedFiles[0];
    return NextResponse.json({
      success: true,
      updatedFile,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "File Not found",
      },
      {
        status: 500,
      }
    );
  }
}
