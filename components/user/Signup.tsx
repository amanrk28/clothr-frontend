import Link from "next/link";
import React, { useState } from "react";
import toast from 'react-hot-toast';
import Base from "../core/Base";
import { signup } from "../auth/helper";
import { AuthPayload } from "components/auth/helper/types";

const Signup = () => {
  const [values, setValues] = useState<AuthPayload>({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = values;

  const handleChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [fieldName]: event.target.value });
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setValues({ ...values });
    toast.promise(signup({ name, email, password }), {
      loading: 'Signing Up...',
      success: (data) => {
        if (data.error) {
          throw data.error;
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
          });
          return 'Signup Successful'
        }
      },
      error: 'Signup Request Failed!',
    });
  }

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
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

export default Signup;
