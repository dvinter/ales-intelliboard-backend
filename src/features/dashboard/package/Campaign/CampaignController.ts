import IController from '@/common/interfaces/IController';
import { NextApiRequest } from 'next';
import { CampaignUseCase } from './CampaignUseCase';
import { ICampaignDTO } from './CampaignDTO';
import IResponseResolverAdapter from '@/common/adapters/IResponseResolverAdapter';
import dayjs from 'dayjs';
import { IResponse } from '@/common/interfaces/IResponse';

export class CampaignController implements IController {
  constructor(
    private campaignUseCase: CampaignUseCase,
    private response: IResponseResolverAdapter
  ) {}

  async execute(req: NextApiRequest): Promise<IResponse> {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return this.response.badRequestResponse(
        'Missing startDate or endDate param'
      );
    }
    const [start, end] = [
      dayjs(new Date(startDate.toString()), 'America/Sao_Paulo'),
      dayjs(new Date(endDate.toString()), 'America/Sao_Paulo'),
    ];
    if (!(start.isValid() && end.isValid())) {
      return this.response.badRequestResponse(
        'Invalid startDate or EndDate value'
      );
    }
    try {
      const campaigns: ICampaignDTO[] = await this.campaignUseCase.execute(
        start,
        end
      );
      return this.response.successResponse(campaigns);
    } catch (error) {
      return this.response.successResponse({
        message: error.message || 'Unexpected Server Error',
      });
    }
  }
}
