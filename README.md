# micro-fork

A fast and functional router for ZEIT's [Micro](https://github.com/zeit/micro).
Inspired by [microrouter](https://github.com/pedronauck/micro-router),
but use [find-my-way](https://github.com/delvedor/find-my-way) underneath.

## Features

* **Tiny**. Just couple lines of code.
* **Functional**. Write your http methods using functions.
* **Async**. Design to use with `async/await`

## Usage

Install as project dependency:

```bash
$ npm install micro-fork
```

Then you can define your routes inside your microservice:

```js
const { send } = require('micro')
const { router, get } = require('micro-fork')

const hello = (req, res) => send(res, 200, `Hello ${req.params.who}`)
const notfound = (req, res) => send(res, 404, 'Not found route')

module.exports = router()(
  get('/hello/:who', hello),
  get('/*', notfound)
)
```

### `async/await`

You can use your handler as an async function:

```js
const { send } = require('micro')
const { router, get } = require('micro-fork')

const hello = async (req, res, params) =>
  send(res, 200, await Promise.resolve(`Hello ${params.who}`))

module.exports = router()(
  get('/hello/:who', hello)
)
```

### router

Initialize a router:

```javascript
router([options = Object])(
  routeMethodA,
  routeMethodB,
  // ...
)
```

The `options` will directly goes to [find-my-way](https://github.com/delvedor/find-my-way#findmywayoptions)


### route methods

Each route is a single basic http method that you import from `micro-fork` and has the same arguments:

* `get(path = String, handler = Function, [store = Object])`
* `post(path = String, handler = Function, [store = Object])`
* `put(path = String, handler = Function, [store = Object])`
* `patch(path = String, handler = Function, [store = Object])`
* `del(path = String, handler = Function, [store = Object])`
* `head(path = String, handler = Function, [store = Object])`
* `options(path = String, handler = Function, [store = Object])`

#### path

A simple url pattern that you can define your path. In this path you can set your parameters using a `:` notation. The `req` parameter from `handler` will return this parameters as an object.

For more information about how you can define your path, see [find-my-way](https://github.com/snd/url-pattern) that's the package that we're using to match paths.

#### handler

The `handler` method is a simple function that will make some action base on your path.
The format of this function is `(req, res, params, store) => {}`

##### `params`

As you can see below, the `params` parameter represents the parameters defined in your `path`:

```js
const { router, get } = require('micro-fork')
const request = require('some-request-lib')

// service.js
module.exports = router()(
  get('/hello/:who', (req, res, params) => params)
)

// test.js
const response = await request('/hello/World')

console.log(response)  // { who: 'World' }
```

#### `store`

Last argument, `store` is used to pass an object that you can access later inside the handler function. If needed, store can be updated.

### Parsing Body

By default, router _doens't parse anything_ from your requisition, it's just match your paths and execute a specific handler. So, if you want to parse your body requisition you can do something like that:

```js
const { router, post } = require('micro-fork')
const { json, send } = require('micro')
const request = require('some-request-lib')

// service.js
const user = async (req, res) => {
  const body = await json(req)
  send(res, 200, body)
}

module.exports = router()(
  post('/user', user)
)

// test.js
const body = { id: 1 }
const response = await request.post('/user', { body })
```

## License

MIT @ Amio

[amio-link]: https://github.com/amio
[npm-badge]: https://img.shields.io/npm/v/nls.svg?style=flat-square
[npm-link]: https://www.npmjs.com/package/nls
