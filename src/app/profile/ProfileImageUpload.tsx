'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProfileImageUploadProps {
  imageUrl: string | null;
}

export default function ProfileImageUpload({
  imageUrl,
}: ProfileImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    const res = await fetch('/api/profile/upload-image', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      // Optionally, handle success feedback, like reloading the image
    } else {
      console.error('Failed to upload image');
    }
  };

  return (
    <div className='relative'>
      <Image
        src={imageUrl || '/coach-images/default-avatar.png'}
        alt='User Avatar'
        width={250}
        height={250}
        className='rounded-full mb-4'
      />
      <input
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        className='hidden'
        id='file-upload'
      />
      <label
        htmlFor='file-upload'
        className='cursor-pointer inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg'
      >
        Change Image
      </label>
      <button
        onClick={handleUpload}
        className='block mt-2 px-4 py-2 bg-green-500 text-white rounded-lg'
      >
        Upload
      </button>
    </div>
  );
}
