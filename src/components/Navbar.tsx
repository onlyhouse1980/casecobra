import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import Image from 'next/image'
import { Black_And_White_Picture } from 'next/font/google'

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const isAdmin = user?.email === process.env.ADMIN_EMAIL

  return (
    <nav className='sticky bg-black z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link href='/' className='flex z-40  text-white font-semibold'>
            handy<span className='text-green-600'>wrap</span>
          </Link>

          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <Link
                  href='/api/auth/logout'
                  className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                  Sign out
                </Link>
                {isAdmin ? (
                  <Link
                    href='/dashboard'
                    className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link
                  href='/configandroid/upload'>
                    <Image alt='android logo' src='/android-logo.png' height={35} width={35} />
                  </Link>
                <Link
                  href='/configure/upload'
                  >
                    <Image src='/ioslogo.png' alt='apple logo' height={35} width={35} />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/api/auth/register'
                  className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                  Sign up
                </Link>

                <Link
                  href='/api/auth/login'
                  className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>
                  Login
                </Link>

                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />
                  <h2 className='text-white'>Design yours now!</h2>
                <Link
                  href='/configandroid/upload'>
                    <Image alt='android logo' src='/android-logo.png' height={35} width={35} />
                  </Link>
                <Link
                  href='/configure/upload'
                  >
                    <Image src='/ioslogo.png' alt='apple logo' height={35} width={35} />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
