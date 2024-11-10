import * as  mongoose from 'mongoose';
import * as express from 'express';
import student_model from '../../models/student';
import * as bcrypt from "bcrypt";


export class studentUtils {
    public insert = async (data: any) => {
        if (!data) {
            console.log("No Data available to insert");
        }
        const data_insert = await student_model.insertMany(data);
        return data_insert;
    }

    public updateStudent = async(data:any)=>{
        const data_update = await student_model.updateMany(data);
        return data_update;
    }

    public find_user = async(data:any)=>{
        console.log(data)
        let query = [];
        const email = JSON.stringify(data);
        let result = await student_model.aggregate([
            {
                $match:{
                    Email:data
                }
            },
            {
                $project:{
                    FirstName:1,
                    LastName:1,
                    Date_of_Birth:1,
                    age:1,
                    result_10:1,
                    result_12:1,
                    Aadhar:1,
                    image:1,
                    PhoneNumber:1,
                    Email:1,
                    IDProof:1,
                    IDProof_image:1,
                    father_name:1,
                    father_Occupation:1,
                    parent_PhoneNumber:1,
                    Mother_name:1,
                    ZipCode:1,
                    State:1,
                    City:1,
                    Country:1
                }
            }
        ])

        return result;
    }

    public find_all = async()=>{
        const result = await student_model.aggregate([
            {
                $match:{}
            },
            {
            $project:{
                FirstName:1,
                LastName:1,
                Date_of_Birth:1,
                age:1,
                result_10:1,
                result_12:1,
                Aadhar:1,
                image:1,
                PhoneNumber:1,
                Email:1,
                IDProof:1,
                IDProof_image:1,
                father_name:1,
                father_Occupation:1,
                parent_PhoneNumber:1,
                Mother_name:1,
                ZipCode:1,
                State:1,
                City:1,
                Country:1,
                branch:1,
                semester:1 
            }
        }])
        console.log(result)

        return result;
    }

    public deleteStudents = async(data:any)=>{
        const result = await student_model.deleteOne({_id:data._id});
        return result;

    }


}