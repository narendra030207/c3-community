import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized. Please log in." }, { status: 401 })
    }

    const { id: eventId } = await params
    
    // Check if event exists
    const event = await prisma.event.findUnique({ where: { id: eventId } })
    if (!event) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 })
    }

    // Check if event is still open for registration
    if (event.status !== 'UPCOMING') {
      return NextResponse.json({ success: false, error: "Event registration is closed" }, { status: 400 })
    }

    // Check capacity
    if (event.maxParticipants) {
      const registrationCount = await prisma.eventRegistration.count({
        where: { eventId },
      });
      if (registrationCount >= event.maxParticipants) {
        return NextResponse.json({ success: false, error: "Event is at full capacity" }, { status: 400 })
      }
    }

    // Check registration deadline
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return NextResponse.json({ success: false, error: "Registration deadline has passed" }, { status: 400 })
    }

    // Check for duplicate registration
    const existingReg = await prisma.eventRegistration.findFirst({
      where: {
        userId: session.user.id,
        eventId: eventId
      }
    })

    if (existingReg) {
      return NextResponse.json({ success: false, error: "Already registered for this event" }, { status: 400 })
    }

    // Create registration
    const registration = await prisma.eventRegistration.create({
      data: {
        userId: session.user.id,
        eventId: eventId,
      }
    })

    return NextResponse.json({ success: true, message: "Successfully registered for the event", data: registration })
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
