const tap = require('tap')
const request = require('supertest')
const { router, get, put, del, post, head, patch, options } = require('..')

const server = require('http').createServer(router()(
  get('/ping', (req, res) => res.end('pong')),
  post('/users', (req, res) => res.end('created')),
  del('/users/:id', (req, res, params) => res.end(`deleted ${params.id}`))
))

tap.test('Exports right api types', t => {
  t.is(typeof router, 'function')
  t.is(typeof get, 'function')
  t.is(typeof put, 'function')
  t.is(typeof del, 'function')
  t.is(typeof post, 'function')
  t.is(typeof head, 'function')
  t.is(typeof patch, 'function')
  t.is(typeof options, 'function')
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

tap.test('Response unmatched route with 404', t => {
  return request(server)
    .get('/404')
    .expect(404)
})
