import { NextFunction, Request, Response } from "express";
import { Rooms } from "../useCases/rooms.userCase";


class RoomsController {
    private roomsUserCase: Rooms;
    constructor(){
        this.roomsUserCase = new Rooms()
    }
    async store(req:Request, res:Response, next:NextFunction){
        const {email} = req.body;
        const {user_id} = req;
        try {
            const result = await this.roomsUserCase.create(email, user_id);
            return res.status(201).json(result);
        } catch (error) {
            next(error)
        }
    }
   
}
export{RoomsController};