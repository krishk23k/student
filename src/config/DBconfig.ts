import * as mongoose from "mongoose";

export class DBconfig{
    public connect(){
        let url = process.env.MONGODB
        const DB = mongoose.connect(`${url}`)
        .then(()=>{
            console.log('DATABASE IS CONNECTED');
        })
        .catch((error)=>{
            console.log("ERROR IN DATABASE CONNECTION" , error);
        })
        return DB;
    }
}