import { NextFunction, Request, Response } from "express";
import { Users } from "../useCases/user.userCase";
import { HttpException } from "../interfaces/HttpException";

class UserController {
  private usersUserCase: Users;
  constructor() {
    this.usersUserCase = new Users()
  }
  async store(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    try {
      const result = await this.usersUserCase.create({ name, email, password })
      return res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
  async upload(req: Request, res: Response, next: NextFunction) {
    const file = req.file;
    const { user_id } = req;
    console.log("🚀 ~ file: user.controller.ts:20 ~ UserController ~ upload ~ file:", file)
    try {
      if (!file?.filename) {
        throw new HttpException(400, 'Filename doenst exists');

      }
      const result = await this.usersUserCase.upload(file.filename, user_id)
      return res.status(201).json(result)
    } catch (error) {
      next(error)
    }
  }
  async auth(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      const result = await this.usersUserCase.auth({ email, password })
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const { pageNumber, pageSize } = req.query;
    const DEFAULT_PAGE_SIZE = 5;
    const DEFAULT_PAGE_NUMBER = 1;
    const number = Number(pageNumber) ? Number(pageNumber) : DEFAULT_PAGE_NUMBER;
    const size = Number(pageSize) ? Number(pageSize) : DEFAULT_PAGE_SIZE;
    try {
      const result = await this.usersUserCase.findAllUsers({ pageNumber: number, pageSize: size })
      return res.status(200).json(result);
    } catch (error) {
      next(error)
    }
  }
}
export { UserController };