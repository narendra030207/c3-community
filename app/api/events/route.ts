import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { eventSchema } from "@/lib/validations"
import type { EventStatus, EventType, Prisma } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status") as EventStatus | null
    const type = searchParams.get("type") as EventType | null
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const where: Prisma.EventWhereInput = {}
    if (status) where.status = status
    if (type) where.eventType = type

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: "desc" },
      }),
      prisma.event.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: events,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user || !["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = eventSchema.parse(body)

    const slug = validatedData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      + '-' + Date.now().toString(36)

    const event = await prisma.event.create({
      data: {
        ...validatedData,
        slug,
        date: new Date(validatedData.date),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : undefined,
        registrationDeadline: validatedData.registrationDeadline ? new Date(validatedData.registrationDeadline) : undefined,
      },
    })

    return NextResponse.json({ success: true, data: event }, { status: 201 })
  } catch (error: any) {
    console.error("API Error:", error)
    if (error.name === "ZodError") {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
