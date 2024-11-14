import React from 'react';
import TopCoachCard from './TopCoachCard';

interface TopCoachListProps {
  coaches: {
    id: string;
    firstName: string | null; // Allow null values
    lastName: string | null; // Allow null values
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

const TopCoachList: React.FC<TopCoachListProps> = ({ coaches }) => {
  const topCoachesBySport = coaches.reduce((acc, coach) => {
    if (
      coach.coachProfile &&
      !acc.find((c) => c.coachProfile?.sport === coach.coachProfile?.sport) &&
      acc.length < 3
    ) {
      acc.push(coach);
    }
    return acc;
  }, [] as typeof coaches);

  return (
    <div>
      {topCoachesBySport.length === 0 ? (
        <p className='text-left text-gray-500'>No top coaches found</p>
      ) : (
        <div className='space-y-4'>
          {topCoachesBySport.map((coach, index) => (
            <div key={coach.coachProfile?.id || coach.id} className='w-full'>
              <TopCoachCard
                id={coach.coachProfile?.id || ''} // Using coachProfile ID for the link
                name={`${coach.firstName} ${coach.lastName}`}
                sport={coach.coachProfile?.sport || ''}
                message={
                  coach.coachProfile?.description ||
                  'Join me in improving your skills and elevating your game.'
                }
                location={coach.coachProfile?.location || ''}
                rating={coach.coachProfile?.rating || 0}
                backgroundImageUrl={
                  coach.coachProfile?.imageUrl ||
                  '/coach-images/default-avatar.png'
                }
                availability={coach.coachProfile?.availability || 0}
                isAlternate={index % 2 !== 0}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCoachList;
