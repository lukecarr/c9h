# Environment Variables

Cottonmouth has out-of-the-box support for environment variables.

Environment variables should be prefixed with your project's name (`options.name`) in uppercase and a trailing `_` (underscore) character.

::: warning
All environment variables are parsed by cottonmouth as strings, even if they have numeric or boolean values. You will need to perform any value parsing in your application logic.
:::

## Example

Given that your project's name is `c9h`, these environment variables:

```bash
C9H_VERBOSE="yes"
C9H_HTTP_ADDR="0.0.0.0"
HTTP_PORT=3000
```

would be parsed into the this configuration object:

```json
{
  "verbose": "yes",
  "http": {
    "addr": "0.0.0.0"
  }
}
```

::: warning
It's important to note that the `HTTP_PORT` environment variable in the above example was not loaded by cottonmouth. This is because the variable wasn't prefixed by the `C9H_` (the project's uppercase name with a trailing underscore).
:::
