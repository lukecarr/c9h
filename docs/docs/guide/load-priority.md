# Load Priority

When cottonmouth loads your configuration, it assumes the following priority order for configuration values:

1. Default values specified in `options.defaults` (LOWEST)
2. Values parsed from a configuration file
3. Environment variables (HIGHEST)
