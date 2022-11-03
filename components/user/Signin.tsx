import React, { useState, useEffect } from "react";
import Base from "components/core/Base";
import { signin, authenticate, isAutheticated } from "components/auth/helper";
import { useRouter } from "next/router";
import toast from 'react-hot-toast';

export const inputClasses = "w-full bg-transparent border-t-0 border-x-0 border-white focus:outline-none focus:shadow-none focus:border-white focus:ring-0 placeholder:text-white placeholder:opacity-40";

const Signin = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: false,
    loading: false,
    didRedirect: false
  });

  const { email, password, error, loading, didRedirect } = values;
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
  }, [didRedirect]);

  const handleChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, error: false, [fieldName]: event.target.value });
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    toast.promise(signin({ email, password }), {
      loading: 'Signing In...',
      success: (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
          throw data.error;
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            });
          });
          return 'Signin Successful'
        }
      },
      error: 'Signin request failed',
    })
  };

  return (
    <Base title="Sign In page" description="A page for user to sign in!" className="py-20 text-white">
      {loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )}
      <div className="bg-neutral-500 max-w-lg m-auto p-4 rounded">
        <form>
          <div className="py-4">
            <label htmlFor="email" className="text-light">Email </label>
            <input
              onChange={handleChange("email")}
              value={email}
              className={inputClasses}
              type="email"
              placeholder="example@email.com"
            />
          </div>

          <div className="py-4">
            <label htmlFor="password" className="text-light">Password </label>
            <input
              id='password'
              onChange={handleChange("password")}
              value={password}
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