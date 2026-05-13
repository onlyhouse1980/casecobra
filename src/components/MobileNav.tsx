'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface MobileNavProps {
  isLoggedIn: boolean
  isAdmin: boolean
}

const MobileNav = ({ isLoggedIn, isAdmin }: MobileNavProps) => {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className='md:hidden'>
      <button
        aria-label='Toggle navigation menu'
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className='text-white p-2 rounded hover:bg-white/10'>
        {open ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
      </button>

      {open ? (
        <div className='fixed inset-x-0 top-14 z-[99] bg-black border-t border-zinc-700 shadow-lg'>
          <div className='px-4 py-6 flex flex-col gap-3'>
            {isLoggedIn ? (
              <>
                <Link
                  href='/api/auth/logout'
                  className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-center'>
                  Sign out
                </Link>
                {isAdmin ? (
                  <Link
                    href='/dashboard'
                    className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-center'>
                    Dashboard ✨
                  </Link>
                ) : null}
              </>
            ) : (
              <>
                <Link
                  href='/api/auth/register'
                  className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-center'>
                  Sign up
                </Link>
                <Link
                  href='/api/auth/login'
                  className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-center'>
                  Login
                </Link>
              </>
            )}

            <div className='h-px w-full bg-zinc-700 my-2' />

            <p className='text-white text-center text-sm'>Design yours now!</p>
            <div className='flex justify-center gap-6'>
              <Link
                href='/configandroid/upload'
                aria-label='Design Android case'>
                <Image
                  alt='android logo'
                  src='/android-logo.png'
                  height={40}
                  width={40}
                />
              </Link>
              <Link href='/configure/upload' aria-label='Design iOS case'>
                <Image
                  src='/ioslogo.png'
                  alt='apple logo'
                  height={40}
                  width={40}
                />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
