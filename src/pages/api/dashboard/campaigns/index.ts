import nc from 'next-connect';
import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextAdapter } from '@/server/implementations/NextAdapter';
import { campaignController } from '@/dashboard/package/Campaign/index';
import { WithDatabase } from '@/database';
import { WithAuth } from '@/middlewares';

export const nextResolver = new NextAdapter(campaignController);

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(cors({}));
handler.use(WithDatabase());
handler.use(WithAuth(handler));
handler.get((req: NextApiRequest, res: NextApiResponse) => {
  nextResolver.execute(req, res);
});

export default handler;
