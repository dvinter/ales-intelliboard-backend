import { IAtendimentoDTO } from './AtendimentoDTO';
import { IAtendimentoRepository } from './repositories/IAtendimentoRepository';
import { Icontext } from '@/landingPage/package/messages/MessageDTO';

export class AtendimentoUseCase {
  constructor(private atendimentoRepository: IAtendimentoRepository) {}
  async execute(
    startDate: string,
    endDate: string,
    campaignData: boolean,
    campaignId?: string
  ): Promise<IAtendimentoDTO[]> {
    if (campaignData) {
      return this.atendimentoRepository.findCampaignInfos(
        startDate,
        endDate,
        campaignId
      );
    } else {
      const data = await this.atendimentoRepository.findByStartDateInterval(
        startDate,
        endDate
      );
      const parsedData = data.map((elem) => {
        elem.hasMisunderstood = elem.messages?.some((m) => m.misunderstood);

        const context =
          elem.messages && elem.messages[1]
            ? JSON.parse(elem.messages[1].context)
            : ({} as Icontext);

        elem.nome = context.nome ?? '';
        elem.matricula = context.matricula ?? '';
        delete elem.messages;

        return elem;
      });
      return parsedData;
    }
  }
}
