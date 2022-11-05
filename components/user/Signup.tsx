import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Base from '../core/Base';
import { authenticate, isAutheticated, signup } from '../auth/helper';
import { AuthPayload } from 'components/auth/helper/types';
import { inputClasses } from './Signin';
import { useRouter } from 'next/router';

const Signup = () => {
  const router = useRouter();
  const [values, setValues] = useState<AuthPayload & { didRedirect: boolean }>({
    name: '',
    email: '',
    password: '',
    didRedirect: false,
  });

  const { name, email, password, didRedirect } = values;
  const { user } = isAutheticated();

  useEffect(() => {
    if (didRedirect) {
      if (user && user?.role === 1) {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }
    }
    if (user) {
      router.push('/');
    }
  }, [didRedirect, router, user]);

  const handleChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const onSubmit = () => {
    setValues({ ...values });
    toast.promise(signup({ name, email, password }), {
      loading: 'Signing Up...',
      success: data => {
        if (data.error) {
          throw data.error;
        } else {
          authenticate(data, () => {
            setValues({
              name: '',
              email: '',
              password: '',
              didRedirect: true,
            });
          })
          return 'Signup Successful'
        }
      },
      error: 'Signup Request Failed!',
    });
  }

  return (
    <Base title="Sign up page" description="" className="px-4 text-white">
      <div className="bg-neutral-500 max-w-lg m-auto p-4 rounded">
        <form>
          <div className="py-4">
            <label className="text-light">Name</label>
            <input
              onChange={handleChange('name')}
              type="text"
              className={inputClasses}
              value={name}
            />
          </div>
          <div className="py-4">
            <label className="text-light">Email</label>
            <input
              onChange={handleChange('email')}
              type="email"
              className={inputClasses}
              value={email}
            />
          </div>

          <div className="py-4">
            <label className="text-light">Password</label>
            <input
              onChange={handleChange('password')}
              type="password"
              className={inputClasses}
              value={password}
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

export default Signup;
