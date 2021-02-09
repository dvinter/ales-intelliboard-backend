import IRepository from '@/common/interfaces/IRepository';
import { Model } from 'mongoose';
import { IMessagesDTO } from '../MessagesDTO';
export interface IMessagesRepository extends IRepository<Model<IMessagesDTO>> {
  findById(id: string): Promise<IMessagesDTO | null>;
}
