import { Router } from "express"
import { UserController } from "../controllers/user.controller";

class UserRoutes{
    public router:Router
    private userController = new UserController();
    constructor(){
        this.router = Router();
    }
    getRoutes(){
        this.router.post('/users', this.userController.store)
    }
}
export{UserRoutes}