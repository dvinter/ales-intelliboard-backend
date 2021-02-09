import IRepository from '@/common/interfaces/IRepository';
import { Model } from 'mongoose';
import { IUserDTO } from '../AuthDTO';
export interface IAuthRepository extends IRepository<Model<IUserDTO>> {
  findOneAndUpdate(id: string, token: string): Promise<IUserDTO | null>;
  findById(id: string): Promise<IUserDTO | null>;
}
