import React from 'react';
import CoachCard from './CoachCard';

interface CoachListProps {
  coaches: {
    id: string;
    firstName: string;
    lastName: string;
    coachProfile: {
      id: string;
      sport: string;
      description: string | null;
      location: string;
      rating: number | null;
      imageUrl: string | null;
      availability: number;
    } | null;
  }[];
}

const CoachList: React.FC<CoachListProps> = ({ coaches }) => {
  return (
    <div>
      {coaches.length === 0 ? (
        <p className='text-left text-gray-500'>No coaches found</p>
      ) : (
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr'>
          {coaches.map((coach) => (
            <div
              key={coach.coachProfile?.id || coach.id}
              className='flex justify-center'
            >
              <div className='w-full max-w-sm'>
                <CoachCard
                  id={`${coach.coachProfile?.id}`}
                  name={`${coach.firstName} ${coach.lastName}`}
                  sport={coach.coachProfile?.sport || ''}
                  location={coach.coachProfile?.location || ''}
                  rating={coach.coachProfile?.rating || 0}
                  backgroundImageUrl={
                    coach.coachProfile?.imageUrl ||
                    '/coach-images/default-avatar.png'
                  }
                  availability={coach.coachProfile?.availability || 0}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CoachList;
