import ini from '../../src/parsers/ini'

describe('INI parser', () => {
  it('should handle `.toml` extensions', () => {
    expect(ini.extensions).toBeDefined()

    const extensions = ini.extensions()

    expect(extensions).toHaveLength(1)
    expect(extensions).toContain('ini')
  })

  it('should parse valid INI', () => {
    const j = `
    hello = 'world'
    `

    const parsed = ini.parse(j)

    expect(parsed).toBeDefined()
    
    expect(parsed).toHaveProperty('hello')
    expect(parsed.hello).toEqual('world')
  })
})