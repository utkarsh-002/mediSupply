/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class OrderContract extends Contract {

    async orderExists(ctx, orderId) {
        const buffer = await ctx.stub.getState(orderId);
        return (!!buffer && buffer.length > 0);
    }

    async createOrder(ctx, orderId, drugId, quantity, currentOwner, status) {
        // const drugContext = network.getContract(drug-contract);
        const check = await ctx.stub.getState(drugId);
        const drugExists = (!!check && check.length > 0);
        if (!drugExists) {
            throw new Error(`The drug ${drugId} does not exist`);
        }
        const exists = await this.orderExists(ctx, orderId);
        if (exists) {
            throw new Error(`The order ${orderId} already exists`);
        }
        const fetched = await ctx.stub.getState(drugId);
        const read = JSON.parse(fetched.toString());
        const drugName = read.drugName;
        const asset = { drugId, drugName, quantity, currentOwner, status};
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(orderId, buffer);
        const txId = ctx.stub.getTxID();
        return txId;
    }

    async readOrder(ctx, orderId) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order ${orderId} does not exist`);
        }
        const buffer = await ctx.stub.getState(orderId);
        const asset = JSON.parse(buffer.toString());
        return asset;
    }

    async updateOrder(ctx, orderId, newCurrentOwner, newStatus) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order ${orderId} does not exist`);
        }
        const fetched = await ctx.stub.getState(orderId);
        const read = JSON.parse(fetched.toString());
        const drugId = read.drugId;
        const drugName = read.drugName;
        const quantity = read.quantity;
        const asset = { drugId, drugName, quantity, currentOwner: newCurrentOwner, status:newStatus };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(orderId, buffer);
        const txId = ctx.stub.getTxID();
        return txId;
    }

    async deleteOrder(ctx, orderId) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order ${orderId} does not exist`);
        }
        await ctx.stub.deleteState(orderId);
    }

    async verifyAsDistributor(ctx, orderId) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order ${orderId} does not exist`);
        }
        const buffer = await ctx.stub.getState(orderId);
        const read = JSON.parse(buffer.toString());
        const currentOwner = read.currentOwner;
        const drugId = read.drugId;
        const quantity = read.quantity;
        const drugName = read.drugName;
        const status = read.status;
        if(currentOwner === 'M'){
            const newCurrentOwner = "D";
            const asset = { drugId, drugName, quantity, currentOwner: newCurrentOwner, status};
            const buffer = Buffer.from(JSON.stringify(asset));
            await ctx.stub.putState(orderId, buffer);
            return "Verified";
        }
        else if(currentOwner === 'D'){
            return "Verified";
        }
        else{
            return "Not verified";
        }
    }

    async verifyAsRetailer(ctx, orderId) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order ${orderId} does not exist`);
        }
        const buffer = await ctx.stub.getState(orderId);
        const read = JSON.parse(buffer.toString());
        const currentOwner = read.currentOwner;
        const drugId = read.drugId;
        const quantity = read.quantity;
        const drugName = read.drugName;
        const status = read.status;
        if(currentOwner === 'D'){
            const newCurrentOwner = "R";
            const asset = { drugId, drugName, quantity, currentOwner: newCurrentOwner, status};
            const buffer = Buffer.from(JSON.stringify(asset));
            await ctx.stub.putState(orderId, buffer);
            return "Verified";
        }
        else if(currentOwner === 'R'){
            return "Verified";
        }
        else{
            return "Not verified";
        }
    }

    async verifyAsConsumer(ctx, orderId) {
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order ${orderId} does not exist`);
        }
        const buffer = await ctx.stub.getState(orderId);
        const read = JSON.parse(buffer.toString());
        const currentOwner = read.currentOwner;
        const drugId = read.drugId;
        const quantity = read.quantity;
        const drugName = read.drugName;
        const status = read.status;
        if(currentOwner === 'R'){
            const newCurrentOwner = "C";
            const newStatus = "Delivered";
            const asset = { drugId, drugName, quantity, currentOwner: newCurrentOwner, status: newStatus};
            const buffer = Buffer.from(JSON.stringify(asset));
            await ctx.stub.putState(orderId, buffer);
            return "Verified";
        }
        else if(currentOwner === 'C'){
            return "Verified";
        }
        else{
            return "Not verified";
        }
    }

}

module.exports = OrderContract;
