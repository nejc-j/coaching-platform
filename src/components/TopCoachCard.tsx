import React from 'react';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import Link from 'next/link';
import { sportIcons } from '../utils/sportIcons';

interface TopCoachCardProps {
  id: string;
  name: string;
  sport: string;
  message: string;
  location: string;
  rating?: number | null;
  availability: number;
  backgroundImageUrl: string;
  isAlternate?: boolean;
}

function TopCoachCard({
  id,
  name,
  sport,
  message,
  location,
  rating,
  availability,
  backgroundImageUrl,
  isAlternate,
}: TopCoachCardProps) {
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
      <div
        className={`flex ${
          isAlternate ? 'flex-row-reverse' : 'flex-row'
        } rounded-md shadow-md bg-white overflow-hidden transform transition-transform duration-300 hover:scale-103 cursor-pointer`}
      >
        <div className='relative w-2/5 h-64'>
          <Image
            src={backgroundImageUrl}
            alt={name}
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div className='w-3/5 flex flex-col justify-center p-6'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold mb-2'>{name}</h2>
            <div className='flex items-center'>{renderStars()}</div>
          </div>
          <div className='flex items-center text-xl text-gray-700 mb-3'>
            {SportIcon && <SportIcon className='mr-2' />}
            {sport}
          </div>
          <p className='text-gray-600 mb-4 italic'>{message}</p>
          <div className='flex justify-between items-center mt-2'>
            <p className={`${getAvailabilityColor()} text-sm`}>
              {getAvailabilityText()}
            </p>
            <p className='text-gray-500 text-sm flex items-center'>
              <MapPin className='mr-1' />
              {location}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TopCoachCard;
