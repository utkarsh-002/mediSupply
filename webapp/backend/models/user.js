const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role:{
        type: String,
        enum:['man','dist','ret','admin'],
        required : true
    },
    // license number, established, registered date, address, contact
    license_number:{
        type: String,
        required: true,
        unique:true
    },
    address:{
        type:String,
        required: true
    },
    contact:{
        type:String,
        required: true
    },
    validCount : {
        type : Number,
        default : 0,
    },
    invalidCount : {
        type : Number,
        default : 0,
    },
    date :{
        type: Date, default: Date.now
    }
})

const user = mongoose.model("user", userSchema)

module.exports = user