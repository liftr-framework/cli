# Liftr

[![npmversion](https://img.shields.io/npm/v/liftr.svg?style=for-the-badge)](https://github.com/farisT/liftr)
[![npmlicense](https://img.shields.io/npm/l/liftr.svg?style=for-the-badge)](https://github.com/farisT/liftr/blob/master/LICENSE/)
[![downloads](https://img.shields.io/npm/dy/liftr.svg?style=for-the-badge)](https://github.com/farisT/liftr)

Liftr is a quick project-starter/pseudo-framework CLI, built on [express](https://expressjs.com/), that will create the necessary files for you to begin a Node.js with Typescript project.

## Quickstart

Install Liftr as a global CLI.

```shell
npm install -g liftr

cd <your-repo-location>

# Then you run
liftr -s <name-of-your-project>
```

This should setup a project with all the necessary folders and files so that you can begin building straight away!

### Commands

Here are all the possibilities with Liftr

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

Packages that can be used with liftr:

- [liftr-docs](https://github.com/farisT/liftr-docs): A documentation tool for your Liftr routes with Swagger under the hood.


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

Before you run `npm start`, make sure you didn't install the `liftr` package globally. If you did, run `npm uninstall -g liftr` and run `npm start`, otherwise you will get an npm error.

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
