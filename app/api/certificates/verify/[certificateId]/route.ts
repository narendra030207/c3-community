import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ certificateId: string }> }
) {
  try {
    const { certificateId } = await params;
    
    const certificate = await prisma.certificate.findUnique({
      where: { certificateId },
      include: {
        user: { select: { name: true } },
        event: { select: { title: true } },
        competition: { select: { title: true } }
      }
    });

    if (!certificate) {
      return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
    }

    // Return public-safe fields
    const publicData = {
      certificateId: certificate.certificateId,
      recipientName: certificate.user.name,
      eventTitle: certificate.event?.title,
      competitionTitle: certificate.competition?.title,
      achievement: certificate.achievement,
      issueDate: certificate.issueDate,
      issuer: certificate.issuedBy,
      verificationStatus: 'VERIFIED'
    };

    return NextResponse.json({ success: true, data: publicData });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
