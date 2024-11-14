'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';
import { Button } from '../components/ui/button'; // Adjust the import path based on your project structure
import { signIn, signOut } from '@/auth/helpers';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default function AuthButton() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  return session?.user ? (
    <div className='flex items-center space-x-4'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='text-white border-white hover:text-[#982B1C]'
          >
            <User className='text-current' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-black text-white'>
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push('/dashboard')}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/settings')}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        onClick={handleSignOut}
        variant='borderDestructive'
        size='default'
      >
        Sign Out
      </Button>
    </div>
  ) : (
    <div className='flex space-x-4'>
      <Button
        onClick={() => router.push('/login')}
        size='default'
        className='bg-[#982B1C] text-white font-semibold border border-black hover:bg-white hover:text-[#982B1C] transition-colors duration-200'
      >
        Login
      </Button>
      <Button
        onClick={() => router.push('/register')}
        size='default'
        className='bg-transparent text-white font-semibold border border-white hover:bg-white hover:text-[#982B1C] transition-colors duration-200'
      >
        Register
      </Button>
    </div>
  );
}
