// src/app/api/profile/data/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '../../../../../lib/prisma';

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      coachProfile: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const responseData = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    fitnessGoal: user.fitnessGoal,
    location: user.location,
    sport: user.coachProfile?.sport,
    availability: user.coachProfile?.availability,
    rating: user.coachProfile?.rating,
    imageUrl: user.imageUrl,
  };

  return NextResponse.json(responseData);
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const data = await request.json();

  const updatedUser = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      fitnessGoal: data.fitnessGoal,
      location: data.location,
      description: data.description,
      coachProfile:
        data.role === 'COACH'
          ? {
              update: {
                sport: data.sport,
                availability: data.availability,
                location: data.location,
                description: data.description,
              },
            }
          : undefined,
    },
  });

  return NextResponse.json(updatedUser);
}
