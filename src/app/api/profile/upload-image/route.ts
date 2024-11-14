import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
  }

  // Create a unique filename using UUID
  const filename = `${uuidv4()}-${file.name}`;
  const filePath = path.join(process.cwd(), 'public/uploads', filename);

  // Write the file to the filesystem
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  // Update the user's image URL in the database
  // Replace `user@example.com` with the actual session user email
  await prisma.user.update({
    where: { email: 'user@example.com' }, // Replace this with the authenticated user's email
    data: {
      imageUrl: `/uploads/${filename}`,
    },
  });

  return NextResponse.json({
    message: 'Image uploaded successfully',
    imageUrl: `/uploads/${filename}`,
  });
}
