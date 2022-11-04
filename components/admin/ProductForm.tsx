import { Category } from "./types";

const inputClasses = "w-full bg-inherit border-t-0 border-x-0 border-neutral-500 focus:outline-none focus:shadow-none focus:border-neutral-500 focus:ring-0 placeholder:text-neutral-500 placeholder:opacity-40";

interface ProductFormProps {
    handleChange: (fieldName: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    onSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
    categories: Category[];
    values: any;
    isUpdate?: boolean;
}

export const ProductForm = ({
    handleChange,
    values,
    categories,
    onSubmit,
    isUpdate = false
}: ProductFormProps) => {
    return (
        <form>
            <div className="py-4 flex flex-col items-center justify-center relative">
                <button className="bg-green-600 text-white py-2 px-4 rounded w-full">
                    {values.photo ? values.photo?.name : 'Upload Photo'}
                </button>
                <input
                    required
                    onChange={handleChange("photo")}
                    type="file"
                    id="photo"
                    accept="image/*"
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
                    placeholder="Black T-shirt"
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
                    placeholder="Summer Black T-shirt for men..."
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
                    placeholder="399"
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
                    placeholder="200"
                />
            </div>
            <button onClick={onSubmit} className="rounded p-4 w-full mt-6 font-semibold border border-green-600 text-green-600 bg-transparent hover:text-white hover:bg-green-600 hover:shadow-md duration-300">
                {isUpdate ? 'Update' : 'Create'} Product
            </button>

        </form>
    )
}