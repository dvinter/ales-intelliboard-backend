import nc from 'next-connect';
import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { messagesController } from '@/intellilogs/package/Messages';
import { WithDatabase } from '@/database';
import { WithAuth } from '@/middlewares';
import NextAdapter from '@/server/implementations/NextAdapter';

const nextAdapter = new NextAdapter(messagesController);
const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(cors({}));
handler.use(WithDatabase());
handler.use(WithAuth(handler));
handler.get((req: NextApiRequest, res: NextApiResponse) =>
  nextAdapter.execute(req, res)
);

export default handler;
