const fmw = require('find-my-way')

function router (options) {
  return function (...routes) {
    const router = fmw(options)
    routes.forEach(rt => router.on(...rt))
    return (req, res) => router.lookup(req, res)
  }
}

const get = (path, fn, store) => ['GET', path, fn, store]
const put = (path, fn, store) => ['PUT', path, fn, store]
const del = (path, fn, store) => ['DELETE', path, fn, store]
const post = (path, fn, store) => ['POST', path, fn, store]
const head = (path, fn, store) => ['HEAD', path, fn, store]
const patch = (path, fn, store) => ['PATCH', path, fn, store]
const options = (path, fn, store) => ['OPTIONS', path, fn, store]

module.exports = {
  router,
  get,
  put,
  del,
  post,
  head,
  patch,
  options
}
