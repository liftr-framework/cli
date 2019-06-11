import * as sinon from 'sinon';
import { expect } from 'chai';
import { Request, Response } from 'express';
import { liftrController } from './liftr.controller';

describe('src/controllers/liftr.controller.ts', () => {
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
        liftrController(req as Request, responseStub as Response);
        expect(responseStub.send).to.be.calledWith('Lift off!');
    });
});
