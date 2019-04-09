#!/usr/bin/env node
import program from 'commander';
import minimist from 'minimist';
import chalk from 'chalk';

import { createController, addRoute, createSetup, createRoute, createMiddleware } from './create';
import { checkName } from './helper';

const packageJson = require('../package.json');
const figlet = require('figlet');
const clear = require('clear');

clear();
console.log(
    figlet.textSync('Liftr', { horizontalLayout: 'full' }),
);

program
    .description('A CLI for scaffolding Node/Typescript projects quick')
    .option('-r , --route', 'create a route file')
    .option('-c , --controller', 'create a controller file')
    .option('-m , --middleware', 'create a middleware file')
    .option('-s, --setup', 'create a standard dev setup for Nodejs / Typescript')
    .version(packageJson.version)
    .parse(process.argv);

const argv: minimist.ParsedArgs = minimist(process.argv.slice(2), { '--': true });

const RouteName: string = argv.route || argv.r;
const ControllerName: string = argv.controller || argv.c;
const MiddlewareName: string = argv.middleware || argv.m;
const SetupName: string = argv.setup || argv.s;

if (SetupName) {
    checkName(SetupName);
    createSetup(SetupName);
}

if (RouteName) {
    checkName(RouteName);
    createRoute(RouteName);
    addRoute(RouteName);
    console.log(chalk.green(`Route named ${RouteName} created and added to router module`));
}

if (ControllerName) {
    checkName(ControllerName);
    createController(ControllerName);
    console.log(chalk.green(`Controller named ${ControllerName} created`));
}

if (MiddlewareName) {
    checkName(MiddlewareName);
    createMiddleware(MiddlewareName);
    console.log(chalk.green(`Middleware named ${MiddlewareName} created`));
}

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
