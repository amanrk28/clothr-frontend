import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { signout, useAutheticate } from '../auth/helper';

export const Menu = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { user } = useAutheticate();

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
      if (user.role === 1) setIsAdmin(true);
    } else {
      setIsAdmin(false);
      setLoggedIn(false);
    }
  }, [user]);

  const common = 'px-4 text-white text-base sm:text-base md:text-lg hover:scale-110 hover:underline transition-all duration-300'

  // const currentTab = (path: string) => {
  //   if ((path.includes('admin') && router.pathname.includes('admin')) || router.pathname === path) {
  //     return { color: '#16a34a' };
  //   }
  // };

  return (
    <nav className="flex w-full justify-between sm:justify-start items-center p-4 py-6 bg-black/20 shadow-xl border-[0.02rem] border-gray-400 border-opacity-20">
      <Link href="/" className="hidden md:block">
        <Image src="/images/clothr.png" alt="clothr" width={100} height={45} className="mr-4" priority />
      </Link>
      <Link href="/" className="block md:hidden">
        <Image src="/images/clothr-light.png" alt="clothr" width={45} height={45} priority />
      </Link>
      {/* {user && user?.role === 0 && (
        <Link style={currentTab('/user/dashboard')} className={common} href="/user/dashboard">
          Dashboard
        </Link>
      )} */}
      {isAdmin ? (
        <div className="px-4 text-white text-base sm:text-base md:text-lg hover:scale-110 hover:underline transition-all duration-300 truncate">
          <Link href="/admin/dashboard">Admin Dashboard</Link>
        </div>
      ) : (
        <>
          <div className={common}>
            <Link href="/">Home</Link>
          </div>
          {isLoggedIn && (
            <div className={common}>
              <Link href="/cart">Cart</Link>
            </div>
          )}
        </>
      )}
      {isLoggedIn ? (
        <div
          className={`${common} cursor-pointer text-red-500`}
          onClick={() => signout().then(() => {
            toast.success('Log out successful');
            router.push('/');
          })}
        >
          Signout
        </div>
      ) : (
        <>
          <div className={common}>
            <Link href="/signup">Sign up</Link>
          </div>
          <div className={common}>
            <Link href="/signin">Sign in</Link>
          </div>
        </>
      )}
    </nav>
  )
};
