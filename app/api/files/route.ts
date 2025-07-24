/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, isNull, and, like, not, ilike } from "drizzle-orm";

export async function GET(req: NextRequest) {
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
    const searchParams = req.nextUrl.searchParams;
    const queryUserId = searchParams.get("userId");
    const parentId = searchParams.get("parentId");
    const fileSection = searchParams.get("fileSection") || "all";
    const fileType = searchParams.get("fileType") || "all";
    const page = searchParams.get("page");
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
    const filters = [eq(files.userId, userId)];

    if (parentId) filters.push(eq(files.parentId, parentId));
    else if (page === "all") filters.push(isNull(files.parentId));

    if (fileType === "images") filters.push(like(files.type, "image/%"));
    else if (fileType === "folders") filters.push(eq(files.type, "folder"));
    else if (fileType === "docs")
      filters.push(
        not(ilike(files.type, "image/%")),
        not(ilike(files.type, "folder"))
      );

    if (page === "trash") filters.push(eq(files.isTrash, true));
    else if (page === "star" && parentId === null)
      filters.push(eq(files.isStared, true));
    else {
      if (fileSection === "trash") filters.push(eq(files.isTrash, true));
      else if (fileSection === "star") filters.push(eq(files.isStared, true));
      else filters.push(eq(files.isTrash, false));
    }
    const userFiles = await db
      .select()
      .from(files)
      .where(and(...filters));
    return NextResponse.json(userFiles);
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
