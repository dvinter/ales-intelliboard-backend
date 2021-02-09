import jwt from 'jsonwebtoken';
import MissingParamError from '../errors/MissingParamError';
import { IJWTObject } from '../interfaces/IJwtObject';
import { ITokenGenerator } from '../interfaces/ITokenGenerator';

export class TokenGeneratorHelper implements ITokenGenerator {
  constructor(private secret?: string, private expiresIn?: string) {}

  async generate(params: IJWTObject): Promise<string> {
    if (!this.secret) {
      throw new MissingParamError('secret');
    }
    if (!params._id) {
      throw new MissingParamError('id');
    }
    if (!this.expiresIn) this.expiresIn = '12h';
    return jwt.sign(
      {
        email: params._id,
        isSupervisor: params.isSupervisor,
      },
      this.secret,
      { expiresIn: this.expiresIn }
    );
  }
}
