#!/usr/bin/env node
import program from 'commander';
import minimist from 'minimist';
import chalk from 'chalk';
import * as content from './component-content';

import { createSetup } from './create';
import { checkName, checkLiftrProject } from './helpers';
import { createComponent, findModuleAndInsertComponents } from './create/creation-factory';
import { addModule } from './create/add-module';

const packageJson = require('../package.json');
const figlet = require('figlet');
const clear = require('clear');

clear();
console.log(
    chalk.magenta(
        figlet.textSync('Liftr', { horizontalLayout: 'full' }),
    ),
);

program
    .description('The CLI for scaffolding Node/Typescript projects quick in the Liftr Framework')
    // .option('-t , --test', 'Lift test command')
    .option('-m , --module', 'create a Liftr module with a Routes file')
    .option('-r , --route', 'Create a route in target file and add it to its module')
    .option('-c , --controller', 'create a controller file')
    .option('--middleware', 'create a middleware file')
    .option('-s , --setup', 'create the Liftr dev setup for Nodejs / Typescript')
    .version(packageJson.version)
    .parse(process.argv);

const argv: minimist.ParsedArgs = minimist(process.argv.slice(2), {'--': true});

const RouteName: string = argv.route;
// const TestCommand: string = argv.test || argv.t;
const ControllerName: string = argv.controller;
const MiddlewareName: string = argv.middleware;
const ModuleName: string = argv.module || argv.m;
const SetupName: string = argv.setup || argv.s;
const flatFile: string = argv.flat || argv.f;
const target: string = argv.t || argv.target;

// check if flat was called if not - file will be created in a folder
let flat;
if (flatFile === undefined) flat = false;
else flat = true;

if (SetupName) {
    checkName(SetupName);
    createSetup(SetupName);
}

if (
    ModuleName &&
    checkLiftrProject() &&
    checkName(ModuleName)
    ) {
    const routeComponent = flat ? content.flatRouteContent(ModuleName) : content.routeContent(ModuleName);
    createComponent(ModuleName, content.moduleContent(ModuleName), 'module', flat);
    createComponent(ModuleName, routeComponent, 'route', flat);
    createComponent(ModuleName, content.controllerContent(ModuleName), 'controller', flat);
    addModule(ModuleName, flat);
}

if (RouteName && checkLiftrProject() && checkName(RouteName) && checkName(target)) {
    findModuleAndInsertComponents(RouteName, target);
}

// if (TestCommand && target) {
//     findModuleInProject(TestCommand, target);
// }

if (
    ControllerName &&
    checkLiftrProject() &&
    checkName(ControllerName)
    ) createComponent(ControllerName, content.controllerContent(ControllerName), 'controller', flat);

if (
    MiddlewareName &&
    checkLiftrProject() &&
    checkName(MiddlewareName)
    ) createComponent(MiddlewareName, content.middleWareContent(MiddlewareName), 'middleware', flat);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
