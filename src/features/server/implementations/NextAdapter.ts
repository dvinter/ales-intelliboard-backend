import IController from '@/common/interfaces/IController';
import { NextApiRequest, NextApiResponse } from 'next';
import { InextAdapter } from '../INextAdapter';

export class NextAdapter implements InextAdapter {
  constructor(private controller: IController) {}
  async execute(
    req: NextApiRequest,
    res: NextApiResponse<unknown>
  ): Promise<void> {
    const { statusCode, body, contentType } = await this.controller.execute(
      req
    );
    if (contentType) res.setHeader('content-type', contentType);

    return res.status(statusCode).send(body ?? {});
  }
}

export default NextAdapter;
