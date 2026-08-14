import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
// Assuming you have a prizeSchema, otherwise you can define one or omit zod if you prefer, but I will assume it's there
import { z } from 'zod';

const prizeSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  position: z.number().int(),
  prizeType: z.string(),
  value: z.string().optional(),
  competitionId: z.string().optional(),
  winnerId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const competitionId = searchParams.get('competition');

    const where: any = {};
    if (competitionId) {
      where.competitionId = competitionId;
    }

    const prizes = await prisma.prize.findMany({
      where,
      include: {
        competition: { select: { title: true } },
        winner: { select: { name: true, profile: { select: { branch: true } } } }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ success: true, data: prizes });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const validatedData = prizeSchema.parse(body);

    const prize = await prisma.prize.create({
      data: validatedData,
    });

    return NextResponse.json({ success: true, data: prize }, { status: 201 });
  } catch (error: any) {
    console.error('API Error:', error);
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
