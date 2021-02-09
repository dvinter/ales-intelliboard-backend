import { IJWTObject } from './IJwtObject';

export interface ITokenGenerator {
  generate(params: IJWTObject): Promise<string>;
}
