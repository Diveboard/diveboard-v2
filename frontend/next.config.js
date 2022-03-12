module.exports = {
  reactStrictMode: true,
}

const withPWA = require('next-pwa')

module.exports = withPWA({
  extends: ["next", "prettier"],
  pwa: {
    dest: 'public'
  }
})
