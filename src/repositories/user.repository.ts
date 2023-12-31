import { UsersModel } from "../infra/models/users.model"
import { ICreate, IEmail, IPagination } from "../interfaces/users.interface";

class UsersRepository {
   async create({name, email, password}: ICreate){
   const result =  await UsersModel.create({name, email, password});
   return result;
   }

   async findUserByEmail({email}:IEmail){
    const result =  await UsersModel.findOne({email});
    return result;
    }
    async findAllUsers({pageNumber, pageSize}: IPagination){
        const result = await UsersModel.find().skip((pageNumber -1) * pageSize).limit(pageSize).exec();
        return result;

    }
    async upload(filename:string, user_id:string){
        const result = await UsersModel.updateOne({_id: user_id}, {avatar_url:filename});
        return result;
    }
}
export {UsersRepository}