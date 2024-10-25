import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { studentUtils } from './studentUtils';
import * as bcrypt from "bcrypt";
import student_model from '../../models/student';
import { JWT } from "../../helper/jwt"
import { TokenExpiredError } from 'jsonwebtoken';

export class studentController {
    public studentUtils = new studentUtils();
    public jwt = new JWT();
    public studentInsert = async (req: Request, res: Response) => {
        try {
            const {
                FirstName,
                LastName,
                Date_of_Birth,
                age,
                result_10,
                result_12,
                Aadhar,
                image,
                PhoneNumber,
                Email,
                IDProof,
                IDProof_image,
                father_name,
                father_Occupation,
                parent_PhoneNumber,
                Mother_name,
                ZipCode,
                State,
                City,
                Country,
                password,
                branch,
                semester
            } = req?.body;

            const pass = await bcrypt.hash(password, 10);

            const data = {
                FirstName,
                LastName,
                Date_of_Birth,
                age,
                result_10,
                result_12,
                Aadhar,
                image,
                PhoneNumber,
                Email,
                IDProof,
                IDProof_image,
                father_name,
                father_Occupation,
                parent_PhoneNumber,
                Mother_name,
                ZipCode,
                State,
                City,
                Country,
                password: pass,
                branch , 
                semester
            }
            let utils = await this.studentUtils.insert(data)
            res.status(200).json(utils);
        }
        catch (error) {
            console.log(">>>>>     Student Insert     <<<<<", error);
            res.status(400).json(error);
        }
    }

    // public updateStudent = async (req: Request, res: Response) => {
    //     try {
    //         const {
    //             FirstName,
    //             LastName,
    //             Date_of_Birth,
    //             age,
    //             result_10,
    //             result_12,
    //             Aadhar,
    //             image,
    //             PhoneNumber,
    //             Email,
    //             IDProof,
    //             IDProof_image,
    //             father_name,
    //             father_Occupation,
    //             parent_PhoneNumber,
    //             Mother_name,
    //             ZipCode,
    //             State,
    //             City,
    //             Country,
    //             password,
    //         } = req?.body;

    //         const data = {
    //             FirstName : FirstName,
    //             LastName : LastName,
    //             Date_of_Birth : Date_of_Birth,
    //             age : age,
    //             result_10 : result_10,
    //             result_12 : result_12,
    //             Aadhar : Aadhar,
    //             image : image,
    //             PhoneNumber : PhoneNumber,
    //             Email : Email ,
    //             IDProof : IDProof,
    //             IDProof_image : IDProof_image,
    //             father_name : father_name,
    //             father_Occupation : father_Occupation,
    //             parent_PhoneNumber : parent_PhoneNumber,
    //             Mother_name : Mother_name,
    //             ZipCode : ZipCode,
    //             State : State,
    //             City : City,
    //             Country : Country
    //         };

    //         // const result = await this.studentUtils.updateStudent(data);
    //         res.status(200).json('Login successful');
    //     }
    //     catch (error) {
    //         console.log(">>>>>     STUDENT UPDATE CONTROLLER    <<<<<");
    //         res.status(400).json(error);
    //     }
    // }

    public login = async (req: Request, res: Response) => {
        try {
            const { Email, password } = req.body;
            const data = {
                Email: Email,
                password: password
            }
            const data_find = await student_model.findOne({ Email: req.body.Email });

            if (!data_find) {
                res.status(400).json({ message: 'USER NOT FOUND' });
                return;
            };

            const compare = await bcrypt.compare(req.body.password, data_find?.password);
            if (compare == false) {
                res.status(400).json({ message: 'Password Is Incorrect' });
                return;
            };

            const token_data = {
                Email: req.body.Email,
                password: req.body.password
            };

            const token = await this.jwt.getAuthentication(token_data);
            console.log(token);
            res.status(200).json({ message: 'Login successful', token });
        }
        catch (error) {
            console.log('>>>>>     LOGIN ERROR FOR CONTROLLER    <<<<<', error)
            res.status(400).json(error);
        }
    }


    public find_user = async(req:Request , res:Response)=>{
        try{
            const{Email} = req.query;
            console.log(Email)
            const result = await this.studentUtils.find_user(Email);
            console.log(result)
            res.status(200).json(result);

        }
        catch(error){
            console.log(">>>>>     FIND USER CONTROLLER     <<<<<")
            res.status(400).json(error);
        }
    }

    public find_all = async(req:Request ,  res:Response)=>{
        try{
            const result = await this.studentUtils.find_all();
            res.status(200).json(result);
        }
        catch(error){
            console.log(">>>>>     FIND_ALL CONTROLLER    <<<<<" , error);
            res.status(400).json(error);
        }
    }
}