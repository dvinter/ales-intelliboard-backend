import IRepository from '@/common/interfaces/IRepository';
import { Model } from 'mongoose';
import { IAtendimentoDTO } from '../AtendimentoDTO';
export interface IAtendimentoRepository
  extends IRepository<Model<IAtendimentoDTO>> {
  updateReviewed(id: string, reviewed: boolean): Promise<IAtendimentoDTO>;
}
