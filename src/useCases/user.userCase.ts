import { ICreate } from "../interfaces/users.interface";
import { UsersRepository } from "../repositories/user.repository";
import { hash } from 'bcrypt';

class Users {
  private usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = new UsersRepository();
  }
  async create({ name, email, password }: ICreate) {
    const findUser = await this.usersRepository.findUserByEmail({ email });
    if (findUser.length > 0) {
      throw new Error("User exists.");
    }
    const hashPassword = await hash(password, 10)
    const result = await this.usersRepository.create({ name, email, password: hashPassword })
    return result;
  }
}
export { Users };
