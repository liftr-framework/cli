
export const moduleContent = (moduleName: string): string => `
import { Module, ModuleComponent } from '@liftr/core';
import { ${moduleName}Route } from './${moduleName}.routes';

export const ${moduleName}Module: ModuleComponent = Module([
    {
        route: ${moduleName}Route,
        middleware: [],
    },
])
`;

export const middleWareContent = (middlewareName: string): string => `
import { Request, Response, NextFunction } from 'express';

export const ${middlewareName}Middleware = (req: Request, res: Response, next: NextFunction) => {
    return next();
};
`;

export const routeContent = (routeName: string): string => `
import { Route } from '@liftr/core';
import { ${routeName}Controller } from '@controllers/${routeName}/${routeName}.controller';

export const ${routeName}Route = Route.get('/', ${routeName}Controller);
`;

export const flatRouteContent = (routeName: string): string => `
import { Route } from '@liftr/core';
import { ${routeName}Controller } from '@controllers/${routeName}.controller';

export const ${routeName}Route = Route.get('/', ${routeName}Controller);
`;

export const controllerContent = (controllerName: string): string => `
import { Request, Response, NextFunction } from 'express';

export const ${controllerName}Controller = (req: Request, res: Response, next: NextFunction) => {
    res.send('Lift off!');
};
`;

export const appContent = `
import * as express from 'express';
import * as dotenv from 'dotenv';
import { routes } from '@routes/LiftrRoutingModule';
import { server } from '@liftr/core';

const app = express();

dotenv.config();
app.set('port', process.env.PORT || 4000);

server(app, routes);

export default app;
`;

export const serverContent = `import app from './app';
import { Liftr } from '@liftr/core';

const server = Liftr.server(app);

export default server;
`;

export const testControllerContent = (controllerName: string, flat?: boolean): string => `
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import { ${controllerName}Controller } from './${controllerName}.controller';


describe(${flat ? `src/controllers/${controllerName}/${controllerName}.controller.ts` :
`src/controllers/${controllerName}.controller.ts`}, () => {
    let sandbox: sinon.SinonSandbox;
    let req: any = {};
    let responseStub: Partial<Response>;
    let next: Partial<NextFunction>;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        responseStub = {
            send: sandbox.stub(),
        }
    });

    it('should send a message' , () => {
        ${controllerName}Controller(req as Request, responseStub as Response, next as NextFunction);
        expect(responseStub.send).to.be.calledWith('Lift off!');
    });
});
`;

export const flatTestControllerContent = (controllerName: string): string => `
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response, NextFunction } from 'express';
import { ${controllerName}Controller } from './${controllerName}.controller';

describe('src/controllers/${controllerName}/${controllerName}.controller.ts', () => {
    let sandbox: sinon.SinonSandbox;
    let req: any = {};
    let responseStub: Partial<Response>;
    let next: Partial<NextFunction>;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
        responseStub = {
            send: sandbox.stub(),
        }
    });

    it('should send a message' , () => {
        ${controllerName}Controller(req as Request, responseStub as Response, next as NextFunction);
        expect(responseStub.send).to.be.calledWith('Lift off!');
    });
});
`;
