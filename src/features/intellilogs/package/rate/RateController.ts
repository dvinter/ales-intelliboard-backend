import IResponseResolverAdapter from '@/common/adapters/IResponseResolverAdapter';
import IController from '@/common/interfaces/IController';
import { IResponse } from '@/common/interfaces/IResponse';
import { NextApiRequest } from 'next';
import { RateUseCase } from './RateUseCase';

export class RateController implements IController {
  constructor(
    private rateUseCase: RateUseCase,
    private response: IResponseResolverAdapter
  ) {}

  async execute(req: NextApiRequest): Promise<IResponse> {
    const { id, rating, observations } = req.body;
    try {
      if (!id) return this.response.badRequestResponse('Missing id param');
      await this.rateUseCase.execute(id, rating, observations);
      return this.response.successResponse({});
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message || 'Unexpected Server Error',
      });
    }
  }
}
