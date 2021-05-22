/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class DrugContract extends Contract {

    async drugExists(ctx, drugId) {
        const buffer = await ctx.stub.getState(drugId);
        return (!!buffer && buffer.length > 0);
    }

    async createDrug(ctx, drugId, drugName, manufacturer, mfdDate, expiryDate, batchId) {
        const exists = await this.drugExists(ctx, drugId);
        if (exists) {
            throw new Error(`The drug ${drugId} already exists`);
        }
        const asset = { drugName, manufacturer, mfdDate, expiryDate, batchId};
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(drugId, buffer);
        const txId = ctx.stub.getTxID();
        return txId;
    }

    async readDrug(ctx, drugId) {
        const exists = await this.drugExists(ctx, drugId);
        if (!exists) {
            throw new Error(`The drug ${drugId} does not exist`);
        }
        const buffer = await ctx.stub.getState(drugId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateDrug(ctx, drugId, newDrugName, newManufacturer, newMfdDate, newExpiryDate, newBatchId) {
        const exists = await this.drugExists(ctx, drugId);
        if (!exists) {
            throw new Error(`The drug ${drugId} does not exist`);
        }
        const asset = { drugName: newDrugName, manufacturer: newManufacturer, mfdDate: newMfdDate, expiryDate: newExpiryDate, batchId:newBatchId};
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(drugId, buffer);
        const txId = ctx.stub.getTxID();
        return txId;
    }

    async deleteDrug(ctx, drugId) {
        const exists = await this.drugExists(ctx, drugId);
        if (!exists) {
            throw new Error(`The drug ${drugId} does not exist`);
        }
        await ctx.stub.deleteState(drugId);
    }

}

module.exports = DrugContract;
