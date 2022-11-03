import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { getCategories, createProduct } from "./helper/admin-api";
import { isAutheticated } from "../auth/helper/index";
import { LeftSide } from "components/user/AdminDashBoard";
import { Category } from "./types";

const inputClasses = "w-full bg-white border-t-0 border-x-0 border-neutral-500 focus:outline-none focus:shadow-none focus:border-neutral-500 focus:ring-0 placeholder:text-neutral-500 placeholder:opacity-40";

const AddProduct = () => {
  const { user } = isAutheticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    category: "",
    formData: new FormData(),
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const preload = () => {
    getCategories().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    createProduct(user._id, values.formData).then(data => {
      if (data.error) {
        throw data.error
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
        });
      }
    });
  };

  const handleChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const value = fieldName === "photo" ? event.target.files[0] : event.target.value;
    values.formData.set(fieldName, value);
    setValues({ ...values, [fieldName]: value });
  };

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="bg-green-600 p-4 flex justify-center items-start"
    >
      <div className="w-3/12">
        <LeftSide />
      </div>
      <div className="w-9/12">
        <div className="bg-white m-4 p-4 h-full rounded">
          <form>
            <div className="py-4 flex flex-col items-center justify-center relative">
              <button className="bg-green-500 text-white py-2 px-4 rounded w-full">
                Upload Photo
              </button>
              <input
                required
                onChange={handleChange("photo")}
                type="file"
                id="photo"
                accept="image"
                placeholder="choose a file"
                className="cursor-pointer absolute w-full opacity-0 py-2"
              />
            </div>
            <div className="py-4">
              <label htmlFor="price">Name</label>
              <input
                required
                id="name"
                onChange={handleChange("name")}
                type="text"
                value={values.name}
                className={inputClasses}
              />
            </div>
            <div className="py-4">
              <label htmlFor="description">Description</label>
              <textarea
                required
                onChange={handleChange("description")}
                id="description"
                value={values.description}
                className={inputClasses}
              />
            </div>
            <div className="py-4">
              <label htmlFor="price">Price</label>
              <input
                required
                id="price"
                onChange={handleChange("price")}
                type="number"
                value={values.price}
                className={inputClasses}
              />
            </div>
            <div className="py-4">
              <label htmlFor="category">Category</label>
              <select
                required
                id="category"
                onChange={handleChange("category")}
                className={inputClasses}
              >
                {categories &&
                  categories.map((cate, index) => (
                    <option key={index} value={cate._id}>
                      {cate.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="py-4">
              <label htmlFor="stock">Stock</label>
              <input
                required
                id="stock"
                onChange={handleChange("stock")}
                type="number"
                className={inputClasses}
                value={values.stock}
              />
            </div>
            <button onClick={onSubmit} className="rounded p-4 w-full mt-6 font-semibold border border-green-500 text-green-500 bg-transparent hover:text-white hover:bg-green-500 hover:shadow-md duration-300">
              Create Product
            </button>

          </form>
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
