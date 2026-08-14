import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { certificateSchema } from '@/lib/validations';
import { generateCertificateId } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(session.user.role);
    
    // If admin, list all. If regular user, list own.
    const where = isAdmin ? {} : { userId: session.user.id };

    const certificates = await prisma.certificate.findMany({
      where,
      include: {
        user: { select: { name: true, email: true } },
        event: { select: { title: true } },
        competition: { select: { title: true } }
      },
      orderBy: { issueDate: 'desc' }
    });

    return NextResponse.json({ success: true, data: certificates });
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
    const validatedData = certificateSchema.parse(body);
    
    // Auto-generate certificateId
    const certificateId = generateCertificateId();

    const certificate = await prisma.certificate.create({
      data: {
        ...validatedData,
        certificateId,
      },
    });

    return NextResponse.json({ success: true, data: certificate }, { status: 201 });
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
