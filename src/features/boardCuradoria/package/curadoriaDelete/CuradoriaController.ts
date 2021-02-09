import IController from '@/common/interfaces/IController';
import { NextApiRequest } from 'next';
import { CuradoriaUseCase } from './CuradoriaUseCase';
import IResponseResolverAdapter from '@/common/adapters/IResponseResolverAdapter';
import { IResponse } from '@/common/interfaces/IResponse';

export class MessageController implements IController {
  constructor(
    private curadoriaUseCase: CuradoriaUseCase,
    private response: IResponseResolverAdapter
  ) {}

  async execute(req: NextApiRequest): Promise<IResponse> {
    const { nodeId, exampleId } = req.query;
    try {
      if (!nodeId) return this.response.badRequestResponse('Missing id param');

      await this.curadoriaUseCase.execute(
        nodeId?.toString(),
        exampleId?.toString()
      );

      return this.response.noContentResponse();
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message || 'Unexpected Server Error',
      });
    }
  }
}
