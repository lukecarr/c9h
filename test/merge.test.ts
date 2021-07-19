import merge from '../src/merge'

describe('merging util function', () => {
  it('should merge two objects', () => {
    const a = { hello: 'world' }
    const b = { abc: 123 }

    const merged = merge(a, [b])

    expect(Object.keys(merged)).toHaveLength(2)

    expect(merged).toHaveProperty('hello')
    expect(merged.hello).toEqual('world')

    expect(merged).toHaveProperty('abc')
    expect(merged.abc).toEqual(123)
  })

  it('should merge objects with nested values', () => {
    const a = { abc: { hello: 'world' } }
    const b = { abc: { easy: { as: 123 } } }

    const merged = merge(a, [b])

    expect(Object.keys(merged)).toHaveLength(1)


    expect(merged).toHaveProperty('abc')
    expect(merged.abc).toHaveProperty('easy')
    expect(merged.abc.easy).toHaveProperty('as')
    expect(merged.abc.easy.as).toEqual(123)
    expect(merged.abc).toHaveProperty('hello')
    expect(merged.abc.hello).toEqual('world')
  })

  it('should merge array values when options.mergeArray is true', () => {
    const a = { hello: ['world'] }
    const b = { hello: ['there'], general: ['kenobi'] }

    const merged = merge(a, [b], { mergeArray: true })

    expect(Object.keys(merged)).toHaveLength(2)

    expect(merged).toHaveProperty('hello')
    expect(merged.hello).toHaveLength(2)
    expect(merged.hello).toContain('world')
    expect(merged.hello).toContain('there')

    expect(merged).toHaveProperty('general')
    expect(merged.general).toHaveLength(1)
    expect(merged.general).toContain('kenobi')
  })

  it('should not merge non-object values', () => {
    const a = { hello: 'world' }
    const b = [123, 456]

    const merged = merge(a, [b])

    expect(Object.keys(merged)).toHaveLength(1)

    expect(merged).toHaveProperty('hello')
    expect(merged.hello).toEqual('world')
  })
})