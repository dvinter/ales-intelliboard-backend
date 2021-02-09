import { Dayjs } from 'dayjs';
import { ICampaignDTO } from './CampaignDTO';
import { ICampaignRepository } from './repositories/ICampaignRepository';
export class CampaignUseCase {
  constructor(private campaignRepository: ICampaignRepository) {}
  async execute(start: Dayjs, end: Dayjs): Promise<ICampaignDTO[]> {
    return this.campaignRepository.findByAtendimentoInterval(start, end);
  }
}
