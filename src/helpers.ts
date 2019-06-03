import chalk from 'chalk';
import fs from 'fs';
import { Utf8AsciiBinaryEncoding } from 'crypto';
const util = require('util');

export const checkName = (name: string|boolean) => {
    if (name === true) {
        console.error(chalk.red('Invalid command: No name found after the command'));
        process.exit(1);
    }
};

export const checkExistence = (path: string) =>  {
    const check = fs.existsSync(process.cwd() + path);
    return check;
};

export const readString = () => {
    // const MagicString = require('magic-string');
    const readFile = util.promisify(fs.readFile);
    readFile(process.cwd() + '/src/routes/LiftrRoutingModule.ts', 'utf8')
    .then((text: Utf8AsciiBinaryEncoding) => {
        const newtext = text;
        const hella = newtext.toString();
        const theIndex = hella.indexOf('Liftr.RoutingModule');
        const RoutingModule = hella.substring(theIndex);
        console.log(RoutingModule);
        const body = RoutingModule.substring(RoutingModule.indexOf('{'), RoutingModule.lastIndexOf('}') + 1 );
        const body2 = RoutingModule.substring(RoutingModule.indexOf('['), RoutingModule.lastIndexOf(']') + 1 );
        const donkey = body2.split('},');
        const arr = [donkey.shift(), donkey.join('}')];
        console.log(arr);
        console.log('NEw ARRAY', arr[1]);
        // create function out of string
        // const s = new MagicString(body)
        // body.substring(body.indexOf("{"), RoutingModule.lastIndexOf("path: '/liftr'") + 1 );
        // const newFunc = new Function('return ' + RoutingModule);
        // const fart = JSON.parse(JSON.stringify(body));
        // const fart2 = JSON.parse(JSON.stringify(body2));
        // console.log(eval(fart2))
    });
};
