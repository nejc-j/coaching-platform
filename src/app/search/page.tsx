import React from 'react';
import { prisma } from '../../../lib/prisma';
import CoachList from '../../components/CoachList';

export default async function SearchResults({
  searchParams,
}: {
  searchParams: { search?: string; sport?: string };
}) {
  const { search, sport } = searchParams;

  const coaches = await prisma.user.findMany({
    where: {
      role: 'COACH',
      AND: [
        {
          coachProfile: {
            sport: sport || undefined,
          },
        },
        {
          OR: [
            {
              firstName: {
                contains: search ? search.toLowerCase() : '',
              },
            },
            {
              lastName: {
                contains: search ? search.toLowerCase() : '',
              },
            },
            {
              coachProfile: {
                sport: {
                  contains: search ? search.toLowerCase() : '',
                },
                location: {
                  contains: search ? search.toLowerCase() : '',
                },
              },
            },
          ],
        },
      ],
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      coachProfile: {
        select: {
          id: true, // Include the id of the coachProfile
          sport: true,
          description: true,
          location: true,
          rating: true,
          imageUrl: true,
          availability: true,
        },
      },
    },
  });

  const searchTitle = sport
    ? `Search Results for "${sport}"`
    : search
    ? `Search Results for "${search}"`
    : 'Search Results';

  return (
    <main
      className='flex flex-col items-center justify-between p-4'
      style={{
        background: 'linear-gradient(to bottom, black, #1f1f1f)',
        minHeight: '100vh',
        paddingTop: '100px', // Ensure this accounts for the header height
      }}
    >
      <div className='w-full max-w-6xl mx-auto flex-grow p-4'>
        <h1 className='text-2xl font-semibold mb-4 text-white'>
          {searchTitle}
        </h1>
        <CoachList coaches={coaches} />
      </div>
    </main>
  );
}
