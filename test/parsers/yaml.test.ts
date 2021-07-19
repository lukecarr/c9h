import yaml from '../../src/parsers/yaml'

describe('YAML parser', () => {
  it('should handle `.yaml` and `.yml` extensions', () => {
    expect(yaml.extensions).toBeDefined()

    const extensions = yaml.extensions()

    expect(extensions).toHaveLength(2)
    expect(extensions).toContain('yaml')
    expect(extensions).toContain('yml')
  })

  it('should parse valid YAML', () => {
    const j = `
    hello:
      there: general kenobi
    `

    const parsed = yaml.parse(j)

    expect(parsed).toBeDefined()
    
    expect(parsed).toHaveProperty('hello')
    expect(parsed.hello).toHaveProperty('there')
    expect(parsed.hello.there).toEqual('general kenobi')
  })
})