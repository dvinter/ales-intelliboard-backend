import IResponseResolverAdapter from '@/common/adapters/IResponseResolverAdapter';
import IController from '@/common/interfaces/IController';
import { IextendedRequest } from '@/common/interfaces/IRequest';
import { IResponse } from '@/common/interfaces/IResponse';
import { AuthUseCase } from './AuthUseCase';
export class AuthController implements IController {
  constructor(
    private authUseCase: AuthUseCase,
    private response: IResponseResolverAdapter
  ) {}
  async execute(req: IextendedRequest): Promise<IResponse> {
    if (!process.env.JWT_KEY) {
      return this.response.internalServerErrorResponse('Missing JWT KEY');
    }
    if (!req.user?._id) {
      return this.response.badRequestResponse('Missing id param');
    }
    const {
      token,
      readOnly,
    }: {
      token: string;
      readOnly: boolean | undefined;
    } = await this.authUseCase.login(req.user);
    return this.response.successResponse({
      token,
      readOnly,
    });
  }
}
