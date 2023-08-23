import { NextFunction, Request, Response } from "express";

class UserController {
    store(req:Request, res:Response, next:NextFunction){
        const{name, email, password} = req.body;
        try {
            return res.status(201).json({ok:true})
        } catch (error) {
            next(error)
        }
    }
}
export{UserController};