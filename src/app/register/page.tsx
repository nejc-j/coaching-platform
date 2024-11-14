'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const [role, setRole] = useState('ATHLETE'); // Default to 'Athlete'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName, role }),
      });

      const rawData = await response.text();
      console.log('Raw response:', rawData);

      const data = JSON.parse(rawData);

      if (response.ok) {
        setSuccess(
          'User created. Please check your email to verify your account.'
        );

        // Redirect to the previous page after 2 seconds
        setTimeout(() => {
          router.back();
        }, 2000);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Something went wrong');
    }
  };

  return (
    <div
      className='flex justify-center items-center min-h-screen'
      style={{ background: 'linear-gradient(to bottom, black, #1f1f1f)' }}
    >
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center text-black'>
          Sign Up
        </h1>
        <div className='flex justify-center mb-6 space-x-4'>
          <button
            type='button'
            className={`px-4 py-2 font-semibold rounded-lg ${
              role === 'ATHLETE'
                ? 'bg-[#982B1C] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setRole('ATHLETE')}
          >
            Athlete
          </button>
          <button
            type='button'
            className={`px-4 py-2 font-semibold rounded-lg ${
              role === 'COACH'
                ? 'bg-[#982B1C] text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setRole('COACH')}
          >
            Coach
          </button>
        </div>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='flex flex-col md:flex-row md:space-x-4'>
            <div className='flex-1'>
              <label
                htmlFor='firstName'
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                First Name
              </label>
              <input
                type='text'
                id='firstName'
                placeholder='John'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>
            <div className='flex-1'>
              <label
                htmlFor='lastName'
                className='block mb-2 text-sm font-medium text-gray-700'
              >
                Last Name
              </label>
              <input
                type='text'
                id='lastName'
                placeholder='Doe'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>
          </div>
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              placeholder='email@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-[#800000] text-white font-semibold rounded-lg shadow-md hover:bg-[#982B1C] focus:outline-none focus:ring-2 focus:ring-[#800000]'
          >
            Sign Up
          </button>
          {error && <p className='text-red-500 mt-4 text-center'>{error}</p>}
          {success && (
            <p className='text-green-500 mt-4 text-center'>{success}</p>
          )}
        </form>
        <p className='text-center mt-6'>
          Already have an account?{' '}
          <a href='/login' className='text-[#982B1C]'>
            Login here!
          </a>
        </p>
      </div>
    </div>
  );
}
