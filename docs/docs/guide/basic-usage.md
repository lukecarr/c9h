# Basic Usage

You can find some basic usage of cottonmouth below. For a full e2e tutorial, take a look at our [5 Min Tutorial](/docs/tutorial/)!

```js
const config = require('c9h')({
  /* options */
});
// OR
import c9h from 'c9h';
const config = c9h({
  /* options */
});
```

This will look for `your-package.{toml,yaml,yml,json,json5,ini}` in `./` (the current working directory), `/etc/your-package/`, and `$HOME/.your-package/`, and store the parsed config in the `config` variable.
