import toml from '../../src/parsers/toml'

describe('TOML parser', () => {
  it('should handle `.toml` extensions', () => {
    expect(toml.extensions).toBeDefined()

    const extensions = toml.extensions()

    expect(extensions).toHaveLength(1)
    expect(extensions).toContain('toml')
  })

  it('should parse valid TOML', () => {
    const j = `
    [hello]
    there = 'general kenobi'
    `

    const parsed = toml.parse(j)

    expect(parsed).toBeDefined()
    
    expect(parsed).toHaveProperty('hello')
    expect(parsed.hello).toHaveProperty('there')
    expect(parsed.hello.there).toEqual('general kenobi')
  })
})