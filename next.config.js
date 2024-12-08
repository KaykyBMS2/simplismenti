const path = require('path');

module.exports = {
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, 'components'),
      '@styles': path.resolve(__dirname, 'styles'),
      '@public': path.resolve(__dirname, 'public'),
    };
    return config;
  },
  env: {
    NEXT_PUBLIC_CLERK_FRONTEND_API: "https://climbing-blowfish-67.clerk.accounts.dev",
    CLERK_API_KEY: "app_2ptvyvhNYAsK2Sh4kUCEYGPr8Mb",
  },
};