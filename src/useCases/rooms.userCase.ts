import { HttpException } from "../interfaces/HttpException";
import { RoomsRepository } from "../repositories/rooms.repository";
import { UsersRepository } from "../repositories/user.repository";


class Rooms {
  private roomsRepository: RoomsRepository;
  private usersRepository: UsersRepository
  constructor() {
    this.roomsRepository = new RoomsRepository;
    this.usersRepository = new UsersRepository;
  }
  async create(email:string, user_id:string){
    const findDestinationsUserId = await this.usersRepository.findUserByEmail({email});
    if(!findDestinationsUserId){
        throw new HttpException(400, 'User not found')
    }
    const result = await this.roomsRepository.create({
        user_id_joined_room:findDestinationsUserId.id,
        user_id_created_room: user_id,
    });
    return result
  }
  async find(email:string, user_id:string){
    const findDestinationsUserId = await this.usersRepository.findUserByEmail({email});
    if(!findDestinationsUserId){
        throw new HttpException(400, 'User not found')
    }
    const findRoom = await this.roomsRepository.find({
      user_id_joined_room:findDestinationsUserId.id,
      user_id_created_room: user_id,
    });
    return findRoom;
  }
}
export { Rooms };
