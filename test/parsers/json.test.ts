import json from '../../src/parsers/json'

describe('JSON parser', () => {
  it('should handle `.json` extensions', () => {
    expect(json.extensions).toBeDefined()

    const extensions = json.extensions()

    expect(extensions).toHaveLength(1)
    expect(extensions).toContain('json')
  })

  it('should parse valid JSON', () => {
    const j = `
    {
      "hello": "world"
    }
    `

    const parsed = json.parse(j)

    expect(parsed).toBeDefined()
    
    expect(parsed).toHaveProperty('hello')
    expect(parsed.hello).toEqual('world')
  })
})