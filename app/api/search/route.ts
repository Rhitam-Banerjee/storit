import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorised",
        },
        {
          status: 401,
        }
      );
    }
    const searchParams = req.nextUrl.searchParams;
    const passedUserId = searchParams.get("userId");
    const parentId = searchParams.get("parentId") || null;
    const fileName = searchParams.get("fileName") || "";
    const page = searchParams.get("page");
    const searchCurrent = searchParams.get("searchCurrent");
    if (!userId || userId !== passedUserId) {
      return NextResponse.json(
        {
          error: "Unauthorised",
        },
        {
          status: 401,
        }
      );
    }
    if (fileName?.trim() === "") {
      return NextResponse.json(
        {
          error: "File Name cannot be blank",
        },
        {
          status: 400,
        }
      );
    }
    const filters = [eq(files.userId, userId), eq(files.name, fileName)];
    if (page === "star") filters.push(eq(files.isStared, true));
    else if (page === "trash") filters.push(eq(files.isTrash, true));
    if (searchCurrent === "true") {
      console.log("runs");

      if (parentId) filters.push(eq(files.parentId, parentId));
      else filters.push(isNull(files.parentId));
    }

    const userFiles = await db
      .select()
      .from(files)
      .where(and(...filters));
    return NextResponse.json(
      { status: true, userFiles },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 400,
      }
    );
  }
}
