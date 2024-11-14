import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { Graduate } from 'next/font/google';
import AuthButton from '../app/AuthButton.server';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const graduate = Graduate({ weight: '400', subsets: ['latin'] });

function Header() {
  return (
    <div className='w-full bg-black backdrop-blur-md top-0 left-0 right-0 z-50 drop-shadow-md fixed bg-opacity-35'>
      <div className='max-w-6xl mx-auto flex justify-between items-center px-4 py-[15px]'>
        <div className={graduate.className}>
          <Link href='/' className='logo flex items-center'>
            <span className='ml-3 text-white text-3xl font-semibold'>
              coach
              <span className='text-[#800000]'>UP</span>
            </span>
          </Link>
        </div>
        <div>
          <AuthButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
