import { IMessagesDTO } from '../../MessagesDTO';
import { Model } from 'mongoose';
import { IMessagesRepository } from '../IMessagesRepository';
export class MessagesRepository implements IMessagesRepository {
  constructor(private messagesModel: Model<IMessagesDTO>) {}
  async findById(id: string): Promise<IMessagesDTO | null> {
    return await this.messagesModel.findById(id).lean();
  }
}
