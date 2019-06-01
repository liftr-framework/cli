# Liftr

[![npmversion](https://img.shields.io/npm/v/liftr.svg?style=for-the-badge)](https://github.com/farisT/liftr)
[![npmlicense](https://img.shields.io/npm/l/liftr.svg?style=for-the-badge)](https://github.com/farisT/liftr/blob/master/LICENSE/)
[![downloads](https://img.shields.io/npm/dy/liftr.svg?style=for-the-badge)](https://github.com/farisT/liftr)

The Liftr framework provides a structure and tools to build API's with TypeScript and express. This repo/package is for the CLI.

The liftr-cli is a quick project-starter CLI to work with the Liftr framework, built on [express](https://expressjs.com/), it will create the necessary files for you to begin a Node.js with Typescript project.

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
### Supporting packages

| Package | Description | Version |
| --- | --- | --- |
| [@liftr/core](https://github.com/farisT/liftr-core) | The core package for Liftr | [![npmversion](https://img.shields.io/npm/v/@liftr/core.svg?style=for-the-badge)](https://github.com/farisT/liftr-core) |
| [@liftr/docs](https://github.com/farisT/liftr-docs) | A documentation tool for liftr routes with swagger under the hood | [![npmversion](https://img.shields.io/npm/v/@liftr/docs.svg?style=for-the-badge)](https://github.com/farisT/liftr-docs) |
| [@liftr/tscov](https://github.com/jeroenouw/liftr-tscov) | Check the type coverage of any TypeScript project | [![npmversion](https://img.shields.io/npm/v/@liftr/tscov.svg?style=for-the-badge)](https://github.com/jeroenouw/liftr-tscov) |


## Contributing

Want to file a bug, contribute some code, or improve documentation? Feel free to place an [issue](https://github.com/farisT/liftr/issues).

First fork this project.

```shell
git clone <your-forked-repo>
npm install

git checkout -b my-fix
# fix some code...

git commit -m "added this feature"
git push origin my-fix
```

Lastly, open a pull request on Github.

Before you run `npm start`, make sure you haven't installed the `liftr` package globally. If you did, run `npm uninstall -g @liftr/cli` and run `npm start`, otherwise you will get an npm error.

The following npm scripts are available

-   `npm start` - create build, install globally and run liftr
-   `npm run build` - create build
-   `npm run global` - install globally and run liftr
-   `npm run link-upstream` - add remote
-   `npm run sync` - fetch, checkout, merge and push
-   `npm run copy-templates` - Moves templates to ./lib/templates
-   `npm run refresh` - removes node modules, package-lock.json, lib and re-installs everything.
-   `npm run tscov` - checks the type coverage of your project with tscov
-   `npm run tscov:d` - shows all uncovered types with tscov

## License

[![npmlicense](https://img.shields.io/npm/l/liftr.svg)](https://github.com/farisT/liftr/blob/master/LICENSE/)
