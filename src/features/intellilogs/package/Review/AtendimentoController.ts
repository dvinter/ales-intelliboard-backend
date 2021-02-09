import IResponseResolverAdapter from '@/common/adapters/IResponseResolverAdapter';
import IController from '@/common/interfaces/IController';
import { IResponse } from '@/common/interfaces/IResponse';
import { NextApiRequest } from 'next';
import { AtendimentoUseCase } from './AtendimentoUseCase';

export class AtendimentoController implements IController {
  constructor(
    private AtendimentoUseCase: AtendimentoUseCase,
    private response: IResponseResolverAdapter
  ) {}

  async execute(req: NextApiRequest): Promise<IResponse> {
    const { id, reviewed } = req.body;
    try {
      if (!id || reviewed === undefined)
        return this.response.badRequestResponse('Missing Params review');

      await this.AtendimentoUseCase.execute(id, reviewed);
      return this.response.successResponse({});
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message ?? 'Unexpected Server error',
      });
    }
  }
}
