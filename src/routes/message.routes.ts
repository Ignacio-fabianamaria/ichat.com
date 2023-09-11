import { Router } from "express"
import { authMiddleware } from "../middlewares/auth.middleware";
import { MessageController } from "../controllers/message.controller";

class MessageRoutes{
    public router:Router
    private messageController = new MessageController();
    constructor(){
        this.router = Router();
        this.getRoutes();
    }
    getRoutes(){
       this.router.post('/', authMiddleware, this.messageController.store.bind(this.messageController));
       this.router.put('/', authMiddleware, this.messageController.updateViwe.bind(this.messageController))
    }

}
export{MessageRoutes}