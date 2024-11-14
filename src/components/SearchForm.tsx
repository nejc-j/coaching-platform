'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchFormProps {
  sports: string[]; // Adjusted to accept an array of strings
}

const SearchForm: React.FC<SearchFormProps> = ({ sports }) => {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;

    router.push(
      `/search?search=${encodeURIComponent(search)}&sport=${encodeURIComponent(
        selectedSport || ''
      )}`
    );
  };

  return (
    <form
      className='flex flex-col gap-3 mt-2 items-center'
      onSubmit={handleSearch}
    >
      <p className='text-sm text-white text-center italic'>
        Search for a specific coach or search coaches for a certain sport
      </p>

      <div className='w-full md:w-[80%] flex flex-col md:flex-row gap-4 items-center'>
        <div className='w-full md:w-[50%]'>
          <input
            name='search'
            type='text'
            placeholder='Search for coaches...'
            className='w-full p-5 rounded-3xl focus:outline-none backdrop-blur-md'
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: 'white',
              height: '48px',
            }}
          />
        </div>

        <div className='text-white text-2xl font-bold'>/</div>

        <div className='w-full md:w-[50%]'>
          <Select onValueChange={(value) => setSelectedSport(value)}>
            <SelectTrigger
              className='w-full p-5 focus:outline-none backdrop-blur-md'
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                height: '48px',
              }}
            >
              <SelectValue placeholder='Select a sport' />
            </SelectTrigger>
            <SelectContent
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
              }}
            >
              <SelectGroup>
                {sports.map((sport, index) => (
                  <SelectItem
                    key={index}
                    value={sport}
                    className='hover:text-black hover:bg-white'
                    style={{
                      padding: '8px 12px',
                      color: 'white',
                    }}
                  >
                    {sport}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='w-full flex justify-center'>
        <button
          type='submit'
          className='p-3 px-5 rounded-3xl backdrop-blur-md flex items-center justify-center transition-transform duration-200 ease-in-out hover:scale-105'
          style={{
            backgroundColor: 'rgba(128, 0, 0, 0.6)',
            color: 'white',
          }}
        >
          Search
          <Search className='text-white ml-2' />
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
