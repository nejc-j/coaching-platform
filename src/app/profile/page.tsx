import { prisma } from '../../../lib/prisma';
import ProfileEditableFields from './ProfileEditableFields';
import ProfileImageUpload from './ProfileImageUpload';
import { Star } from 'lucide-react';

export default async function ProfilePage() {
  // Fetch user data from the database
  const userData = await prisma.user.findUnique({
    where: { email: 'user@example.com' }, // Replace with the actual session user email
    include: {
      coachProfile: true,
    },
  });

  if (!userData) {
    return <p>No user data found.</p>;
  }

  return (
    <div
      className='min-h-screen flex flex-col items-center'
      style={{
        background: 'linear-gradient(to bottom, black, #1f1f1f)',
        paddingTop: 'calc(4rem + 20px)',
      }}
    >
      <div className='w-full max-w-6xl bg-white rounded-lg shadow-md p-8 flex'>
        {/* Left Side - Editable Fields */}
        <div className='w-1/2 pr-16'>
          <ProfileEditableFields userData={userData} />
        </div>

        {/* Right Side - User Image, Name, and Rating */}
        <div className='w-1/2 flex flex-col items-center'>
          <ProfileImageUpload
            imageUrl={userData.coachProfile?.imageUrl || '/default-avatar.png'}
          />
          <p className='text-2xl font-semibold'>
            {userData.firstName} {userData.lastName}
          </p>
          <div className='flex items-center mb-4'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                fill={
                  i < (userData.coachProfile?.rating || 0) ? 'gold' : 'none'
                }
                stroke={
                  i < (userData.coachProfile?.rating || 0) ? 'gold' : 'grey'
                }
                className='w-5 h-5'
              />
            ))}
          </div>
          <p className='text-gray-600'>{userData.email}</p>
        </div>
      </div>
    </div>
  );
}
