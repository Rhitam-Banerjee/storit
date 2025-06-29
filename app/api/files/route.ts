/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { eq, isNull, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({
        error: "Unauthorised USER"
      }, {
        status: 401
      })
    }
    const searchParams = req.nextUrl.searchParams
    const queryUserId = searchParams.get("userId")
    const parentId = searchParams.get("parentId")
    if (queryUserId !== userId || !queryUserId) {
      return NextResponse.json({
        error: "Unauthorised USER"
      }, {
        status: 401
      })
    }
    let userFiles
    if (parentId) {
      userFiles = await db.select().from(files).where(
        and(
          eq(files.userId, userId),
          eq(files.parentId, parentId)
        )
      )
    } else {
      userFiles = await db.select().from(files).where(
        and(
          eq(files.userId, userId),
          isNull(files.parentId)
        )
      )
    }
    return NextResponse.json(
      userFiles
    )
  } catch (error) {
    return NextResponse.json({
      error: "File Not found"
    }, {
      status: 500
    })
  }

}