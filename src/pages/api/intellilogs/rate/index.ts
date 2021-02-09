import nc from 'next-connect';
import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { rateController } from '@/intellilogs/package/rate/index';
import { WithDatabase } from '@/database';
import { WithAuth } from '@/middlewares';
import NextAdapter from '@/server/implementations/NextAdapter';

const nextAdapter = new NextAdapter(rateController);
const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(cors({}));
handler.use(WithDatabase());
// handler.use(WithAuth(handler));
handler.post((req: NextApiRequest, res: NextApiResponse) =>
  nextAdapter.execute(req, res)
);

export default handler;
