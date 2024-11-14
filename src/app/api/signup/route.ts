import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { randomBytes } from 'crypto';
import { prisma } from '../../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, role } = await request.json();

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Generate a verification token (if you have email verification)
    const verificationToken = randomBytes(32).toString('hex');

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role,
        verificationToken,
        verified: true, // or false if you handle email verification
      },
    });

    // If the user is a coach, create a corresponding Coach entry
    if (role === 'COACH') {
      await prisma.coach.create({
        data: {
          userId: user.id,
          sport: '', // You may want to collect this during registration or set it later
          availability: 0, // Default availability, adjust as needed
          location: '', // Default location, adjust as needed
        },
      });
    }

    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in signup route:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
