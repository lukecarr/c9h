export function isObject(obj: any): boolean {
  return obj && typeof obj === 'object' && !Array.isArray(obj)
}

export type MergeOptions = {
  mergeArray?: boolean
}

export function merge(target: any, sources: any[], options?: MergeOptions): any {
  if (!sources.length) {
    return target
  }

  const source = sources.shift()

  if (isObject(target) && isObject(source)) {
    for (const [key, value] of Object.entries(source)) {
      if (isObject(value)) {
        if (!target[key]) {
          target[key] = {}
        }
        merge(target[key], [value], options)
      } else if (Array.isArray(value) && options?.mergeArray) {
        if (!target[key]) {
          target[key] = []
        }
        target[key] = [...target[key], ...value]
      } else {
        target[key] = value
      }
    }
  }

  return merge(target, sources, options)
}
