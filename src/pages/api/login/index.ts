import nc from 'next-connect';
import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { authController } from '@/auth/package/auth';
import { WithDatabase } from '@/database';
import { WithAuth } from '@/middlewares/index';
import { IextendedRequest } from '@/common/interfaces/IRequest';
import NextAdapter from '@/server/implementations/NextAdapter';

const nextAdapter = new NextAdapter(authController);

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(cors({}));
handler.use(WithDatabase(process.env.MONGODB_STRING_CONNECTION));
handler.use(WithAuth(handler, true));
handler.post((req: IextendedRequest, res: NextApiResponse) => {
  return nextAdapter.execute(req, res);
});

export default handler;
