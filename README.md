# Liftr

Liftr is a quick project-starter/pseudo-framework CLI that will create the necessary files for you to begin a Nodejs with Typescript project.

## Quickstart

Install Liftr as a global CLI.

 ``` 
 npm install -g liftr 
 ```
You then run

```
liftr -s <name-of-your-project>
```

This should setup a project with all the necessary folders and files so that you can begin building straight away!

### Commands

Here are all the possibilities with liftr

```shell
  ____                    __    __           _       _ 
 / ___|    ___    __ _   / _|  / _|   ___   | |   __| |
 \___ \   / __|  / _` | | |_  | |_   / _ \  | |  / _` |
  ___) | | (__  | (_| | |  _| |  _| | (_) | | | | (_| |
 |____/   \___|  \__,_| |_|   |_|    \___/  |_|  \__,_|

# Create a setup for your Nodejs/Typescript project
liftr -s <your-project-name>
liftr --setup <your-project-name>

# Adds a route to the routes folder and to the routing module
liftr -r <your-route-name>
liftr --route <your-route-name>

# Add a controller
liftr -c <your-controller-name>
liftr --controller <your-controller-name>

# Add a middleware
liftr -m <your-middleware-name>
liftr --middleware <your-middleware-name>

```
