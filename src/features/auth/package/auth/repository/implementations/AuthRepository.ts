import { IUserDTO } from '../../AuthDTO';
import { Model } from 'mongoose';
import { IAuthRepository } from '../IAuthRepository';
export class LoginRepository implements IAuthRepository {
  constructor(private userModel: Model<IUserDTO>) {}
  async findOneAndUpdate(id: string, token: string): Promise<IUserDTO | null> {
    const user = await this.userModel.findByIdAndUpdate({ _id: id }, { token });
    return user;
  }
  async findById(id: string): Promise<IUserDTO | null> {
    const user = await this.userModel.findById(id);
    return user;
  }
}
