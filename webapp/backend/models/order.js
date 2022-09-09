const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    orderId: { type:String, required: true, unique: true },
    drugId : {
        type:String, required: true, unique: false
    },
    quantity : {
        type:String, required: true, unique: false
    },
    currentOwner : {
        type:String, required: true, unique: false
    },
    status : {
        type:String, required: true, unique: false
    }
})

const user = mongoose.model("order", orderSchema)

module.exports = user