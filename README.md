# Liftr

[![npmversion](https://img.shields.io/npm/v/liftr.svg)](https://github.com/farisT/liftr)
[![npmlicense](https://img.shields.io/npm/l/liftr.svg)](https://github.com/farisT/liftr/blob/master/LICENSE/)
[![downloads](https://img.shields.io/npm/dy/liftr.svg)](https://github.com/farisT/liftr)

Liftr is a quick project-starter/pseudo-framework CLI, built on [express](https://expressjs.com/), that will create the necessary files for you to begin a Nodejs with Typescript project.

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

# Create a route to the routes folder and add it to the routing module
liftr -r <your-route-name>
liftr --route <your-route-name>

# Create a controller in the controller folder
liftr -c <your-controller-name>
liftr --controller <your-controller-name>

# Create a middleware in the middleware folder
liftr -m <your-middleware-name>
liftr --middleware <your-middleware-name>

```

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

The following npm script are available

- `npm start` - create build, install globally and run liftr
- `npm run build` - create build
- `npm run test` - install globally and run liftr
- `npm run link-upstream` - add remote
- `npm run sync` - fetch, checkout, merge and push
- `npm run copy-templates` - Moves templates to ./lib/templates
- `npm run refresh` - removes node modules, package-lock.json, lib and re-installs everything.

## License

[![npmlicense](https://img.shields.io/npm/l/liftr.svg)](https://github.com/farisT/liftr/blob/master/LICENSE/)