const fmw = require('find-my-way')

function Router (...routes) {
  const router = fmw()
  routes.forEach(r => router.on(...r))
  return (req, res) => router.lookup(req, res)
}

const get = (path, fn) => ['GET', path, fn]
const put = (path, fn) => ['PUT', path, fn]
const del = (path, fn) => ['DELETE', path, fn]
const post = (path, fn) => ['POST', path, fn]
const head = (path, fn) => ['HEAD', path, fn]
const options = (path, fn) => ['OPTIONS', path, fn]

module.exports = {
  Router,
  get,
  put,
  del,
  post,
  head,
  options
}
