const { https } = require('firebase-functions')
const { default: next } = require('next')
const { parse } = require('url')
const { join } = require('path')

const isDev = process.env.NODE_ENV !== 'production'

const server = next({
    dev: isDev,
    conf: { distDir: '.next',
        images: {
            domains: ['firebasestorage.googleapis.com'],
        }}
})

const nextjsHandle = server.getRequestHandler();

exports.nextServer = https.onRequest((req, res) => {
    return server.prepare().
    then(() => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;
        if (pathname === '/sw.js' || /^\/(workbox|worker|fallback)-\w+\.js$/.test(pathname)) {
            const filePath = join(__dirname, '.next', pathname)
            server.serveStatic(req, res, filePath)
        } else {
            nextjsHandle(req, res)
        }
    })
})
