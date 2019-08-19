# Liftr

<p align="center">
    <img alt="Liftr logo" src="./logo.png">
</p>

[![npmversion](https://img.shields.io/npm/v/@liftr/cli.svg?style=for-the-badge)](https://github.com/farisT/liftr)
[![npmlicense](https://img.shields.io/npm/l/@liftr/cli.svg?style=for-the-badge)](https://github.com/farisT/liftr/blob/master/LICENSE/)
[![downloads](https://img.shields.io/npm/dy/liftr.svg?style=for-the-badge)](https://github.com/farisT/liftr)

The Liftr framework provides structure and tools to build API's in Node.js with [TypeScript](https://www.typescriptlang.org/) and [Express](https://expressjs.com/). **This repo contains the documentation for the CLI.**

The liftr-cli is a quick project-starter CLI to work with the Liftr framework, it will create the necessary files for you to begin a Node.js & Typescript project. Ontop o=, you can generate new backend components on the fly - providing a quicker way to build structured and robust API's.

## Quickstart

Install the liftr-cli as a global CLI.

```shell
npm install -g @liftr/cli

cd <your-repo-location>

# Then you run
liftr -s <name-of-your-project>
```

This should setup a project with all the necessary folders and files so that you can begin building straight away!

### Commands

Here are all the possibilities with the liftr-cli

```shell

# Create a setup for your Nodejs/Typescript project

liftr -s <your-project-name>
liftr --setup <your-project-name>

# THE FOLLOWING COMMANDS CAN ONLY BE DONE IN A LIFTR SETUP
-----------------------------------------------------------

# Create a route in the routes folder and add it to the routing module
liftr -r <your-route-name>
liftr --route <your-route-name>

# Create a controller in the controller folder
liftr -c <your-controller-name>
liftr --controller <your-controller-name>

# Create a middleware in the middleware folder
liftr -m <your-middleware-name>
liftr --middleware <your-middleware-name>

```
## Supporting packages

| Package | Description | Version |
| --- | --- | --- |
| [@liftr/core](https://github.com/farisT/liftr-core) | The core package for Liftr | [![npmversion](https://img.shields.io/npm/v/@liftr/core.svg?style=for-the-badge)](https://github.com/farisT/liftr-core) |
| [@liftr/docs](https://github.com/farisT/liftr-docs) | A documentation tool for liftr routes with swagger under the hood | [![npmversion](https://img.shields.io/npm/v/@liftr/docs.svg?style=for-the-badge)](https://github.com/farisT/liftr-docs) |
| [@liftr/tscov](https://github.com/jeroenouw/liftr-tscov) | Check the type coverage of any TypeScript project | [![npmversion](https://img.shields.io/npm/v/@liftr/tscov.svg?style=for-the-badge)](https://github.com/jeroenouw/liftr-tscov) |


## Contributing

Want to file a bug, contribute some code, or improve documentation? Feel free to place an [issue](https://github.com/farisT/liftr/issues) and check the [contributing guidelines](https://github.com/farisT/liftr/blob/master/LICENSE/).

## License


