import IRepository from '@/common/interfaces/IRepository';
import { IUserDTO, IUserModel } from '../UserDTO';

export interface IUserRepository extends IRepository<IUserModel> {
  findByEmail(email: string): Promise<IUserDTO | null>;
  createUser(email: string, password: string): Promise<IUserDTO>;
}
