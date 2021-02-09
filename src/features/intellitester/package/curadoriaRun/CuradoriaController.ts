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
    const { nodeId, exampleId } = req.body;
    try {
      if (!nodeId && exampleId)
        return this.response.badRequestResponse('Missing node id param');

      const result:
        | ICuradoriaDTO[]
        | ICuradoriaDTO = await this.curadoriaUseCase.execute(
        nodeId,
        exampleId
      );
      return this.response.successResponse(result);
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message || 'Unexpected Server Error',
      });
    }
  }
}
