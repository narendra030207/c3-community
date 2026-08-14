import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { hash } from "bcryptjs"

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ success: false, error: "Forbidden in production" }, { status: 403 })
  }
  
  try {
    const hashedPassword = await hash("Admin@123456", 10)
    await prisma.user.upsert({
      where: { email: "admin@c3community.com" },
      update: {},
      create: {
        name: "Admin User",
        email: "admin@c3community.com",
        password: hashedPassword,
        role: "SUPER_ADMIN",
        profile: {
          create: {
            rollNumber: "ADMIN001",
            branch: "CSE",
            batch: "2024",
            bio: "System Administrator",
          }
        }
      }
    })
    
    return NextResponse.json({ success: true, message: "Database seeded successfully" })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
