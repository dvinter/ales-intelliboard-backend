import IRepository from '@/common/interfaces/IRepository';
import { Model } from 'mongoose';
import { IAtendimentoDTO } from '../AtendimentoDTO';
export interface IAtendimentoRepository
  extends IRepository<Model<IAtendimentoDTO>> {
  findCampaignInfos(
    startDate: string,
    endDate: string,
    campaignId?: string
  ): Promise<IAtendimentoDTO[]>;
  findByStartDateInterval(
    startDate: string,
    endDate: string,
    options?: Record<string, unknown>
  ): Promise<IAtendimentoDTO[]>;
}
