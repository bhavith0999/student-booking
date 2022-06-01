import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {

    constructor( @InjectModel(User.name) private readonly model: Model<UserDocument>) {}

    async findOne(username: string): Promise<User> {
        return await this.model.findOne({username}).exec();
    }


  async create(userReq): Promise<User> {
    return await new this.model(userReq).save();
  }
}
