/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
  env: {
    API_URL: "http://localhost:3001",
  },
  exportPathMap: async function () {
    return {
      "/": { page: "/sign-in" }, // Page de connexion en tant que page d'accueil
      "/sign-in": { page: "/sign-in" }, // Assurez-vous d'avoir une entrée pour /loginAndSignUp
      // ... Autres pages de votre application
    };
  },
};