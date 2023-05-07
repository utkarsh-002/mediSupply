const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testDrugSchema = new Schema({
    drugManufacturer: { type: String, required: true },
    drugId : {
        type:String, required: true, unique: true
    },
    drugName : {
        type:String, required: true, unique: true
    },
    manDate : {
        type:Date,required:true
    },
    expiryDate :{
        type:Date, required:true
    },
    batchId :{
        type:String, required: true, unique: true
    } ,
    cost :{
        type:String, required:true
    }
})

const testDrug = mongoose.model("testDrug", testDrugSchema)

module.exports = testDrug;