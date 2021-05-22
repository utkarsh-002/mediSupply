/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { ChaincodeStub, ClientIdentity } = require('fabric-shim');
const { DrugContract } = require('..');
const winston = require('winston');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.should();
chai.use(chaiAsPromised);
chai.use(sinonChai);

class TestContext {

    constructor() {
        this.stub = sinon.createStubInstance(ChaincodeStub);
        this.clientIdentity = sinon.createStubInstance(ClientIdentity);
        this.logger = {
            getLogger: sinon.stub().returns(sinon.createStubInstance(winston.createLogger().constructor)),
            setLevel: sinon.stub(),
        };
    }

}

describe('DrugContract', () => {

    let contract;
    let ctx;

    beforeEach(() => {
        contract = new DrugContract();
        ctx = new TestContext();
        ctx.stub.getState.withArgs('1001').resolves(Buffer.from('{"value":"drug 1001 value"}'));
        ctx.stub.getState.withArgs('1002').resolves(Buffer.from('{"value":"drug 1002 value"}'));
    });

    describe('#drugExists', () => {

        it('should return true for a drug', async () => {
            await contract.drugExists(ctx, '1001').should.eventually.be.true;
        });

        it('should return false for a drug that does not exist', async () => {
            await contract.drugExists(ctx, '1003').should.eventually.be.false;
        });

    });

    describe('#createDrug', () => {

        it('should create a drug', async () => {
            await contract.createDrug(ctx, '1003', 'drug 1003 value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1003', Buffer.from('{"value":"drug 1003 value"}'));
        });

        it('should throw an error for a drug that already exists', async () => {
            await contract.createDrug(ctx, '1001', 'myvalue').should.be.rejectedWith(/The drug 1001 already exists/);
        });

    });

    describe('#readDrug', () => {

        it('should return a drug', async () => {
            await contract.readDrug(ctx, '1001').should.eventually.deep.equal({ value: 'drug 1001 value' });
        });

        it('should throw an error for a drug that does not exist', async () => {
            await contract.readDrug(ctx, '1003').should.be.rejectedWith(/The drug 1003 does not exist/);
        });

    });

    describe('#updateDrug', () => {

        it('should update a drug', async () => {
            await contract.updateDrug(ctx, '1001', 'drug 1001 new value');
            ctx.stub.putState.should.have.been.calledOnceWithExactly('1001', Buffer.from('{"value":"drug 1001 new value"}'));
        });

        it('should throw an error for a drug that does not exist', async () => {
            await contract.updateDrug(ctx, '1003', 'drug 1003 new value').should.be.rejectedWith(/The drug 1003 does not exist/);
        });

    });

    describe('#deleteDrug', () => {

        it('should delete a drug', async () => {
            await contract.deleteDrug(ctx, '1001');
            ctx.stub.deleteState.should.have.been.calledOnceWithExactly('1001');
        });

        it('should throw an error for a drug that does not exist', async () => {
            await contract.deleteDrug(ctx, '1003').should.be.rejectedWith(/The drug 1003 does not exist/);
        });

    });

});
