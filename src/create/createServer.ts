import fs from 'fs';

export const createServer = (setupFilepath: string) => {
    const fileContent = `import app from './app';

const server = app.listen(app.get('port'), () => {
    console.log(
        'App is running on http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env'),
    );
});

export default server;
    `;
    let filepath: string;
    if (setupFilepath) {
        filepath = setupFilepath;
    } else {
       filepath = process.cwd() + '/server.ts';
    }
    fs.writeFile(filepath, fileContent, (err) => {
        if (err) throw err;
    });
};
