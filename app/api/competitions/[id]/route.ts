import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { competitionSchema } from '@/lib/validations';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const competition = await prisma.competition.findUnique({
      where: { id },
      include: {
        _count: {
          select: { participants: true, submissions: true }
        }
      }
    });

    if (!competition) {
      return NextResponse.json({ success: false, error: 'Competition not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: competition });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const validatedData = competitionSchema.partial().parse(body);

    const updateData: any = { ...validatedData };
    if (validatedData.startDate) {
      updateData.startDate = new Date(validatedData.startDate);
    }
    if (validatedData.endDate) {
      updateData.endDate = new Date(validatedData.endDate);
    }

    const competition = await prisma.competition.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, data: competition });
  } catch (error: any) {
    console.error('API Error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Competition not found' }, { status: 404 });
    }
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || !['ADMIN', 'SUPER_ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    
    await prisma.competition.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, data: { message: 'Competition deleted successfully' } });
  } catch (error: any) {
    console.error('API Error:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ success: false, error: 'Competition not found' }, { status: 404 });
    }
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
