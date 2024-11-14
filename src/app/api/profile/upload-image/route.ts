import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
  }

  // Generate a unique filename
  const filename = `${uuidv4()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public/uploads', filename);

  // Create the directory if it doesn’t exist
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  // Write the file to the filesystem
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  // Update the user's image URL in the database
  await prisma.user.update({
    where: { email: 'user@example.com' }, // Replace with the authenticated user's email
    data: {
      imageUrl: `/uploads/${filename}`,
    },
  });

  return NextResponse.json({
    message: 'Image uploaded successfully',
    imageUrl: `/uploads/${filename}`,
  });
}
