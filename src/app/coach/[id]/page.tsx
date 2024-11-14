import { notFound } from 'next/navigation';
import { prisma } from '../../../../lib/prisma';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import { sportIcons } from '../../../utils/sportIcons';
import { addDays } from 'date-fns';
import BookSessionCalendar from '../../../components/BookSessionCalendar';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const allCoaches = await prisma.coach.findMany();
  allCoaches.forEach((coach) => console.log(coach.id));

  const coach = await prisma.coach.findUnique({
    where: { id: params.id },
    include: {
      user: true, // Include the related User data
    },
  });

  return {
    title: coach
      ? `${coach.user.firstName} ${coach.user.lastName} - Coach Profile`
      : 'Coach Not Found',
  };
}

export default async function CoachProfile({
  params,
}: {
  params: { id: string };
}) {
  console.log(`Fetching coach with ID: ${params.id}`);

  const coach = await prisma.coach.findUnique({
    where: { id: params.id },
    include: {
      user: true, // Include the related User data
    },
  });

  if (!coach) {
    console.log(`No coach found for ID: ${params.id}`);
    return notFound();
  }

  console.log(`Coach found: ${coach.user.firstName} ${coach.user.lastName}`);

  const availableDates = [
    new Date(),
    addDays(new Date(), 3),
    addDays(new Date(), 5),
  ];
  const unavailableDates = [addDays(new Date(), 2), addDays(new Date(), 4)];

  const renderStars = () => {
    const stars = [];
    const goldStars =
      coach.rating && coach.rating > 0 ? Math.round(coach.rating) : 0;

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          fill={i < goldStars ? 'gold' : 'none'}
          stroke={i < goldStars ? 'gold' : 'grey'}
          className='w-5 h-5'
        />
      );
    }

    return stars;
  };

  const getAvailabilityColor = () => {
    if (coach.availability === 0) return 'text-red-500';
    if (coach.availability === 1) return 'text-orange-500';
    return 'text-green-500';
  };

  const SportIcon = sportIcons[coach.sport] || null;

  return (
    <div
      className='min-h-screen flex flex-col items-center'
      style={{
        background: 'linear-gradient(to bottom, black, #1f1f1f)',
        paddingTop: 'calc(4rem + 20px)',
      }}
    >
      <div className='w-full max-w-6xl bg-white rounded-lg shadow-md p-8 flex'>
        {/* Left Column (Image and Coach Info) */}
        <div className='w-1/2'>
          <div className='relative w-full h-64 mb-4'>
            <Image
              src={coach.imageUrl || '/images/default.jpg'}
              alt={`${coach.user.firstName} ${coach.user.lastName}`}
              fill
              className='object-cover rounded-t-lg'
            />
          </div>
          <div className='mt-4'>
            <h1 className='text-4xl font-bold mb-4'>{`${coach.user.firstName} ${coach.user.lastName}`}</h1>
            <div className='flex items-center text-xl text-gray-700 mb-2'>
              {SportIcon && <SportIcon className='mr-2' />}
              {coach.sport}
            </div>
            <div className='flex items-center mb-4'>{renderStars()}</div>
            <p className='text-gray-600 mb-4'>{coach.description}</p>
            <div className='flex items-center text-gray-500 mb-2'>
              <MapPin className='mr-2' />
              <span>{coach.location}</span>
            </div>
            <p className={`${getAvailabilityColor()} text-sm`}>
              {coach.availability === 0
                ? 'No free slots this week'
                : coach.availability === 1
                ? '1 free slot this week'
                : `${coach.availability} free slots this week`}
            </p>
          </div>
        </div>

        {/* Right Column (Book a Session) */}
        <div className='w-1/2 p-4 flex justify-center items-center'>
          <BookSessionCalendar
            availableDates={availableDates}
            unavailableDates={unavailableDates}
          />
        </div>
      </div>
    </div>
  );
}
