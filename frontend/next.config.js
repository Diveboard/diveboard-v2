const withImages = require('next-images')

module.exports = withImages({
  reactStrictMode: true,

};
  images: {
    domains: ['firebasestorage.googleapis.com']
  },
  module: {
    rules: [
      //...
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  }
})


const withPWA = require('next-pwa');

module.exports = withPWA({
  extends: ['next', 'prettier'],
  images: {
    domains: ['firebasestorage.googleapis.com']
  },
  pwa: {
    dest: 'public',

  },
  webpack: (config, { isServer }) => {

    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
});

    publicExcludes: ['!assets/**/*']
  }
})



