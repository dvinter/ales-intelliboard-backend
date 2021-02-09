import IRepository from '@/common/interfaces/IRepository';
import { Model } from 'mongoose';
import { IAtendimentoDTO, Icontext } from '../MessageDTO';
export interface IMessagesRepository
  extends IRepository<Model<IAtendimentoDTO>> {
  saveMessage(
    id: string,
    text: string,
    context: Icontext,
    origin: string,
    platform?: string,
    userFrom?: string
  ): Promise<void>;
}
