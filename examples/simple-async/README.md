# Simple Example (Asynchronous)

> This example is the **asynchronous** variation of the `/examples/simple` example.

This is a very simple example of `cottonmouth` that includes the parsing of a TOML configuration file, with a default configuration provided, and an environment variable used to override a value.

The configuration file is named `simple.toml` because `simple` is the name defined in this directory's `package.json` file.

This name is also used as the prefix for environment variables (`SIMPLE_`).

## Running the example

You can use this example yourself by installing the dependencies (just `c9h`) and then running the `start` script:

```bash
npm ci && npm run start
# OR
yarn && yarn start
```

You should see the following output:

```
{"server":{"port":8080,"host":"0.0.0.0"}}
```
