import { IJWTObject } from './interfaces/IJwtObject';
import { ITokenGenerator } from './interfaces/ITokenGenerator';
import { IAuthRepository } from './repository/IAuthRepository';

export class AuthUseCase {
  constructor(
    private tokenGenerator: ITokenGenerator,
    private authRepository: IAuthRepository
  ) {}
  async login(
    params: IJWTObject
  ): Promise<{
    token: string;
    readOnly: boolean | undefined;
  }> {
    const token = await this.tokenGenerator.generate(params);
    const user = await this.authRepository.findOneAndUpdate(
      params?._id ?? '',
      token
    );
    return {
      token,
      readOnly: user?.readOnly,
    };
  }
}
