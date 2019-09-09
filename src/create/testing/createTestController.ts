import { writeFile } from 'fs-extra';

export const createTestController = (controllerName: string) => {
    const filepath: string = process.cwd() + `/src/controllers/${controllerName}.controller.spec.ts`;
    const fileContent = `import * as sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { ${controllerName}Controller } from './${controllerName}.controller';

describe('src/controllers/${controllerName}.controller.ts', () => {
    let sandbox: sinon.SinonSandbox;
    let req: any = {};
    let responseStub: Partial<Response>;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        responseStub = {
            send: sandbox.stub(),
        }
    });

    it('should send a message' , () => {
        ${controllerName}Controller(req as Request, responseStub as Response);
        expect(responseStub.send).to.be.calledWith('${controllerName} controller');
        });
});
`;
    writeFile(filepath, fileContent, (err) => {
        if (err) throw err;
    });
};
