import React, { useState, useEffect } from "react";
import { getCategories, createProduct } from "./helper/admin-api";
import { isAutheticated } from "../auth/helper/index";
import { Category } from "./types";
import { ProductForm } from "./ProductForm";
import { AdminLayout } from "./layout";

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
        throw data.error;
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
    <AdminLayout title="Create new product">
      <ProductForm categories={categories} values={values} handleChange={handleChange} onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default AddProduct;
