import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    let achievements;
    if (userId) {
      achievements = await prisma.achievement.findMany({
        include: {
          userAchievements: {
            where: { userId }
          }
        },
        orderBy: { name: 'asc' }
      });
    } else {
      achievements = await prisma.achievement.findMany({
        orderBy: { name: 'asc' }
      });
    }

    return NextResponse.json({ success: true, data: achievements });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
