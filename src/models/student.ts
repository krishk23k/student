import { truncate } from "fs";
import * as mongoose from "mongoose";

let student_schema = new mongoose.Schema({
    FirstName: {
        type: mongoose.Schema.Types.String,
        required:true
    },
    LastName: {
        type: mongoose.Schema.Types.String,
        required:true
    },
    age: {
        type: mongoose.Schema.Types.Number,
        required:true
    },
    Date_of_Birth: {
        type: mongoose.Schema.Types.Date,
        required:true
    },
    result_10: {
        type: mongoose.Schema.Types.String,
        required:true
    },
    result_12: {
        type: mongoose.Schema.Types.String,
        required:true
    },
    Aadhar: {
        type: mongoose.Schema.Types.String,
        required:true,
        unique:true
    },
    image: {
        type: mongoose.Schema.Types.String,
        required:true
    },
    PhoneNumber:{
        type: mongoose.Schema.Types.String,
        unique:true
    },
    Email:{
        type: mongoose.Schema.Types.String,
        required:true,
        unique:true
    },
    ZipCode:{
        type: mongoose.Schema.Types.String,
        required:true
    },
    State:{
        type: mongoose.Schema.Types.String
    },
    City:{
        type: mongoose.Schema.Types.String
    },
    Country:{
        type: mongoose.Schema.Types.String
    },
    IDProof:{
        type: mongoose.Schema.Types.String,
        required:true,
        enum:["Aadhar" , "PAN_CARD"]
    },
    IDProof_image:{
        type: mongoose.Schema.Types.String
    },
    father_name:{
        type: mongoose.Schema.Types.String,
        required:true
    },
    father_Occupation:{
        type: mongoose.Schema.Types.String
    },
    parent_PhoneNumber:{
        type: mongoose.Schema.Types.String,
        required:true
    },
    Mother_name:{
        type: mongoose.Schema.Types.String,
        required:true
    },
    password:{
        type: mongoose.Schema.Types.String,
        required : true,
    },
    branch:{
        type:mongoose.Schema.Types.String,
        enum:["Computer Science Engineering" , "Electrical Engineering" , "Civil Engineering"],
        required:true
    },
    semester:{
        type:mongoose.Schema.Types.String,
        required:true
    }
},
    {
        timestamps: true,
        versionKey: false
    }
)

const student_model = mongoose.model("student_model",student_schema);

export default student_model;