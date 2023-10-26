/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  env: {
    API_URL: "http://localhost:3001",
    OAUTH_GOOGLE_ID:
      "789289297885-gcot7g5c0mtfh1cmehgahne5bjrsd68i.apps.googleusercontent.com",
  },
  exportPathMap: async function () {
    return {
      "/": { page: "/sign-in" },
      "/home": { page: "/home" },
    };
  },
};