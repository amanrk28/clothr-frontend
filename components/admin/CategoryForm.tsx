import { useRouter } from 'next/router';
import React from 'react';

const inputClasses = 'w-full bg-inherit border-t-0 border-x-0 border-neutral-500 focus:outline-none focus:shadow-none focus:border-neutral-500 focus:ring-0 placeholder:text-neutral-500 placeholder:opacity-40';

interface Props {
    handleChange: (value: string) => void;
    name: string;
    onSubmit: () => void;
    isUpdate?: boolean;
}

export const CategoryForm: React.FC<Props> = ({
    handleChange,
    name,
    onSubmit,
    isUpdate = false,
}) => {
    const router = useRouter();
    return (
        <form>
            <div className="py-4">
                <label htmlFor="categoryName">Enter the category</label>
                <input
                    autoFocus
                    required
                    id="categoryName"
                    type="text"
                    onChange={e => handleChange(e.target.value)}
                    className={inputClasses}
                    value={name}
                    placeholder="For Ex. Summer"
                />
                <div className="flex flex-col md:flex-row justify-between">
                    <button onClick={onSubmit} className="rounded p-2 md:p-4 w-full mt-6 mx-2 font-semibold border border-green-600 text-green-600 bg-transparent hover:text-white hover:bg-green-600 hover:shadow-md duration-300">
                        {isUpdate ? 'Update' : 'Create'} Category
                    </button>
                    {isUpdate ? (
                        <button onClick={() => router.back()} className="rounded p-2 md:p-4 w-full mt-6 mx-2 font-semibold border border-red-600 text-red-600 bg-transparent hover:text-white hover:bg-red-600 hover:shadow-md duration-300">
                            Cancel
                        </button>
                    ) : null}
                </div>
            </div>
        </form>
    )
}
