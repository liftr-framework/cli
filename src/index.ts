#!/usr/bin/env node
import program from 'commander';
import minimist from 'minimist';
import chalk from 'chalk';
import * as content from './component-content';

import { addModule, createSetup, creationFactory } from './create';
import { checkName, checkLiftrProject } from './helpers';

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
    .option('-m , --module', 'create a Liftr module with a Routes file')
    .option('-r , --route , -t , --target ', 'create a route in target file and add it to its module')
    .option('-c , --controller', 'create a controller file')
    .option('--middleware', 'create a middleware file')
    .option('-s , --setup', 'create the Liftr dev setup for Nodejs / Typescript')
    .version(packageJson.version)
    .parse(process.argv);

const argv: minimist.ParsedArgs = minimist(process.argv.slice(2), {'--': true});

const RouteName: string = argv.r || argv.route;
const ControllerName: string = argv.c || argv.controller;
const MiddlewareName: string = argv.middleware;
const ModuleName: string =  argv.m || argv.module;
const SetupName: string =  argv.s || argv.setup;
const flatFile: string = argv.f || argv.flat;
const target: string = argv.t || argv.target;

// check if flat was called if not - file will be created in a folder
let flat;
if (flatFile === undefined) flat = false;
else flat = true;

if (SetupName && checkName(SetupName)) {
    createSetup(SetupName);
}

if (ModuleName && checkLiftrProject() && checkName(ModuleName)) {
    const routeComponentContent = flat ? content.flatRouteContent(ModuleName) : content.routeContent(ModuleName);
    const testControllerComponentContent = flat ?
    content.flatTestControllerContent(ModuleName) : content.testControllerContent(ModuleName);

    creationFactory.createComponent(ModuleName, content.moduleContent(ModuleName), 'module', flat);
    creationFactory.createComponent(ModuleName, routeComponentContent, 'route', flat);
    creationFactory.createComponent(ModuleName, content.controllerContent(ModuleName), 'controller', flat);
    creationFactory.createTestFile(ModuleName, testControllerComponentContent, 'controller', flat);
    addModule(ModuleName, flat);
}

if (RouteName && checkLiftrProject() && checkName(RouteName) && checkName(target)) {
    creationFactory.findModuleAndInsertComponents(RouteName, target, flat);
}

if (ControllerName && checkLiftrProject() && checkName(ControllerName)) {
    const testControllerComponentContent = flat ?
    content.flatTestControllerContent(ControllerName) : content.testControllerContent(ControllerName);
    creationFactory.createComponent(ControllerName, content.controllerContent(ControllerName), 'controller', flat);
    creationFactory.createTestFile(ControllerName, testControllerComponentContent, 'controller', flat);
}

if (MiddlewareName && checkLiftrProject() && checkName(MiddlewareName)) {
    creationFactory.createComponent(MiddlewareName, content.middleWareContent(MiddlewareName), 'middleware', flat);
}

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
