import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {User} from "./user.schema";
import {UserCreateDto} from "./dto/user-create.dto";
import { ObjectId } from 'bson';

@Injectable()
export class UserService{

  constructor(@InjectModel(User.name) private  userModel:mongoose.Model<User>) {
  }
  async create(userData:UserCreateDto){
    return this.userModel.create(userData)
  }
  async delete(id:ObjectId){
    return this.userModel.deleteOne(id);
  }
  async getById(id:ObjectId){
    return this.userModel.findById(id);
  }
  async getByEmail(email:string){
    return this.userModel.findOne({
      email
    })
  }
  async update(userData:Partial<User>,id){
    return this.userModel.findByIdAndUpdate(id,userData);
  }
}