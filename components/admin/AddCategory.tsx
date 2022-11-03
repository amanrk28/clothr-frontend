import React, { useState } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper";
import { createCategory } from "./helper/admin-api";
import toast from 'react-hot-toast';
import { LeftSide } from "components/user/AdminDashBoard";

const inputClasses = "w-full bg-white border-t-0 border-x-0 border-neutral-500 focus:outline-none focus:shadow-none focus:border-neutral-500 focus:ring-0 placeholder:text-neutral-500 placeholder:opacity-40";

const AddCategory = () => {
  const [name, setName] = useState("");

  const { user } = isAutheticated();

  const handleChange = event => {
    setName(event.target.value);
  };

  const onSubmit = event => {
    event.preventDefault();
    toast.promise(createCategory(user._id, { name }), {
      loading: 'Creating new category...',
      success: (data) => {
        if (data.error) {
          throw data.error;
        } else {
          setName("");
          return 'New category creation successful'
        }
      },
      error: 'Failed to create category!'
    })
  };

  const myCategoryForm = () => (
    <div className="w-full p-4 rounded">
      <form>
        <div className="py-4">
          <label htmlFor="categoryName">Enter the category</label>
          <input
            autoFocus
            required
            id="categoryName"
            type="text"
            onChange={handleChange}
            className={inputClasses}
            value={name}
            placeholder="For Ex. Summer"
          />
          <button onClick={onSubmit} className="rounded p-4 w-full mt-6 font-semibold border border-green-500 text-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:shadow-md duration-300">
            Create Category
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="bg-green-600 p-4 flex justify-center items-start"
    >
      <div className="w-3/12">
        <LeftSide />
      </div>
      <div className="w-9/12">
        <div className="bg-white m-4 p-4 rounded">
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
