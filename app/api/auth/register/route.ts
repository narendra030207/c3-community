import { NextRequest, NextResponse } from "next/server"
import { hash } from "bcryptjs"
import prisma from "@/lib/prisma"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  rollNumber: z.string().min(4),
  branch: z.string().min(2),
  batch: z.number().int(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const result = registerSchema.safeParse(body)
    
    if (!result.success) {
      return NextResponse.json({ success: false, error: "Validation failed", details: result.error }, { status: 400 })
    }

    const { name, email, password, rollNumber, branch, batch } = result.data

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ success: false, error: "Email already exists" }, { status: 400 })
    }

    const hashedPassword = await hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profile: {
          create: {
            rollNumber,
            branch,
            batch: batch != null ? String(batch) : undefined,
          }
        }
      }
    })

    return NextResponse.json({ success: true, message: "User registered successfully", userId: user.id }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Internal Server Error" }, { status: 500 })
  }
}
