import { IAtendimentoDTO } from '../../AtendimentoDTO';
import { Model } from 'mongoose';
import { IAtendimentoRepository } from '../IAtendimentoRepository';

export class AtendimentoRepository implements IAtendimentoRepository {
  constructor(private atendimentoModel: Model<IAtendimentoDTO>) {}

  updateReviewed(id: string, reviewed: boolean): Promise<IAtendimentoDTO> {
    return this.atendimentoModel.findByIdAndUpdate(id, { reviewed });
  }
}
