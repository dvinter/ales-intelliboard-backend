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
    const { newData, alteredFields } = req.body;
    try {
      if (!newData) return this.response.badRequestResponse('Missing data');
      const updatedItem: ICuradoriaDTO = await this.curadoriaUseCase.execute(
        newData,
        alteredFields
      );
      return this.response.successResponse(updatedItem);
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message || 'Unexpected Server Error',
      });
    }
  }
}
