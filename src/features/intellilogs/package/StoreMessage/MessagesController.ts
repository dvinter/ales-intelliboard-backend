import IController from '@/common/interfaces/IController';
import { NextApiRequest } from 'next';
import { MessagesUseCase } from './MessagesUseCase';
import IResponseResolverAdapter from '@/common/adapters/IResponseResolverAdapter';
import { IResponse } from '@/common/interfaces/IResponse';

export class MessageController implements IController {
  constructor(
    private messageUseCase: MessagesUseCase,
    private response: IResponseResolverAdapter
  ) {}

  async execute(req: NextApiRequest): Promise<IResponse> {
    const { msg, id, context, misunderstood = false } = req.body;
    try {
      if (!id || !msg)
        return this.response.badRequestResponse('Missing id param');

      await this.messageUseCase.execute(id, msg, context, misunderstood);

      return this.response.successResponse({});
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message || 'Unexpected Server Error',
      });
    }
  }
}
