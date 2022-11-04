import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
    getCategory,
    updateCategory,
} from "./helper/admin-api";
import { isAutheticated } from "../auth/helper";
import { AdminLayout } from "./layout";
import { CategoryForm } from "./CategoryForm";

const UpdateCategory = () => {
    const { user } = isAutheticated();
    const router = useRouter();

    const [name, setName] = useState<string>('');

    const preload = () => {
        getCategory(router.query?.categoryId?.toString()).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setName(data.name);
            }
        });
    };

    useEffect(() => {
        preload();
    }, [router.query]);

    const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toast.promise(
            updateCategory(router.query.productId.toString(), user._id, { name }), {
            loading: `Updating category...`,
            success: data => {
                if (data.error) {
                    throw data.error;
                } else {
                    setName('');
                    router.push('/admin/categories')
                    return 'Category Updated';
                }
            },
            error: 'Failed to update category!'
        })
    };

    const handleChange = (value: string) => {
        setName(value);
    };

    return (
        <AdminLayout title="Update Category">
            <CategoryForm handleChange={handleChange} onSubmit={onSubmit} name={name} isUpdate />
        </AdminLayout>
    );
};

export default UpdateCategory;
