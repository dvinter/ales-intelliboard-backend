import IResponseResolverAdapter from '@/common/adapters/IResponseResolverAdapter';
import IController from '@/common/interfaces/IController';
import { IResponse } from '@/common/interfaces/IResponse';
import { NextApiRequest } from 'next';
import { Icontext } from './MessageDTO';
import { MessageUseCase } from './MessageUseCase';
import { UserInput } from './services/IAssistantService';

export class MessageController implements IController {
  constructor(
    private messageUseCase: MessageUseCase,
    private response: IResponseResolverAdapter
  ) {}

  async execute(req: NextApiRequest): Promise<IResponse> {
    const {
      input,
      context,
      initialMessage,
    }: {
      input?: UserInput;
      context?: Icontext;
      initialMessage: boolean;
    } = req.body;
    try {
      if (!input)
        return this.response.badRequestResponse('Missing input param');
      const data = await this.messageUseCase.execute(
        input,
        context,
        initialMessage
      );
      return this.response.successResponse(data);
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message || 'Unexpected Server Error',
      });
    }
  }
}
