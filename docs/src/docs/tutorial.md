# 5 Min Tutorial

This five minute tutorial will get your Node.js project setup with 🐍 cottonmouth for configuration management!

## Project setup

Let's setup a really basic Node.js project. If you already have a project setup with a `package.json` file, skip to [Installing](#installing).

```bash
# Let's install Yarn (if you haven't already!)
npm install -g yarn

# Initialise the project in the current directory
yarn init -y
```

You should now how have a directory that contains a `package.json` file. We can now install cottonmouth and start using it!

## Installing

Installing cottonmouth is simple and takes just one command:

```
yarn add c9h
```

If you're just using NPM (and not Yarn), try this:

```
npm install c9h
```

## Using 🐍 cottonmouth

Now let's get started with cottonmouth! Create a file called `index.js` in your project's directory and paste in the following code (we'll go over it in a short while):

```js
const config = require('c9h')()
console.log(JSON.stringify(config))
```

On the first line, we are importing and invoking cottonmouth. We then store the return value (your parsed config, which is empty right now!) in `config`.

On the next line, we just log the value of `config` to the console.

## Running the program

We can now run the program and see if cottonmouth is working!

Add a script to your project's `package.json` which runs `node index.js`. Your `package.json` should look similar to this (we've chosen `start` as the script name, but you can choose whatever you want!):

```json
{
  "name": "your-directory",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "c9h": "^0.3.0"
  }
}
```

We can now run the program like so:

```
yarn start
```

If you're just using NPM (and not Yarn), try this:

```
npm run start
```

## Creating a configuration file

Now we can create a configuration file in your project's directory. Create a file with the same name as the name found in your `package.json` file. For the file format, it's up to you to choose your weapon of choice!

::: tip
🐍 cottonmouth supports JSON, JSON5, TOML, YAML, and INI configuration files out-of-the-box!
:::

In our example, we've created a file called `c9h-test.yaml` which contains some YAML data:

```yaml
port: 3000
addr: '0.0.0.0'
```

Give your program a run again, and observe how cottonmouth has now loaded your newly created configuration file's data:

```bash
yarn start
# => {"port": 3000, "addr": "0.0.0.0"}
```
