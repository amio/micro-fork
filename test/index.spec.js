const tap = require('tap')
const request = require('supertest')
const { router, get, put, del, post, head, patch, options } = require('..')

const server = require('http').createServer(router()(
  get('/ping', (req, res) => res.end('pong')),
  post('/users', (req, res) => res.end('created')),
  del('/users/:id', (req, res) => res.end(`deleted ${req.params.id}`)),
  get('/users', (req, res) => res.end(`query age ${req.query.age}`))
))

tap.test('Exports right api types', t => {
  t.equal(typeof router, 'function', 'exports function router')
  t.equal(typeof get, 'function', 'exports function get')
  t.equal(typeof put, 'function', 'exports function put')
  t.equal(typeof del, 'function', 'exports function del')
  t.equal(typeof post, 'function', 'exports function post')
  t.equal(typeof head, 'function', 'exports function head')
  t.equal(typeof patch, 'function', 'exports function patch')
  t.equal(typeof options, 'function', 'exports function options')
  t.end()
})

tap.test('Response to GET:/ping with 200', t => {
  return request(server)
    .get('/ping')
    .expect(200, 'pong')
})

tap.test('Response to POST:/users with 200', t => {
  return request(server)
    .post('/users')
    .send({ name: 'john' })
    .expect(200, 'created')
})

tap.test('Response to DELETE:/users/123 with 200', t => {
  return request(server)
    .delete('/users/123')
    .expect(200, 'deleted 123')
})

tap.test('Response to GET:/users?age=20 with 200', t => {
  return request(server)
    .get('/users?age=20')
    .expect(200, 'query age 20')
})

tap.test('Response to unmatched route with 404', t => {
  return request(server)
    .get('/404')
    .expect(404)
})
