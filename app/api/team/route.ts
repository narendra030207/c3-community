import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { teamMemberSchema } from '@/lib/validations';
import type { TeamCategory, Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') as TeamCategory | null;
    
    const where: Prisma.TeamMemberWhereInput = { isActive: true };
    if (category) {
      where.category = category;
    }

    const members = await prisma.teamMember.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { name: 'asc' }
      ]
    });

    return NextResponse.json({ success: true, data: members });
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
    const validatedData = teamMemberSchema.parse(body);

    const member = await prisma.teamMember.create({
      data: validatedData,
    });

    return NextResponse.json({ success: true, data: member }, { status: 201 });
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
