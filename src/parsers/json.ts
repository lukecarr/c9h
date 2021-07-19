export default {
  extensions() {
    return ['json']
  },
  parse(file: string): Record<string, any> {
    return JSON.parse(file)
  },
}
