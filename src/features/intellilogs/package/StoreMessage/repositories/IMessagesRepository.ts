import IRepository from '@/common/interfaces/IRepository';
import { Model } from 'mongoose';
import { IMessagesDTO } from '../MessagesDTO';
export interface IMessagesRepository extends IRepository<Model<IMessagesDTO>> {
  upsert(
    id: string,
    message: string,
    context: string,
    misunderstood: boolean
  ): Promise<void>;
}
