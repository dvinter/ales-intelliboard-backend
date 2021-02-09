import IController from '@/common/interfaces/IController';
import { NextApiRequest } from 'next';
import { CuradoriaUseCase } from './CuradoriaUseCase';
import IResponseResolverAdapter from '@/common/adapters/IResponseResolverAdapter';
import { IResponse } from '@/common/interfaces/IResponse';
import { ITestResult } from './helper/ITester';

export class MessageController implements IController {
  constructor(
    private curadoriaUseCase: CuradoriaUseCase,
    private response: IResponseResolverAdapter
  ) {}

  async execute(req: NextApiRequest): Promise<IResponse> {
    const { text } = req.body;
    try {
      if (!text) return this.response.badRequestResponse('Missing text');

      const result: ITestResult = await this.curadoriaUseCase.execute(text);
      return this.response.successResponse(result);
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message || 'Unexpected Server Error',
      });
    }
  }
}
