import IRepository from '@/common/interfaces/IRepository';
import { Model } from 'mongoose';
import { RateDTO, IrateStates } from '../RateDTO';
export interface IRateRepository extends IRepository<Model<RateDTO>> {
  setRate(
    id: string,
    rating?: IrateStates,
    observations?: string
  ): Promise<void>;
}
