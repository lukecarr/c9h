import c9h from '../src'

describe('c9h', () => {
  it('should load from files', () => {
    const loaded = c9h<any>({
      name: 'example',
      paths: [() => './test'],
    })

    expect(loaded).toBeDefined()
    expect(loaded).toHaveProperty('hello')
    expect(loaded.hello).toHaveLength(1)
    expect(loaded.hello).toContain('world')
  })

  it('should default to the package.json `name` property if `options.name` is undefined', () => {
    process.env.npm_package_name = 'example'

    const loaded = c9h<any>({
      paths: [() => `${process.cwd()}/test`],
    })

    expect(loaded).toBeDefined()
    expect(loaded).toHaveProperty('hello')
    expect(loaded.hello).toHaveLength(1)
    expect(loaded.hello).toContain('world')
  })

  it('should not merge arrays by default', () => {
    const loaded = c9h<any>({
      name: 'example',
      defaults: {
        hello: ['general', 'kenobi'],
      },
      paths: [() => './test'],
    })

    expect(loaded).toBeDefined()
    expect(loaded).toHaveProperty('hello')
    expect(loaded.hello).toHaveLength(1)
    expect(loaded.hello).toContain('world')
  })

  it('should not merge arrays when options.mergeArray is true', () => {
    const loaded = c9h<any>({
      name: 'example',
      defaults: {
        hello: ['general', 'kenobi'],
      },
      paths: [() => './test'],
      mergeArray: true,
    })

    expect(loaded).toBeDefined()
    expect(loaded).toHaveProperty('hello')
    expect(loaded.hello).toHaveLength(3)
    expect(loaded.hello).toContain('world')
    expect(loaded.hello).toContain('general')
    expect(loaded.hello).toContain('kenobi')
  })

  it('should handle an undefined options object', () => {
    const loaded = c9h<any>()

    expect(Object.keys(loaded)).toHaveLength(0)
  })

  it('should handle `options.name` as a function', () => {
    const loaded = c9h<any>({
      name: () => 'exa' + 'mple',
      paths: [() => './test'],
    })

    expect(loaded).toBeDefined()
    expect(loaded).toHaveProperty('hello')
    expect(loaded.hello).toHaveLength(1)
    expect(loaded.hello).toContain('world')
  })
})
