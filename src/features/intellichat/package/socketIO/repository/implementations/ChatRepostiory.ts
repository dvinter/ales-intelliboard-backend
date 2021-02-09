import { Model } from 'mongoose';
import { IAtendimentoChat } from '../../helper/Chat';
import { ISocketAtendimentoDTO, ISocketMessage } from '../../SocketDTO';
import { IChatRepository } from '../IChatRepository';
import * as uuid from 'uuid';
export class ChatRepository implements IChatRepository {
  constructor(private atendimentoModel: Model<ISocketAtendimentoDTO>) {}
  async saveMessage(socketMessage: ISocketMessage): Promise<void> {
    await this.atendimentoModel.findByIdAndUpdate(
      {
        _id: socketMessage.room,
      },
      {
        user: {
          userName: socketMessage.name,
          userNumber: socketMessage.userNumber
        },
        platform: socketMessage.platform,
        $push: {
          messages: {
            _id: uuid.v4(),
            date: new Date(),
            from: origin,
            text: socketMessage.message.message,
            MessageSid: socketMessage.MessageSid,
          },
        },
      }
    );
  }
  findById(room: string): Promise<IAtendimentoChat | null> {
    return this.atendimentoModel.findById(room);
  }
}
