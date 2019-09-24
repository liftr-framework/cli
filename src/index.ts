#!/usr/bin/env node
import program from 'commander';
import minimist from 'minimist';
import chalk from 'chalk';
import * as content from './component-content';

import { addRoute, createSetup, createRoute } from './create';
import { checkName, checkExistence } from './helpers';
import { createComponent } from './create/creation-factory';

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
    .option('-c , --controller', 'create a controller file')
    .option('-l , --module', 'create a Liftr module')
    .option('-m , --middleware', 'create a middleware file')
    .option('-s, --setup', 'create the Liftr dev setup for Nodejs / Typescript')
    .version(packageJson.version)
    .parse(process.argv);

const argv: minimist.ParsedArgs = minimist(process.argv.slice(2), { '--': true });

console.log(argv);

const RouteName: string = argv.route || argv.r;
const ControllerName: string = argv.controller || argv.c;
const MiddlewareName: string = argv.middleware || argv.m;
const ModuleName: string = argv.module || argv.l;
const SetupName: string = argv.setup || argv.s;
const flatFile: string = argv.flat || argv.f;
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
    checkExistence('/src/routes/LiftrRoutingModule.ts') &&
    checkName(ModuleName)
    ) createComponent(ModuleName, content.moduleContent(ModuleName), 'module', flat);

if (RouteName) {
    if (checkExistence('/src/routes/LiftrRoutingModule.ts')) {
        checkName(RouteName);
        createRoute(RouteName);
        addRoute(RouteName);
        console.log(chalk.green(`Route named ${RouteName} created and added to router module`));
    } else console.error(chalk.red('This is not a Liftr project, commands are only available in a Liftr project'));
}

if (
    ControllerName &&
    checkExistence('/src/routes/LiftrRoutingModule.ts') &&
    checkName(ControllerName)
    ) createComponent(ControllerName, content.controllerContent(ControllerName), 'controller', flat);

if (
    MiddlewareName &&
    checkExistence('/src/routes/LiftrRoutingModule.ts') &&
    checkName(MiddlewareName)
    ) createComponent(MiddlewareName, content.middleWareContent(MiddlewareName), 'middleware', flat);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
