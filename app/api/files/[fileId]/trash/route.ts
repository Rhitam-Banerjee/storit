/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
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
      return NextResponse.json(
        {
          error: "Unauthorised USER",
        },
        {
          status: 401,
        }
      );
    }
    const { fileId } = await props.params;
    if (!fileId) {
      return NextResponse.json(
        {
          error: "File Id required",
        },
        {
          status: 401,
        }
      );
    }
    const [file] = await db
      .select()
      .from(files)
      .where(and(eq(files.id, fileId), eq(files.userId, userId)));
    if (!file) {
      return NextResponse.json(
        {
          error: "User File not found",
        },
        {
          status: 401,
        }
      );
    }
    await db
      .update(files)
      .set({ isTrash: !file.isTrash })
      .where(and(eq(files.id, fileId), eq(files.userId, userId)));
    return NextResponse.json({
      success: true,
      message: "File added to trash",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error marking file trash",
      },
      {
        status: 401,
      }
    );
  }
}
