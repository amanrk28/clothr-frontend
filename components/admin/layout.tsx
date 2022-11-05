import Link from 'next/link';
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { isAutheticated } from 'components/auth/helper';
import Base from 'components/core/Base'

interface Props {
    title: string;
    children: JSX.Element | JSX.Element[];
    className?: string;
}
const navbarLinks = [
    { name: 'Profile', link: '/admin/dashboard' },
    { name: 'Create Categories', link: '/admin/create/category' },
    { name: 'Manage Categories', link: '/admin/categories' },
    { name: 'Create Products', link: '/admin/create/product' },
    { name: 'Manage Products', link: '/admin/products' },
    { name: 'Manage Orders', link: '/admin/orders' },
]

export const LeftSide = () => {
    const router = useRouter();
    return (
        <div className="w-full h-full md:w-3/12 p-4 border-b-2 md:border-b-0 md:border-r-2">
            <div className="flex flex-col items-start rounded p-4">
                {navbarLinks.map((item, index) => (
                    <Link key={index} href={item.link} className="py-4 pl-4 w-full hover:scale-110 hover:underline transition-all ease-out duration-300">
                        <p className="relative text-lg">
                            <span className="absolute -left-4 text-green-600 font-bold">{router.pathname === item.link && '>'}</span> {item.name}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

interface RightSideProps {
    title: string;
    children: JSX.Element | JSX.Element[];
}

export const RightSide: React.FC<RightSideProps> = ({ title, children }) => {
    return (
        <div className="w-full md:w-9/12 p-4 overflow-y-scroll h-full">
            <div className="flex flex-col items-start rounded p-4">
                <h4 className="text-green-600 text-2xl font-medium pb-4">{title}</h4>
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export const AdminLayout: React.FC<Props> = ({
    children,
    title,
    className = '',
}) => {
    const { user, token } = isAutheticated();
    const router = useRouter();
    useEffect(() => {
        if (!user || !token) {
            toast.error('Login to view dashboard');
            router.push('/');
        } else if (user && user.role !== 1) {
            toast.error('You do not have permission to view this page');
            router.push('/');
        }
    }, [router, token, user]);

    return (
        <Base
            title=""
            description=""
            className={`text-white md:h-[calc(100vh-80px)] flex flex-col md:flex-row justify-center items-start ${className}`}
        >
            <LeftSide />
            <RightSide title={title}>
                {children}
            </RightSide>
        </Base>
    )
}
