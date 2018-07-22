const qs = require('querystring')
const url = require('url')
const fmw = require('find-my-way')

function router (options) {
  return function (...routes) {
    const router = fmw(options)
    routes.forEach(rt => router.on(...rt))
    return (req, res) => router.lookup(req, res)
  }
}

function enhancer (fn) {
  return function (req, res, params, store) {
    req.params = params
    req.query = qs.parse(url.parse(req.url).query)
    return fn(req, res, store)
  }
}

const get = (path, fn, store) => ['GET', path, enhancer(fn), store]
const put = (path, fn, store) => ['PUT', path, enhancer(fn), store]
const del = (path, fn, store) => ['DELETE', path, enhancer(fn), store]
const post = (path, fn, store) => ['POST', path, enhancer(fn), store]
const head = (path, fn, store) => ['HEAD', path, enhancer(fn), store]
const patch = (path, fn, store) => ['PATCH', path, enhancer(fn), store]
const options = (path, fn, store) => ['OPTIONS', path, enhancer(fn), store]

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
