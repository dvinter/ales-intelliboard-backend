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
    const { id } = req.query;
    try {
      const item:
        | ICuradoriaDTO
        | ICuradoriaDTO[]
        | null = await this.curadoriaUseCase.execute(id?.toString());
      return this.response.successResponse(item);
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message || 'Unexpected Server Error',
      });
    }
  }
}
