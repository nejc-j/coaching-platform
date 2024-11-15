import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search } = req.query;

  if (typeof search !== 'string') {
    return res.status(400).json({ error: 'Invalid search term' });
  }

  try {
    const coaches = await prisma.coach.findMany({
      where: {
        OR: [
          { sport: { contains: search } },
          { location: { contains: search } },
          {
            user: {
              OR: [
                { firstName: { contains: search } },
                { lastName: { contains: search } },
              ],
            },
          },
        ],
      },
      include: {
        user: true, // Include related user information
      },
    });

    res.status(200).json(coaches);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching coaches' });
  }
}
