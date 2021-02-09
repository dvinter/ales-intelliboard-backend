import nc from 'next-connect';
import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextAdapter } from '@/server/implementations/NextAdapter';
import { messageController } from '@/landingPage/package/messages/index';
import { WithDatabase } from '@/database';

export const nextResolver = new NextAdapter(messageController);

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(cors({}));
handler.use(WithDatabase());
handler.post((req: NextApiRequest, res: NextApiResponse) => {
  nextResolver.execute(req, res);
});

export default handler;
