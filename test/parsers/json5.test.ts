import json5 from '../../src/parsers/json5'

describe('JSON5 parser', () => {
  it('should handle `.json5` extensions', () => {
    expect(json5.extensions).toBeDefined()

    const extensions = json5.extensions()

    expect(extensions).toHaveLength(1)
    expect(extensions).toContain('json5')
  })

  it('should parse valid JSON5', () => {
    const j = `
    {
      hello: 'world',
    }
    `

    const parsed = json5.parse(j)

    expect(parsed).toBeDefined()
    
    expect(parsed).toHaveProperty('hello')
    expect(parsed.hello).toEqual('world')
  })
})