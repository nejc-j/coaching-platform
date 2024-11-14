'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  initialSearchTerm: string;
  placeholder: string;
  className?: string;
}

function SearchBar({
  initialSearchTerm,
  placeholder,
  className,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    const params = new URLSearchParams(searchParams);
    if (newSearchTerm) {
      params.set('search', newSearchTerm);
    } else {
      params.delete('search');
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className={`w-full max-w-md mb-6 ${className}`}>
      <input
        type='text'
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholder}
        className='w-full p-2 rounded-3xl bg-quaternary border border-black text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-quinary'
      />
    </div>
  );
}

export default SearchBar;
