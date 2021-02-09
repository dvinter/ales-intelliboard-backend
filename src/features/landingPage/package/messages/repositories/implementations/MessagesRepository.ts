import { IMessagesRepository } from '../IMessagesRepository';
import { IAtendimentoDTO, Icontext } from '../../MessageDTO';
import { Model } from 'mongoose';
import * as uuid from 'uuid';
export class MessagesRepository implements IMessagesRepository {
  constructor(private atendimentoModel: Model<IAtendimentoDTO>) {}
  async saveMessage(
    id: string,
    text: string,
    context: Icontext,
    origin: string,
    platform?: string,
    userFrom?: string
  ): Promise<void> {
    if (process.env.SAVE_LOGS?.toUpperCase() !== 'FALSE') {
      await this.atendimentoModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          ...context,
          platform,
          user: { userName: userFrom ?? '', userNumber: userFrom ?? '' },
          $push: {
            messages: {
              _id: uuid.v4(),
              context: context.saveContext === true ? context : {},
              date: new Date(),
              from: origin,
              status: `${context.atendimentoStatus}`,
              text: text,
            },
          },
        },
        { upsert: true, omitUndefined: true, new: true }
      );
    }
  }
}
