import { IRateRepository } from './repositories/IRateRepository';
import { IrateStates } from './RateDTO';
export class RateUseCase {
  constructor(private rateRepository: IRateRepository) {}
  async execute(
    id: string,
    rating?: string,
    observations?: string
  ): Promise<void> {
    if (rating && !Object.values(IrateStates).includes(rating as IrateStates)) {
      throw {
        status: '400',
        message: 'Invalid value of rating',
      };
    }
    return this.rateRepository.setRate(id, rating as IrateStates, observations);
  }
}
