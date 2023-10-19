/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  env: {
    API_URL: "http://localhost:3001",
  },
  exportPathMap: async function () {
    return {
      "/": { page: "/sign-in" },
      "/home": { page: "/home" },
    };
  },
};