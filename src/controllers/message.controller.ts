import { NextFunction, Request, Response } from "express";
import { Message } from "../useCases/message.userCase";


class MessageController {
  private messageUserCase: Message;
  constructor() {
    this.messageUserCase = new Message()
  }
  async store(req: Request, res: Response, next: NextFunction) {
    const { message } = req.body;
    const { user_id } = req;
    try {
      const email_from_user = message.email;
      const message_from_user = message.bodyMessage;
      const result = await this.messageUserCase.create(user_id, email_from_user, message_from_user)
      return res.status(200).json({ok: true})

    } catch (error) {
      next(error)
    }
  }

}
export { MessageController };