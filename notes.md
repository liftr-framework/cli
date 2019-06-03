- Maybe it is an idea to create something like NgModule? This would help organize the files and make it easier to push newly created components
- Angular CLI uses a schematic to generate new components. Maybe its an idea to push the routes object/array to the CLI and have it add the new component and then strigify/add it to the file?

// export const readString = () => {
//     // const MagicString = require('magic-string');
//     const readFile = util.promisify(fs.readFile);
//     readFile(process.cwd() + '/src/routes/LiftrRoutingModule.ts', 'utf8')
//     .then((text: Utf8AsciiBinaryEncoding) => {
//         const newtext = text;
//         const hella = newtext.toString();
//         const theIndex = hella.indexOf('Liftr.RoutingModule')
//         const RoutingModule = hella.substring(theIndex)
//         console.log(RoutingModule)
//         const body = RoutingModule.substring(RoutingModule.indexOf("{"), RoutingModule.lastIndexOf("}") + 1 );
//         const body2 = RoutingModule.substring(RoutingModule.indexOf("["), RoutingModule.lastIndexOf("]") + 1 );
//         // create function out of string
//         // const s = new MagicString(body)
//         // body.substring(body.indexOf("{"), RoutingModule.lastIndexOf("path: '/liftr'") + 1 );
//         // const newFunc = new Function('return ' + RoutingModule);
//         // const fart = JSON.parse(JSON.stringify(body));
//         // const fart2 = JSON.parse(JSON.stringify(body2));
//         // console.log(eval(fart2))
//     })
// }