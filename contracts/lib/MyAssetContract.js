/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class MyAssetContract extends Contract {

    async printSomething(ctx, text){
        return JSON.parse(text);
    }

    async drugExists(ctx, drugId) {
        const buffer = await ctx.stub.getState(drugId);
        return (!!buffer && buffer.length > 0);
    }

    async createDrug(ctx, drugData) {
        drugData = JSON.parse(drugData);
        console.log(typeof(drugData));
        const exists = await this.drugExists(ctx, drugData.drugId);
        if (exists) {
            throw new Error(`The drug ${drugData.drugId} already exists`);
        }

        const asset = { 
            drugName : drugData.drugName, 
            manufacturer : drugData.drugManufacturer , 
            mfdDate : drugData.manDate, 
            expiryDate : drugData.expiryDate, 
            batchId : drugData.batchId,
            cost : drugData.cost
        };

        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(drugData.drugId, buffer);
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

    async updateDrug(ctx,newDrugData) {
        newDrugData  = JSON.parse(newDrugData);
        const exists = await this.drugExists(ctx, newDrugData.drugId);
        if (!exists) {
            throw new Error(`The drug ${newDrugData.drugId} does not exist`);
        }
        const asset = { 
            drugName : newDrugData.drugName, 
            manufacturer : newDrugData.drugManufacturer , 
            mfdDate : newDrugData.manDate, 
            expiryDate : newDrugData.expiryDate, 
            batchId : newDrugData.batchId,
            cost : newDrugData.cost
        };
            
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(newDrugData.drugId, buffer);
        const txId = ctx.stub.getTxID();
        return txId;
    }

    async deleteDrug(ctx, drugId) {
        drugId = JSON.parse(drugId);
        const exists = await this.drugExists(ctx, drugId);
        if (!exists) {
            throw new Error(`The drug ${drugId} does not exist`);
        }
        await ctx.stub.deleteState(drugId);
        const txId = ctx.stub.getTxID();
        return txId;
    }

    async orderExists(ctx, orderId) {
        const buffer = await ctx.stub.getState(orderId);
        return (!!buffer && buffer.length > 0);
    }

    async createOrder(ctx, orderData) {
        orderData = JSON.parse(orderData);
        const check = await ctx.stub.getState(orderData.drugId);
        const drugExists = (!!check && check.length > 0);
        if (!drugExists) {
            throw new Error(`The drug ${orderData.drugId} does not exist`);
        }
        const exists = await this.orderExists(ctx, orderData.orderId);
        if (exists) {
            throw new Error(`The order ${orderData.orderId} already exists`);
        }
        const fetched = await ctx.stub.getState(orderData.drugId);
        const read = JSON.parse(fetched.toString());
        const drugName = read.drugName;
        const asset = { 
            drugId : orderData.drugId, 
            drugName , 
            quantity : orderData.quantity, 
            currentOwner : orderData.currentOwner, 
            status : orderData.status
        };
        const buffer = Buffer.from(JSON.stringify(asset));
        await ctx.stub.putState(orderData.orderId, buffer);
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

    async updateOrder(ctx,newOrderData) {
        newOrderData = JSON.parse(newOrderData);
        const { orderId , newCurrentOwner , newStatus } = newOrderData;
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
        orderId = JSON.parse(orderId);
        const exists = await this.orderExists(ctx, orderId);
        if (!exists) {
            throw new Error(`The order ${orderId} does not exist`);
        }
        await ctx.stub.deleteState(orderId);
        const txId = ctx.stub.getTxID();
        return txId;
    }

    async verifyAsDistributor(ctx, orderId) {
        orderId = JSON.parse(orderId);
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
        orderId = JSON.parse(orderId);
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
        orderId = JSON.parse(orderId);
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

module.exports = MyAssetContract;
