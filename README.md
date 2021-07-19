# 🐍 cottonmouth

Zero-config config for Node.js.

# Usage

```js
const config = require('c9h')('your-app', { /* options */ })
// OR
import c9h from 'c9h'
const config = c9h('your-app', { /* options */ })
```

This will look for `your-app.{toml,yaml,js,json,json5}` in `./`, `/etc/your-app/`, and `$HOME/.your-app/`, and store the parsed config in the `config` variable as an object.
