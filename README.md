# 🐍 cottonmouth

Zero-config config for Node.js.

```bash
npm install c9h
# OR
yarn add c9h
```

# Usage

```js
const config = require('c9h')({ /* options */ })
// OR
import c9h from 'c9h'
const config = c9h({ /* options */ })
```

This will look for `your-package.{toml,yaml,yml,js,json,json5,ini}` in `./`, `/etc/your-package/`, and `$HOME/.your-package/`, and store the parsed config in the `config` variable as an object.
