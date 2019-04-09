import fs from 'fs-extra';

export const createApp = (setupFilepath: string) => {
    const fileContent: string = `import * as express from 'express';
import * as dotenv from 'dotenv';
import { AppRouter } from '@routes/LiftrRoutingModule';
import { routes } from '@routes/LiftrRoutingModule';

const app = express();

dotenv.config();
app.set('port', process.env.PORT || 4000);

routes.forEach((route: AppRouter) => app.use(route.path, route.middleware, route.handler));

export default app;
`;
    let filepath: string;
    if (setupFilepath) {
        filepath = setupFilepath;
    } else {
        filepath = process.cwd() + '/app.ts';
     }
    fs.writeFile(filepath, fileContent, (err) => {
        if (err) throw err;
    });
};
