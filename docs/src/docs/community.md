# Community

## 🌐 fastify-c9h

[fastify-c9h](https://github.com/lukecarr/fastify-c9h) is a Fastify plugin which decorates the Fastify instance with a `c9h` property for accessing your application's configuration values.

```ts
import fastify from 'fastify'
import c9h from 'fastify-c9h'

const server = fastify({ logger: true })

server.register(c9h, { /* c9h options */ })

server.get('/', async function() {
  return { 'hello': this.c9h.your.config.variable }
})

// ...
```
