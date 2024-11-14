import Image from 'next/image';
import TopCoachList from '../components/TopCoachList';
import { prisma } from '../../lib/prisma';
import SearchForm from '../components/SearchForm';
import { Graduate } from 'next/font/google';

const graduate = Graduate({ weight: '400', subsets: ['latin'] });

export default async function Home() {
  // Get distinct sports by aggregating coach profiles
  const sports = await prisma.user.findMany({
    where: {
      role: 'COACH',
    },
    select: {
      coachProfile: {
        select: {
          sport: true,
        },
      },
    },
  });

  // Filter out unique sports
  const uniqueSports = Array.from(
    new Set(sports.map((s) => s.coachProfile?.sport).filter(Boolean)) // Filter out undefined values
  ) as string[];

  // Get top coaches by rating
  const topCoaches = await prisma.user.findMany({
    where: {
      role: 'COACH',
    },
    orderBy: {
      coachProfile: {
        rating: 'desc',
      },
    },
    take: 3,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      coachProfile: {
        select: {
          id: true, // Include the coach profile ID
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

  return (
    <main
      className='flex min-h-screen flex-col items-center justify-between p-0 m-0 backdrop-blur-md'
      style={{
        background: 'linear-gradient(to bottom, black, #1f1f1f)',
      }}
    >
      <div className='relative w-full h-[300px] md:h-[600px] top-0 left-0'>
        <Image
          src='/background-sport.jpg'
          alt='Background Image'
          layout='fill'
          objectFit='cover'
          objectPosition='top'
          quality={100}
          priority
          className='z-0'
        />
        <div className='absolute inset-0 bg-black opacity-40 z-10'></div>
        <div className='absolute inset-0 flex items-center justify-center z-20'>
          <div className='max-w-6xl mx-auto text-center p-4 flex flex-col gap-16'>
            <div className={graduate.className}>
              <h1 className='text-white text-6xl md:text-6xl font-bold leading-relaxed tracking-wider'>
                <span>Find your perfect </span>
                <span className='relative inline-block text-[#800000] text-7xl'>
                  {['c', 'o', 'a', 'c', 'h'].map((letter, index) => (
                    <span key={index} className='coach-letter'>
                      {letter}
                    </span>
                  ))}
                </span>{' '}
                <br />
                <span className='mt-4 inline-block'>
                  and{' '}
                  <span
                    className='elevate-text text-[#982B1C] text-7xl'
                    style={{ top: '-0.15em' }}
                  >
                    elevate
                  </span>{' '}
                  your game
                </span>
              </h1>
            </div>

            <SearchForm sports={uniqueSports} />
          </div>
        </div>
        <div className='absolute bottom-0 left-0 right-0 flex justify-center z-20'>
          <div
            className='bg-black text-white py-2 px-6 flex items-center justify-center rounded-t-2xl backdrop-blur-md bg-opacity-70'
            style={{ minWidth: '300px' }}
          >
            <div className={graduate.className}>
              <h2 className='text-lg md:text-3xl font-normal'>
                Our Best Coaches
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full max-w-6xl mx-auto flex-grow p-4'>
        <div className='text-left'>
          <TopCoachList coaches={topCoaches} />
        </div>
      </div>
    </main>
  );
}
