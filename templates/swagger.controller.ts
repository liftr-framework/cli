import * as path from 'path';
import * as express from 'express';
import { AppRouter } from '@routes/index';
import { routes } from '@routes/index';

import * as swaggerUi from 'swagger-ui-express';

const swaggerDescriptions :any = {
  info: {
    title: 'REST API Notifications',
    version: '1.0.0',
    description: 'This is the REST API for all the notification endpoints',
  },
  servers: [{
    url: `http://localhost:${process.env.PORT || 4000}`,
  }],
  openapi: '3.0.0',
  paths: {},
};

const swaggerResponses = {
  responses: {
    200: {
      description: 'OK',
    },
    400: {
      description: 'Error: Bad Request',
    },
    401: {
      description: 'Error: Unauthorized',
    },
  },
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {},
      },
    },
    description: '',
  },
};

const swaggerController = () => {
    const endpointDefinitions = routes.map((route: AppRouter) => {
        const returnObject: any = {};
        route.handler.stack.forEach(routeConfig => {
            console.log('paths', routeConfig.route.path) //checks what type of path
            console.log('methods', routeConfig.route.stack[0].method) //checks what type of endpoint
            const swaggerResponse = JSON.parse(JSON.stringify(swaggerResponses));

            const pathName = `${routeConfig.route.path}`;
            if(routeConfig.route.stack[0].method === 'post') {
                returnObject[pathName] = { post: swaggerResponse };
            }
            if(routeConfig.route.stack[0].method === 'get'){
                returnObject[pathName] = { get: swaggerResponse };
            }
        });
        console.log(returnObject);
        return returnObject;
    });

    console.log(endpointDefinitions);

  swaggerDescriptions.paths = endpointDefinitions.reduce((acc, cur) => Object.assign(acc, cur));
  const router = express.Router();
  router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDescriptions));

  return router;
};

module.exports = swaggerController;
