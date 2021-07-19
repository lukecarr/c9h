export default {
  extensions() {
    return ['json']
  },
  parse(file: string) {
    return JSON.parse(file)
  },
}
