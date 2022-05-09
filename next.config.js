/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SECRET_PHRASE: process.env.SECRET_PHRASE
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname
  }
}

module.exports = nextConfig
