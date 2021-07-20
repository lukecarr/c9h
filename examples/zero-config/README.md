# Zero Config Example

This is an example of `cottonmouth` that demonstrates the library's zero-config capabilities.

The configuration file is named `zero-config.json5` because `zero-config` is the name defined in this directory's `package.json` file, and this is where `cottonmouth` will look by default.

This name is also used as the prefix for environment variables (`ZERO_CONFIG_`).

## Running the example

You can use this example yourself by installing the dependencies (just `c9h`) and then running the `start` script:

```bash
npm ci && npm run start
# OR
yarn && yarn start
```

You should see the following output:

```
{"http":{"https":true,"listen":{"addr":"0.0.0.0","port":3000}}}
```