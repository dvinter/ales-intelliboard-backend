import { RateDTO, IrateStates } from '../../RateDTO';
import { Model } from 'mongoose';
import { IRateRepository } from '../IRateRepository';
export class RateRepository implements IRateRepository {
  constructor(private messagesModel: Model<RateDTO>) {}
  async setRate(
    id: string,
    rating?: IrateStates,
    observations?: string
  ): Promise<void> {
    const atendimento = await this.messagesModel.findByIdAndUpdate(
      id,
      { rating, observations },
      { omitUndefined: true }
    );
    if (!atendimento)
      throw {
        status: 404,
        message: `No conversation found for id ${id}`,
      };
  }
}
