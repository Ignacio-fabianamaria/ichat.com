import { NextFunction, Request, Response } from "express";
import { Users } from "../useCases/user.userCase";

class UserController {
    private usersUserCase: Users;
    constructor(){
        this.usersUserCase = new Users()
    }
   async store(req:Request, res:Response, next:NextFunction){
        const{name, email, password} = req.body;
        try {
            const result = await this.usersUserCase.create({name, email, password})
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    async auth(req:Request, res:Response, next:NextFunction){
        const{ email, password} = req.body;

        try {
            const result = await this.usersUserCase.auth({email, password})
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}
export{UserController};