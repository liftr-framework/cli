#!/usr/bin/env node
import program from 'commander';
import minimist from 'minimist';
import chalk from 'chalk';
import * as content from './component-content';

import { addRoute, createSetup, createRoute } from './create';
import { checkName, checkExistence, checkLiftrProject } from './helpers';
import { createComponent } from './create/creation-factory';
import { addModule } from './create/add-module';
import { addRouteToModule } from './create/add-route-to-module';

const packageJson = require('../package.json');
const figlet = require('figlet');
const clear = require('clear');

clear();
console.log(
    figlet.textSync('Liftr', { horizontalLayout: 'full' }),
);

program
    .description('The CLI for scaffolding Node/Typescript projects quick in the Liftr Framework')
    .option('-r , --route', 'create a route file')
    .option('-t , --test', 'Lift test command')
    .option('-c , --controller', 'create a controller file')
    .option('-l , --module', 'create a Liftr module')
    .option('-m , --middleware', 'create a middleware file')
    .option('-s, --setup', 'create the Liftr dev setup for Nodejs / Typescript')
    .version(packageJson.version)
    .parse(process.argv);

const argv: minimist.ParsedArgs = minimist(process.argv.slice(2), { '--': true });

console.log(argv);

const RouteName: string = argv.route || argv.r;
const TestCommand: string = argv.test || argv.t;
const ControllerName: string = argv.controller || argv.c;
const MiddlewareName: string = argv.middleware || argv.m;
const ModuleName: string = argv.module || argv.l;
const SetupName: string = argv.setup || argv.s;
const flatFile: string = argv.flat || argv.f;
const pathCreation: string = argv.p || argv.path;

let flat;

if (flatFile === undefined) {
    flat = false;
} else {
    flat = true;
}

if (SetupName) {
    checkName(SetupName);
    createSetup(SetupName);
}

if (
    ModuleName &&
    checkLiftrProject() &&
    checkName(ModuleName)
    ) {
    createComponent(ModuleName, content.moduleContent(ModuleName), 'module', flat);
    createComponent(ModuleName, content.routeContent(RouteName), 'routes', flat);
    createComponent(ModuleName, content.controllerContent(RouteName), 'controller', flat);
    addModule(ModuleName);
}
if (RouteName) {
    if (checkLiftrProject()) {
        checkName(RouteName);
        createComponent(RouteName, content.routeContent(RouteName), 'routes', flat);
        createComponent(RouteName, content.controllerContent(RouteName), 'controller', flat);
        createRoute(RouteName);
        addRoute(RouteName);
        console.log(chalk.green(`Route named ${RouteName} created and added to router module`));
    } else console.error(chalk.red('This is not a Liftr project, commands are only available in a Liftr project'));
}

if (TestCommand && pathCreation) {
    addRouteToModule(TestCommand, pathCreation);
    // addModule(TestCommand);
}

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
