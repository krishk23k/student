import jwt from "jsonwebtoken"

export class JWT{
    public getAuthentication(data:any){
        return jwt.sign(data , "expire" )
    }
}