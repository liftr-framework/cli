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

Here are all the possibilities with Liftr

```shell
  _       _    __   _          
 | |     (_)  / _| | |_   _ __ 
 | |     | | | |_  | __| | '__|
 | |___  | | |  _| | |_  | |   
 |_____| |_| |_|    \__| |_|   


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
