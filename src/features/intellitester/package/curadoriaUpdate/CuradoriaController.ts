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
    const { id, expectedNode } = req.body;
    try {
      if (!id || !expectedNode)
        return this.response.badRequestResponse('Missing data');

      const message: ICuradoriaDTO | null = await this.curadoriaUseCase.execute(
        id,
        expectedNode
      );

      if (!message)
        return this.response.notFoundResponse({ message: 'Content not found' });

      return this.response.successResponse(message);
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message || 'Unexpected Server Error',
      });
    }
  }
}
