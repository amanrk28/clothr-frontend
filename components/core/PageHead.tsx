import Head from 'next/head';

interface Props {
    title: string;
    description: string;
}

export const PageHead = ({ title, description }: Props) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/images/clothr-dark.png" />
        </Head>
    );
}
