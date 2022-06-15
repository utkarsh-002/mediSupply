const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId: { type:String, required: true, unique: true },
    drugId : {
        type:String, required: true, unique: true
    },
    quantity : {
        type:String, required: true, unique: true
    },
    currentOwner : {
        type:String, required: true, unique: true
    },
    status : {
        type:String, required: true, unique: true
    }
})

const user = mongoose.model("order", orderSchema)

module.exports = user