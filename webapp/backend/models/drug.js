const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drugSchema = new Schema({
    man: { type: String, required: true },
    drugId : {
        type:String, required: true, unique: true
    },
    name : {
        type:String, required: true, unique: true
    }
})

const user = mongoose.model("drug", drugSchema)

module.exports = user