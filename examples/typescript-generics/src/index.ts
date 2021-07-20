import c9h from 'c9h'

type Config = {
  hello: {
    there: string
  }
}

const config = c9h<Config>()

console.log(config.hello!.there)
// => world
