import Link from 'next/link'
import React from 'react';
import toast from 'react-hot-toast';
import { signout, isAutheticated } from '../auth/helper';
import { useRouter } from 'next/router';

const common = 'px-4 text-white text-sm sm:text-base md:text-lg hover:scale-110 hover:underline transition-all duration-300'

export const Menu = () => {
  const router = useRouter();
  const { user } = isAutheticated();
  const currentTab = (path: string) => {
    if ((path.includes('admin') && router.pathname.includes('admin')) || router.pathname === path) {
      return { color: '#16a34a' };
    }
  };

  return (
    <div className="flex w-full justify-start items-center p-4 py-6 bg-black/20 shadow-xl border-[0.02rem] border-gray-400 border-opacity-20">
      <Link style={currentTab('/')} className={common} href="/">
        Home
      </Link>
      <Link style={currentTab('/cart')} className={common} href="/cart">
        Cart
      </Link>
      {user && user?.role === 0 && (
        <Link style={currentTab('/user/dashboard')} className={common} href="/user/dashboard">
          Dashboard
        </Link>
      )}
      {user && user?.role === 1 ? (
        <Link style={currentTab('/admin/dashboard')} className={common} href="/admin/dashboard">
          Admin Dashboard
        </Link>
      ) : null}
      {!user ? (
        <>
          <Link style={currentTab('/signup')} className={common} href="/signup">
            Sign up
          </Link>
          <Link style={currentTab('/signin')} className={common} href="/signin">
            Sign in
          </Link>
        </>
      ) : null}
      {user ? (
        <span
          className={`${common} cursor-pointer text-red-500`}
          onClick={() => signout(() => {
            toast.success('Log out successful');
            router.push('/');
          })}
        >
          Signout
        </span>
      ) : null}
    </div>
  )
};
