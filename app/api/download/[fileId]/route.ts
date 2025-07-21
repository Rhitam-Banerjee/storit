import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
// import { v4 as uuidv4 } from "uuid";
// import { error } from "console";

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ fileId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json(
      {
        error: "Unauthorised",
      },
      { status: 401 }
    );
  }
  try {
    const { fileId } = await props.params;
    if (!fileId) {
      return NextResponse.json({ error: "File Id not found" }, { status: 400 });
    }
    const searchParams = req.nextUrl.searchParams;
    const queryUserId = searchParams.get("userId");
    if (queryUserId !== userId || !queryUserId) {
      return NextResponse.json(
        {
          error: "Unauthorised",
        },
        { status: 401 }
      );
    }
    const [userFile] = await db
      .select()
      .from(files)
      .where(and(eq(files.id, fileId), eq(files.userId, userId)));

    if (!userFile) {
      return NextResponse.json(
        {
          error: "File Not found",
        },
        { status: 400 }
      );
    }
    return NextResponse.json({
      message: "File ready for download",
      userFile,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 400 }
    );
  }
}
