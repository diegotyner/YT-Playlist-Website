'use server'

import React from 'react'
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import CustomAvatar from './avatar';

const Nav = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession()

  return (
    <nav className='flex justify-between items-center w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        Home
      </Link>
      
      
      <Link href='/create' className='flex gap-2 flex-center'>
        Create
      </Link>

      {/* Desktop */}
      <div className='sm:flex hidden'>
        <div className='flex gap-3 md:gap-5'>
          <Link className='flex items-center' href='/profile'>
            Profile
            <div className='ml-4'>
              <CustomAvatar avatar_url={data.session?.user.user_metadata.custom_metadata?.avatar_url}/>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className='sm:hidden flex'>
        <div className='flex gap-3 md:gap-5'>
          <Link className='flex items-center' href='/profile'>
            <CustomAvatar avatar_url={data.session?.user.user_metadata.custom_metadata?.avatar_url}/>
          </Link>
        </div>
      </div>

    </nav>
  )
}

export default Nav