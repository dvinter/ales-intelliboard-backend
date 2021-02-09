import { ICampaignDTO } from '../../CampaignDTO';
import { Model } from 'mongoose';
import { ICampaignRepository } from '../ICampaignRepository';
import dayjs, { Dayjs } from 'dayjs';
export class CampaignRepository implements ICampaignRepository {
  constructor(private campaignModel: Model<ICampaignDTO>) {}
  async findByAtendimentoInterval(
    start: Dayjs,
    end: Dayjs
  ): Promise<ICampaignDTO[]> {
    const campaigns: ICampaignDTO[] = (
      await this.campaignModel
        .find(
          {
            createdAt: {
              $gte: start.startOf('day').toString(),
              $lte: end.endOf('day').toString(),
            },
          },
          {
            _id: 1,
            createdAt: 1,
          }
        )
        .lean()
    )
      .sort(
        (
          a: Pick<ICampaignDTO, 'createdAt'>,
          b: Pick<ICampaignDTO, 'createdAt'>
        ) => {
          return Number(b.createdAt) - Number(a.createdAt);
        }
      )
      .map((e: Pick<ICampaignDTO, 'createdAt'>) => ({
        ...e,
        createdAt: dayjs(e.createdAt, 'America/Sao_Paulo')
          .locale('pt-br')
          .format('DD/MM/YYYY HH:mm'),
      }));
    return campaigns;
  }
}
