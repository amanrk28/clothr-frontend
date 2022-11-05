/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['localhost'],
    },
    i18n: {
        defaultLocale: 'en-US',
        locales: ['en-US'],
    },
}
