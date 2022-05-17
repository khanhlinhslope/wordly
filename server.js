/* This is a custom server which will be used when running `pnpm dev-https` script
  Created to run a local server under HTTPS protocol. This is useful when we want to test
  some APIs that are not available on the default protocol (HTTP).
  In this project, we use navigator.share API (https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share).
  - and this server will be used to test that API.

  Some references that helped me below:
  https://github.com/vercel/next.js/discussions/10935
  https://dev.to/nakib/using-https-on-next-js-local-development-server-bcd
  https://medium.com/@greg.farrow1/nextjs-https-for-a-local-dev-server-98bb441eabd7
*/

const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: __dirname })
const handle = app.getRequestHandler()
const PORT = process.env.PORT || 5000

const httpsOptions = {
  key: fs.readFileSync('./https_cert/localhost-key.pem'),
  cert: fs.readFileSync('./https_cert/localhost.pem')
}

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(PORT, err => {
    if (err) throw err
    console.log(`Server started on url: https://localhost:${PORT}`)
  })
})
