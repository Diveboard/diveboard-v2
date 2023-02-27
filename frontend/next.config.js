const withImages = require('next-images');

module.exports = withImages({
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
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
            }
          }
        ]
      }
    ]
  }
})

const withPWA = require('next-pwa');
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const runtimeCaching = require('./public/cache.js');

module.exports = withPWA({
  extends: ['next', 'prettier'],
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },

  // webpack: (config, {  isServer }) => {
  //   if (isServer) {
  //     config.plugins.push(
  //       new WebpackShellPlugin({
  //         onBuildExit: {
  //           scripts: [
  //             'echo "Transfering files ... "',
  //             'cp -r .next/build-manifest.json public/build-manifest.json',
  //             'echo "DONE ... "',
  //           ],
  //           blocking: false,
  //           parallel: true
  //         }
  //       })
  //     )
  //   }
  //   return config
  // },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    publicExcludes: ['!appIcons/**/*', '!images/**/*', '!species/**/*'],
    runtimeCaching,
    cacheOnFrontEndNav: true,
    fallbacks: {
      image: '/appIcons/diveboard-logo.svg',
    }
  }
});
