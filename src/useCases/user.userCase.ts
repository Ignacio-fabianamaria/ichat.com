import { UsersRepository } from "../repositories/user.repository";

class Users {
  private usersRepository: UsersRepository;
  constructor() {
    this.usersRepository = new UsersRepository();
  }
  async create({ name, email, password }) {
    const findUser = await this.usersRepository.findUserByEmail({ email });
    if (findUser) {
      throw new Error("User exists.");
    }
    return findUser;
  }
}
export { Users };
