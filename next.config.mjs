import nextTranslate from "next-translate";

const nextConfig = {
  ...nextTranslate(),
  webpack: (config, { isServer }) => {
    // Add any custom webpack configurations here if needed
    return config;
  },
  // Other Next.js configurations
};

export default nextConfig;
