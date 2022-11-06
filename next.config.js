/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        domains: ['localhost', 'www.datocms-assets.com', 'res.cloudinary.com'],
    },
    i18n: {
        defaultLocale: 'en-US',
        locales: ['en-US'],
    },
}
