import * as mongoose from "mongoose";
import {Request , Response , NextFunction} from 'express';
import student_model from "../../models/student";
import * as bcrypt from "bcrypt";


export class middleware{
    public insert = async(req:Request , res:Response , next:NextFunction)=>{
        try{
            const {
                FirstName , 
                LastName , 
                Date_of_Birth ,
                age ,
                result_10 , 
                result_12 ,
                Aadhar ,
                image ,
                PhoneNumber ,
                Email ,
                IDProof ,
                IDProof_image ,
                father_name ,
                father_Occupation ,
                parent_PhoneNumber ,
                Mother_name ,
                ZipCode ,
                State ,
                City ,
                Country 
                } = req?.body;
            
            // const data = z.object({
            //     FirstName: z.string().min(2 , "FirstName reach minimum limit").max(20 , "FirstName reach Maximum limit"),
            //     LastName : z.string().min(2 , "LastName reach minimum limit").max(20 , "LastName reach Maximum limit"),
            //     age : z.number().min(15 , "You reach the limit of Minimum age").max(30,"You reach the limit of maximum age")
            // })
            if(!FirstName || FirstName.length<2 || FirstName.length>20){
                res.status(400).json("FirstName is not valid");
            };
            if(!LastName || LastName.length<2 || LastName.length>20){
                res.status(400).json("FirstName is not valid");
            };
            if(age<15 || age>30){
                res.status(400).json("Age is not valid");
            };
            if(result_10<33 || result_10>100){
                res.status(400).json("Result of 10th is not valid");
            };
            if(result_12<33 || result_12>100){
                res.status(400).json("Result of 12th is not valid");
            };
            if(PhoneNumber.length!=10){
                res.status(400).json("PhoneNumber is not valid");
            };
            if(IDProof!="Aadhar" || IDProof!="PAN_CARD"){
                res.status(400).json("IDProof is not valid");
            };
            if(Aadhar.length!=12){
                res.status(400).json("Aadhar number is not valid");
            };
            if(parent_PhoneNumber.length!=10){
                res.status(400).json("Parent's Phone Number is not valid");
            }
            if(ZipCode.length!=6){
                res.status(400).json("Zip Code is not valid");
            }
            if(Mother_name.length<2 || Mother_name.length>20){
                res.status(400).json("Mother Name is not valid");
            };
            next();
        }
        catch(error){
            console.log(">>>>>     STUDENT INSERT MIDDLEWARE    <<<<<" , error);
            res.status(400).json(error);
        }
    }

    public login = async(req:Request , res:Response , next:NextFunction)=>{
        try{
            const data_find =  await student_model.findOne({Email:req.body.Email});

            if(!data_find){
                res.status(400).json('USER NOT FOUND');
            }
            
            if(data_find){
                const compare = await bcrypt.compare(req.body.password , data_find?.password)
                if(compare==false){
                    res.status(400).json('Password Is Incorrect');
                }
                else{
                    next();
                }
            }
        }
        catch(error){
            console.log(">>>>>     LOGIN MIDDLEWARE     <<<<<" , error);
            res.status(400).json(error);
        }
    }
}