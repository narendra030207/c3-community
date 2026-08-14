import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const competitionId = searchParams.get('competition');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (competitionId) {
      where.competitionId = competitionId;
    }
    if (search) {
      where.OR = [
        { participantName: { contains: search, mode: 'insensitive' } },
        { rollNumber: { contains: search, mode: 'insensitive' } },
        { competition: { title: { contains: search, mode: 'insensitive' } } },
        { event: { title: { contains: search, mode: 'insensitive' } } }
      ];
    }

    const [results, total] = await Promise.all([
      prisma.result.findMany({
        where,
        include: {
          competition: { select: { title: true } },
          event: { select: { title: true } }
        },
        skip,
        take: limit,
        orderBy: { rank: 'asc' },
      }),
      prisma.result.count({ where }),
    ]);

    // Mask sensitive data (rollNumber: show first 2 and last 2 chars)
    const maskedResults = results.map(result => {
      let maskedRollNumber = null;
      if (result.rollNumber) {
        const rn = result.rollNumber;
        if (rn.length > 4) {
          maskedRollNumber = `${rn.substring(0, 2)}${'*'.repeat(rn.length - 4)}${rn.substring(rn.length - 2)}`;
        } else {
          maskedRollNumber = rn;
        }
      }
      
      return {
        ...result,
        rollNumber: maskedRollNumber
      };
    });

    return NextResponse.json({
      success: true,
      data: maskedResults,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
