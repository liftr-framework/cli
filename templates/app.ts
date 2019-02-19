import * as express from 'express';
import * as dotenv from 'dotenv';
import { routes } from '@routes';

const app = express();

dotenv.config();
app.set('port', process.env.PORT || 4000);

routes.forEach((route) => app.use(route.path, route.middleware, route.handler));

export default app;
