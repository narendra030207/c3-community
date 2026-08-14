import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || 'global';
    const branch = searchParams.get('branch');
    const batch = searchParams.get('batch');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');
    
    const skip = (page - 1) * pageSize;

    const where: any = { period };
    
    if (branch || batch || search) {
      where.user = {
        profile: {
          isNot: null,
        }
      };
      
      if (branch) {
        where.user.profile.branch = branch;
      }
      if (batch) {
        where.user.profile.batch = batch;
      }
      if (search) {
        where.user.name = { contains: search, mode: 'insensitive' };
      }
    }

    const [entries, total] = await Promise.all([
      prisma.leaderboardEntry.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
              profile: {
                select: {
                  branch: true,
                  batch: true,
                }
              }
            }
          }
        },
        orderBy: {
          totalScore: 'desc'
        },
        skip,
        take: pageSize
      }),
      prisma.leaderboardEntry.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: entries,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize)
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
