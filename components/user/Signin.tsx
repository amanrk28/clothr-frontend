import React, { useState, useEffect } from "react";
import Base from "components/core/Base";
import { signin, authenticate, isAutheticated } from "components/auth/helper";
import { useRouter } from "next/router";
import toast from 'react-hot-toast';

const Signin = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "amanalt@gmail.com",
    password: "123456",
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

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In page" description="A page for user to sign in!">
      {loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )}
      {errorMessage()}
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Base>
  );
};

export default Signin;
