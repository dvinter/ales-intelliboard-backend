import IResponseResolverAdapter from '@/common/adapters/IResponseResolverAdapter';
import IController from '@/common/interfaces/IController';
import { IResponse } from '@/common/interfaces/IResponse';
import { NextApiRequest } from 'next';
import { IAtendimentoDTO } from './AtendimentoDTO';
import { AtendimentoUseCase } from './AtendimentoUseCase';

export class AtendimentoController implements IController {
  constructor(
    private AtendimentoUseCase: AtendimentoUseCase,
    private response: IResponseResolverAdapter
  ) {}

  async execute(req: NextApiRequest): Promise<IResponse> {
    const { startDate, endDate, campaign } = req.query;
    try {
      if (!startDate || !endDate)
        return this.response.badRequestResponse('Missing Params');
      const Atendimentos: Array<IAtendimentoDTO> = await this.AtendimentoUseCase.execute(
        startDate.toString(),
        endDate.toString(),
        Boolean(campaign && campaign !== 'Todas'),
        campaign?.toString()
      );
      return this.response.successResponse(Atendimentos);
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message ?? 'Unexpected Server error',
      });
    }
  }
}
