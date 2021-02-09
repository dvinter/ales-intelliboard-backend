import { NextApiRequest } from 'next';
import { IJWTObject } from '@/auth/package/auth/interfaces/IJwtObject';

export interface IextendedRequest extends NextApiRequest {
  user: IJWTObject;
}
