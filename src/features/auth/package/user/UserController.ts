import IController from '@/common/interfaces/IController';
import { NextApiRequest } from 'next';
import { UserUseCase } from './UserUseCase';
import { IUserDTO } from './UserDTO';
import IResponseResolverAdapter from '@/common/adapters/IResponseResolverAdapter';
import { IResponse } from '@/common/interfaces/IResponse';

export class MessageController implements IController {
  constructor(
    private userUseCase: UserUseCase,
    private response: IResponseResolverAdapter
  ) {}

  async execute(req: NextApiRequest): Promise<IResponse> {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return this.response.badRequestResponse('Missing param');
      }

      const result: IUserDTO | null = await this.userUseCase.createUser(
        email,
        password
      );

      if (!result) {
        return this.response.badRequestResponse('Email already exists');
      }

      return this.response.noContentResponse();
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message || 'Unexpected Server Error',
      });
    }
  }
}
