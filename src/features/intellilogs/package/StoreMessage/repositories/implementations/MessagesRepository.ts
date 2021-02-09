import { IMessagesDTO } from '../../MessagesDTO';
import { Model } from 'mongoose';
import { IMessagesRepository } from '../IMessagesRepository';

export class MessagesRepository implements IMessagesRepository {
  constructor(private messagesModel: Model<IMessagesDTO>) {}

  async upsert(
    id: string,
    message: string,
    context: string,
    misunderstood: boolean
  ): Promise<void> {
    const infos = {
      text: message,
      date: new Date(),
      misunderstood: misunderstood,
      context,
    };
    await this.messagesModel.findByIdAndUpdate(
      id,
      { $push: { messages: infos } },
      { upsert: true }
    );
  }
}
