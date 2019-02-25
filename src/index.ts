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
    createRoute(RouteName);
    addRoute(RouteName);
    console.log(chalk.green(`route named ${RouteName} created and added to router setup`));
}

if (ControllerName) {
    createController(ControllerName);
    console.log(chalk.green(`controller named ${ControllerName} created`));
}

if (MiddlewareName) createMiddleware(MiddlewareName);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
