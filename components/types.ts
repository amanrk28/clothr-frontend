export interface Product {
    category: string;
    createdAt: string;
    description: string;
    name: string;
    price: number;
    sold: number;
    stock: number;
    _id: string;
}

export interface AuthJWT {
    token: string;
    user: {
        email: string;
        name: string;
        role: 0 | 1;
        _id: string;
    }
}
export const EmptyAuthJWT: AuthJWT = {
    token: '',
    user: null,
}
