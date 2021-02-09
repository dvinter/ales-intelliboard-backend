import IController from '@/common/interfaces/IController';
import { NextApiRequest } from 'next';
import { MessagesUseCase } from './MessagesUseCase';
import { IMessagesDTO } from './MessagesDTO';
import IResponseResolverAdapter from '@/common/adapters/IResponseResolverAdapter';
import { IResponse } from '@/common/interfaces/IResponse';

export class MessageController implements IController {
  constructor(
    private messageUseCase: MessagesUseCase,
    private response: IResponseResolverAdapter
  ) {}

  async execute(req: NextApiRequest): Promise<IResponse> {
    const { id } = req.query;
    try {
      if (!id) return this.response.badRequestResponse('Missing id param');
      const messages: IMessagesDTO | null = await this.messageUseCase.execute(
        id.toString()
      );
      return this.response.successResponse(messages);
    } catch (error) {
      return this.response.successResponse({
        message: error.message || 'Unexpected Server Error',
      });
    }
  }
}
