'use client';

import { useState } from 'react';

interface UserProfile {
  firstName: string | null;
  lastName: string | null;
  email: string;
  imageUrl?: string | null;
  location?: string | null;
  coachProfile?: {
    id?: string;
    userId?: string;
    sport?: string | null;
    availability?: number | null;
    rating?: number | null;
    location?: string;
    description?: string | null;
    imageUrl?: string | null;
  } | null; // coachProfile can be null
}

export default function ProfileEditableFields({
  userData,
}: {
  userData: UserProfile;
}) {
  const [formValues, setFormValues] = useState({
    sport: userData.coachProfile?.sport || '',
    availability: userData.coachProfile?.availability || 0,
    location: userData.location || '',
    description: userData.coachProfile?.description || '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: name === 'availability' ? parseInt(value) : value,
    });
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/profile/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Failed to save profile data:', error);
    }
  };

  return (
    <>
      <div className='mb-6'>
        <label className='block text-gray-700 font-semibold'>Sport</label>
        <select
          name='sport'
          value={formValues.sport}
          onChange={handleInputChange}
          className='w-full p-3 border border-gray-300 rounded mt-1'
        >
          <option value=''>Select a sport</option>
          <option value='Basketball'>Basketball</option>
          <option value='Tennis'>Tennis</option>
          <option value='Soccer'>Soccer</option>
          <option value='Swimming'>Swimming</option>
          <option value='Baseball'>Baseball</option>
          <option value='Volleyball'>Volleyball</option>
        </select>
      </div>

      <div className='mb-6'>
        <label className='block text-gray-700 font-semibold'>
          Availability
        </label>
        <input
          type='number'
          name='availability'
          value={formValues.availability}
          onChange={handleInputChange}
          className='w-full p-3 border border-gray-300 rounded mt-1'
        />
      </div>

      <div className='mb-6'>
        <label className='block text-gray-700 font-semibold'>Location</label>
        <input
          type='text'
          name='location'
          value={formValues.location}
          onChange={handleInputChange}
          className='w-full p-3 border border-gray-300 rounded mt-1'
        />
      </div>

      <div className='mb-6'>
        <label className='block text-gray-700 font-semibold'>Description</label>
        <textarea
          name='description'
          value={formValues.description}
          onChange={handleInputChange}
          className='w-full p-3 border border-gray-300 rounded mt-1'
          rows={6}
        />
      </div>

      <button
        onClick={handleSave}
        className='w-full py-3 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mt-6'
      >
        Save
      </button>
    </>
  );
}
