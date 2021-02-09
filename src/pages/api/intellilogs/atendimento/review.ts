import nc from 'next-connect';
import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextAdapter } from '@/server/implementations/NextAdapter';
import { atendimentoController } from '@/intellilogs/package/Review';
import { WithDatabase } from '@/database';
import { WithAuth } from '@/middlewares';

export const nextResolver = new NextAdapter(atendimentoController);

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(cors({}));
handler.use(WithDatabase());
handler.use(WithAuth(handler));
handler.put((req: NextApiRequest, res: NextApiResponse) => {
  nextResolver.execute(req, res);
});

export default handler;
