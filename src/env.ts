export default function parse(prefix: string, env = process.env) {
  const result = {} as any

  for (const [key, value] of Object.entries(env)) {
    if (!key.startsWith(prefix)) {
      continue
    }

    const keys = key.toLowerCase().split('_').slice(1)

    let current = result
    let currentKey

    while (currentKey = keys.shift()) {
      if (keys.length) {
        current[currentKey] = {}
        current = current[currentKey]
      } else {
        current[currentKey] = value
      }
    }
  }

  return result
}
