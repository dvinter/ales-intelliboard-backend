import { Model } from 'mongoose';
import { IntelliChatUser } from '../../SocketDTO';
import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(private userModel: Model<IntelliChatUser>) {}
  findByRoom(room: string): Promise<IntelliChatUser> {
    return this.userModel.findOne({
      rooms: {
        $elemMatch: {
          $eq: room,
        },
      },
    });
  }
}
