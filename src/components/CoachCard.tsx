import React from 'react';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import Link from 'next/link';
import { sportIcons } from '../utils/sportIcons';

interface CoachCardProps {
  id: string;
  name: string;
  sport: string;
  location: string;
  rating?: number | null;
  backgroundImageUrl: string;
  availability: number;
}

function CoachCard({
  id,
  name,
  sport,
  location,
  rating,
  backgroundImageUrl,
  availability,
}: CoachCardProps) {
  const SportIcon = sportIcons[sport] || null;

  const renderStars = () => {
    const stars = [];
    const goldStars = rating && rating > 0 ? Math.round(rating) : 0;

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

  const getAvailabilityText = () => {
    if (availability === 0) return 'No free slots this week';
    if (availability === 1) return '1 free slot this week';
    return `${availability} free slots this week`;
  };

  const getAvailabilityColor = () => {
    if (availability === 0) return 'text-red-500';
    if (availability === 1) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <Link href={`/coach/${id}`}>
      <div className='border rounded-md shadow-md bg-white transform transition-transform duration-300 hover:scale-103 cursor-pointer flex flex-col h-full w-full'>
        <div className='relative w-full h-40 overflow-hidden flex-shrink-0'>
          <Image
            src={backgroundImageUrl}
            alt={name}
            layout='fill'
            objectFit='cover'
            className='rounded-t-md'
          />
          <div className='absolute top-0 right-0 p-3 text-yellow-500'>
            <div className='flex items-center'>{renderStars()}</div>
          </div>
        </div>
        <div className='px-4 pb-4 flex-grow flex flex-col'>
          <h2 className='text-xl font-bold mt-4 mb-1'>{name}</h2>
          <div className='flex items-center text-lg text-gray-700'>
            {SportIcon && <SportIcon className='mr-2' />}
            {sport}
          </div>
          <div className='flex justify-between items-center text-gray-500 mt-auto'>
            <p className='flex items-center'>
              <MapPin className='mr-1' size={18} />
              {location}
            </p>
            <p className={`${getAvailabilityColor()} text-sm`}>
              {getAvailabilityText()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CoachCard;
