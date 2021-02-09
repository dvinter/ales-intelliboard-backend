import { IUserDTO, IUserModel } from '../../UserDTO';
import { IUserRepository } from '../IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(private userModel: IUserModel) {}
  findByEmail(email: string): Promise<IUserDTO | null> {
    return this.userModel.findById(email);
  }

  createUser(email: string, password: string): Promise<IUserDTO> {
    return this.userModel.create({ _id: email, password });
  }
}
