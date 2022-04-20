module.exports = {
  reactStrictMode: true
};

const withPWA = require('next-pwa');

module.exports = withPWA({
  extends: ['next', 'prettier'],
  pwa: {
    dest: 'public'
  },
  webpack: (config, { isServer }) => {

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  images: {
    domains: ['firebasestorage.googleapis.com']
  }
});


