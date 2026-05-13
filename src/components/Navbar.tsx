import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'
import MobileNav from './MobileNav'

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <nav className='sticky bg-black z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link href='/' className='flex z-40 text-white font-semibold'>
            handy<span className='text-green-600'>wrap</span>
          </Link>

          {/* Desktop nav */}
          <div className='hidden md:flex h-full items-center space-x-3 lg:space-x-4'>
            {user ? (
              <>
                <Link
                  href='/api/auth/logout'
                  className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-sm lg:text-base'>
                  Sign out
                </Link>
                {isAdmin ? (
                  <Link
                    href='/dashboard'
                    className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-sm lg:text-base'>
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link
                  href='/configandroid/upload'
                  aria-label='Design Android case'>
                  <Image
                    alt='android logo'
                    src='/android-logo.png'
                    height={35}
                    width={35}
                  />
                </Link>
                <Link href='/configure/upload' aria-label='Design iOS case'>
                  <Image
                    src='/ioslogo.png'
                    alt='apple logo'
                    height={35}
                    width={35}
                  />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/api/auth/register'
                  className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-sm lg:text-base'>
                  Sign up
                </Link>

                <Link
                  href='/api/auth/login'
                  className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded text-sm lg:text-base'>
                  Login
                </Link>

                <div className='h-8 w-px bg-zinc-200 hidden lg:block' />
                <h2 className='text-white hidden lg:block'>
                  Design yours now!
                </h2>
                <Link
                  href='/configandroid/upload'
                  aria-label='Design Android case'>
                  <Image
                    alt='android logo'
                    src='/android-logo.png'
                    height={35}
                    width={35}
                  />
                </Link>
                <Link href='/configure/upload' aria-label='Design iOS case'>
                  <Image
                    src='/ioslogo.png'
                    alt='apple logo'
                    height={35}
                    width={35}
                  />
                </Link>
              </>
            )}
          </div>

          {/* Mobile nav */}
          <MobileNav isLoggedIn={!!user} isAdmin={isAdmin} />
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
