import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className="h-60 text-white w-full flex flex-col items-center justify-center shadow-xl border-[0.02rem] border-gray-400 border-opacity-20 bg-black/20 rounded-md lg:rounded-xl backdrop-blur-lg">
            <p />
            <div className="flex items-center">
                <a href="https://www.linkedin.com/in/amanrk28/" target="_blank" rel="noopener referrer noreferrer">
                    <Image
                        className="cursor-pointer hover:scale-125 duration-300"
                        src="/images/aman.png"
                        alt="Aman Khemka"
                        width={100}
                        height={100}
                    />
                </a>
            </div>
            <a href="https://vercel.com/" className="py-2" rel="noreferrer noopener" target="_blank">
                <Image
                    className="close-btn"
                    src="https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg"
                    alt="Vercel"
                    width={170}
                    height={35}
                />
            </a>
            <p className="py-2">&copy; 2022 Clothr</p>
        </footer>
    )
};
