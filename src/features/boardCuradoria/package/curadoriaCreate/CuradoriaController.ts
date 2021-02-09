import IController from '@/common/interfaces/IController';
import { NextApiRequest } from 'next';
import { CuradoriaUseCase } from './CuradoriaUseCase';
import { ICuradoriaDTO } from './CuradoriaDTO';
import IResponseResolverAdapter from '@/common/adapters/IResponseResolverAdapter';
import { IResponse } from '@/common/interfaces/IResponse';

export class MessageController implements IController {
  constructor(
    private curadoriaUseCase: CuradoriaUseCase,
    private response: IResponseResolverAdapter
  ) {}

  async execute(req: NextApiRequest): Promise<IResponse> {
    const { newData } = req.body;
    try {
      if (!newData) return this.response.badRequestResponse('Missing data');
      const createdItem: ICuradoriaDTO | null = await this.curadoriaUseCase.execute(
        newData
      );
      return this.response.successResponse(createdItem);
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message || 'Unexpected Server Error',
      });
    }
  }
}
