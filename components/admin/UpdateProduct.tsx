import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getCategories,
  getProduct,
  updateProduct
} from "./helper/admin-api";
import { isAutheticated } from "../auth/helper";
import { Category } from "./types";
import { ProductForm } from "./ProductForm";
import { AdminLayout } from "./layout";

const UpdateProduct = () => {
  const { user } = isAutheticated();
  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    category: "",
    formData: new FormData(),
  });

  const [categories, setCategories] = useState<Category[]>([])

  const preload = () => {
    if (!router.query.productId) return;
    getProduct(router.query?.productId?.toString()).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        preloadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData()
        });
      }
    });
  };

  const preloadCategories = () => {
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
  }, [router.query]);

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    toast.promise(
      updateProduct(router.query.productId.toString(), user._id, values.formData), {
      loading: `Updating ${values.name} details...`,
      success: data => {
        if (data.error) {
          throw data.error;
        } else {
          router.push('/admin/products')
          return 'Product Details Updated';
        }
      },
      error: 'Failed to update product details!'
    })
  };

  const handleChange = (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const value = fieldName === "photo" ? event.target.files[0] : event.target.value;
    values.formData.set(fieldName, value);
    setValues({ ...values, [fieldName]: value });
  };

  return (
    <AdminLayout
      title="Update product details"
    >
      <ProductForm isUpdate categories={categories} values={values} handleChange={handleChange} onSubmit={onSubmit} />
    </AdminLayout>
  );
};

export default UpdateProduct;
