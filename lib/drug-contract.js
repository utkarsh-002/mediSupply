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

    async createDrug(ctx, drugId, value) {
        const exists = await this.drugExists(ctx, drugId);
        if (exists) {
            throw new Error(`The drug ${drugId} already exists`);
        }
        const asset = { value };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(drugId, buffer);
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

    async updateDrug(ctx, drugId, newValue) {
        const exists = await this.drugExists(ctx, drugId);
        if (!exists) {
            throw new Error(`The drug ${drugId} does not exist`);
        }
        const asset = { value: newValue };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(drugId, buffer);
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
