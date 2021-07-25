// In reality, you wouldn't declare the env var this way
// We are modifying process.env directly for demonstration purposes
process.env.SIMPLE_SERVER_HOST = '0.0.0.0'

const { load } = require('c9h')

;(async () => {
  const config = await load({
    defaults: {
      server: {
        // This will be overriden by the TOML file
        port: 3000,
        // This will be overriden by the `SIMPLE_SERVER_HOST` env var
        host: '127.0.0.1',
      },
    },
  })

  console.log(JSON.stringify(config))
  // => {"server":{"port":8080,"host":"0.0.0.0"}}
})()
