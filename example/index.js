// In reality, you wouldn't declare the env var this way
// We are modifying process.env directly for demonstration purposes
process.env.C9H_SERVER_HOST = '0.0.0.0'

const config = require('../')({
  name: 'c9h',
  defaults: {
    server: {
      // This will be overriden by the TOML file
      port: 3000,
      // This will be overriden by the `C9H_SERVER_HOST` env var
      host: '127.0.0.1',
    },
  },
})

console.log(JSON.stringify(config))
// => {"server":{"port":8080,"host":"0.0.0.0"}}
