import IRepository from '@/common/interfaces/IRepository';
import { IAtendimentoChat } from '../helper/Chat';
import { IAtendimentoModel, ISocketMessage } from '../SocketDTO';

export interface IChatRepository extends IRepository<IAtendimentoModel> {
  findById(room: string): Promise<IAtendimentoChat | null>;
  saveMessage(socketMessage: ISocketMessage): Promise<void>;
}
