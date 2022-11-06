import React, { useState, useEffect, useCallback } from 'react';
import Base from 'components/core/Base';
import { signin, authenticate, useAutheticate as useAutheticate } from 'components/auth/helper';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export const inputClasses = 'w-full bg-transparent border-t-0 border-x-0 border-white focus:outline-none focus:shadow-none focus:border-white focus:ring-0 placeholder:text-white placeholder:opacity-40';

const Signin = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: '',
    didRedirect: false,
  });

  const { user } = useAutheticate();

  useEffect(() => {
    if (values.didRedirect) {
      if (user && user?.role === 1) {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    }
    if (user) {
      if (user.role === 1) router.push('/admin/dashboard');
      else router.push('/');
    }
  }, [values.didRedirect, router, user]);

  const handleChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const onSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { email, password } = values;
    toast.promise(signin({ email, password }), {
      loading: 'Signing In...',
      success: data => {
        if (data.error) {
          throw data.error;
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
            });
          });
          return 'Signin Successful'
        }
      },
      error: err => err || 'Signin request failed',
    })
  }, [values]);

  return (
    <Base title="Sign In " description="" className="px-4 text-white">
      <div className="bg-neutral-500 max-w-lg m-auto p-4 rounded">
        <form>
          <div className="py-4">
            <label htmlFor="email" className="text-light">Email </label>
            <input
              onChange={handleChange('email')}
              value={values.email}
              className={inputClasses}
              type="email"
              placeholder="example@email.com"
            />
          </div>
          <div className="py-4">
            <label htmlFor="password" className="text-light">Password </label>
            <input
              id="password"
              onChange={handleChange('password')}
              value={values.password}
              className={inputClasses}
              type="password"
            />
          </div>
          <button onClick={onSubmit} className="rounded p-4 w-full mt-6 font-semibold border border-white bg-transparent hover:bg-white text-white hover:text-neutral-500 hover:shadow-md duration-300">
            Submit
          </button>
        </form>
      </div>
    </Base>
  );
};

export default Signin;
