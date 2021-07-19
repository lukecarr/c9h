export function parse(prefix: string, env = process.env) {
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

export function toPrefix(name: string): string {
  // Remove @ chars, and replace - or / with _
  name = name.replace(/[@]/g, '').replace(/[-\/]/g, '_').toUpperCase()

  if(!name.match(/^[A-Z0-9_]+$/)) {
    throw new Error(`Invalid characters were provided for c9h name. The name must only include letters, digits, '-', '_', '@', and '/'.`)
  }

  return `${name}_`
}
