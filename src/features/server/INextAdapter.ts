import { NextApiRequest, NextApiResponse } from 'next';

export interface InextAdapter {
  execute(req: NextApiRequest, res: NextApiResponse): void;
}
