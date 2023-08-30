import mongoose from "mongoose";

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
const studentSchema = new mongoose.Schema({
    admin:{
        type:ObjectId,
        ref:"user",
        required:true
    },
    firstName:{
        type: String,
        required:[true,"Please enter your firstName"],
    },
    secondName:{
        type: String,
        required:[true,"Please enter your secondName"],
    },
    birthDate:{
        type: String,
        required:[true,"Please enter your birtDate"],
    },
    contact:{
        type: String,
        required:[true,"Please enter your contact"],
    }

})

const Student = mongoose.models.studen || mongoose.model("studen",studentSchema)

export default Student