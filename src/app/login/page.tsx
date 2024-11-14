'use client';

import { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/'); // Redirect after successful login
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await signIn('google', { redirect: false });

    if (result?.error) {
      setError(result.error);
    } else {
      if (result?.ok && result?.url) {
        // Check if the user has a role
        const user = await fetch('/api/user'); // Make an API call to get the user data
        const userData = await user.json();

        if (!userData.role) {
          // If no role is assigned, redirect to role selection
          router.push('/select-role');
        } else {
          // Otherwise, redirect to home or the intended page
          router.push(result.url || '/');
        }
      }
    }
  };

  return (
    <div
      className='flex justify-center items-center min-h-screen'
      style={{ background: 'linear-gradient(to bottom, black, #1f1f1f)' }}
    >
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center text-black'>
          Sign In
        </h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
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
            Sign In
          </button>
          {error && <p className='text-red-500 mt-4 text-center'>{error}</p>}
        </form>

        <div className='mt-8 flex justify-center items-center space-x-4'>
          <button
            type='button'
            onClick={handleGoogleSignIn}
            className='flex items-center justify-center w-full py-2 px-4 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400'
          >
            <FcGoogle className='mr-2' />
            Sign in with Google
          </button>
        </div>

        <p className='text-center mt-6'>
          Don&apos;t have an account yet?{' '}
          <a href='/register' className='text-[#982B1C]'>
            Register here!
          </a>
        </p>
      </div>
    </div>
  );
}
