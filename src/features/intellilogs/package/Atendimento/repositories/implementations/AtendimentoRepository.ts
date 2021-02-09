import { IAtendimentoDTO } from '../../AtendimentoDTO';
import { Model } from 'mongoose';
import { IAtendimentoRepository } from '../IAtendimentoRepository';
import Dayjs from 'dayjs';
export class AtendimentoRepository implements IAtendimentoRepository {
  private timestamp = 'America/Sao_Paulo';
  constructor(private atendimentoModel: Model<IAtendimentoDTO>) {}

  private getAtendimentosCampaignPipe(start: Dayjs.Dayjs, end: Dayjs.Dayjs) {
    const match = {
      $match: {
        createdAt: {
          $gte: start.startOf('day').toDate(),
          $lte: end.endOf('day').toDate(),
        },
      },
    };
    const getCampaign = {
      $addFields: {
        campaign: {
          $arrayElemAt: [
            {
              $filter: {
                input: '$campaignUserContext',
                as: 'campaign',
                cond: {
                  $eq: ['$$campaign.key', 'campaignId'],
                },
              },
            },
            0,
          ],
        },
      },
    };
    const getCampaignId = {
      $addFields: {
        campaignId: {
          $toObjectId: '$campaign.value',
        },
      },
    };
    const getOnlyCampaignCalls = {
      $match: {
        campaignId: {
          $ne: null,
        },
      },
    };
    const groupById = {
      $group: {
        _id: '$campaignId',
      },
    };
    const lookUpCampaignsCollection = {
      $lookup: {
        from: 'campaigns',
        localField: '_id',
        foreignField: '_id',
        as: 'campaignInfos',
      },
    };
    const projectCreatedAt = {
      $project: {
        createdAt: '$campaignInfos.createdAt',
      },
    };
    return [
      match,
      getCampaign,
      getCampaignId,
      getOnlyCampaignCalls,
      groupById,
      lookUpCampaignsCollection,
      projectCreatedAt,
    ];
  }

  private getCampaignsInfosPipe(
    start: Dayjs.Dayjs,
    end: Dayjs.Dayjs,
    campaignId: string
  ) {
    const match = {
      $match: {
        createdAt: {
          $gte: start.startOf('day').toDate(),
          $lte: end.endOf('day').toDate(),
        },
      },
    };
    const getCampaign = {
      $addFields: {
        campaign: {
          $arrayElemAt: [
            {
              $filter: {
                input: '$campaignUserContext',
                as: 'campaign',
                cond: {
                  $eq: ['$$campaign.key', 'campaignId'],
                },
              },
            },
            0,
          ],
        },
      },
    };
    const filterByCampaignId = {
      $match: {
        'campaign.value': campaignId,
      },
    };
    const getCampaignId = {
      $addFields: {
        campaignId: {
          $toObjectId: '$campaign.value',
        },
      },
    };
    const lookUpCampaignsCollection = {
      $lookup: {
        from: 'campaigns',
        localField: '_id',
        foreignField: '_id',
        as: 'campaignInfos',
      },
    };
    const projectCampaignInfosAndMessage = {
      $project: {
        campaignUserContext: 1,
        createdAt: 1,
        updatedAt: 1,
        platform: 1,
        status: 1,
        user: 1,
        campaignInfos: {
          $arrayElemAt: ['$campaignInfos', 0],
        },
        messages: 1,
      },
    };
    return [
      match,
      getCampaign,
      filterByCampaignId,
      getCampaignId,
      lookUpCampaignsCollection,
      projectCampaignInfosAndMessage,
    ];
  }
  async findCampaignInfos(
    startDate: string,
    endDate: string,
    campaignId?: string
  ): Promise<IAtendimentoDTO[]> {
    const start = Dayjs(new Date(String(startDate)), 'America/Sao_Paulo');
    const end = Dayjs(new Date(String(endDate)), 'America/Sao_Paulo');
    const pipe: Array<Record<string, unknown>> = campaignId
      ? this.getCampaignsInfosPipe(start, end, campaignId)
      : this.getAtendimentosCampaignPipe(start, end);
    const atendimentos = (await this.atendimentoModel.aggregate(pipe)).map(
      (atendimento) => ({
        ...atendimento,
        createdAt: Dayjs(atendimento.createdAt?.[0], 'America/Sao_Paulo')
          .locale('pt-br')
          .format('L LTS'),
      })
    );
    return atendimentos;
  }
  async findByStartDateInterval(
    startDate: string,
    endDate: string,
    options: Record<string, unknown> = {}
  ): Promise<IAtendimentoDTO[]> {
    const start = Dayjs(new Date(startDate), this.timestamp);
    const end = Dayjs(new Date(endDate), this.timestamp);
    if (start.isValid() && end.isValid()) {
      return await this.atendimentoModel
        .find(
          {
            createdAt: {
              $gte: start.startOf('day').toDate(),
              $lte: end.endOf('day').toDate(),
            },
          },
          options
        )
        .lean();
    } else
      throw {
        status: 400,
        message: 'Invalid date format',
      };
  }
}
