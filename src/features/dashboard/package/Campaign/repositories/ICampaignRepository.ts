import IRepository from '@/common/interfaces/IRepository';
import { Model } from 'mongoose';
import { ICampaignDTO } from '../CampaignDTO';
import { Dayjs } from 'dayjs';
export interface ICampaignRepository extends IRepository<Model<ICampaignDTO>> {
  findByAtendimentoInterval(start: Dayjs, end: Dayjs): Promise<ICampaignDTO[]>;
}
