import nc from 'next-connect';
import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextAdapter } from '@/server/implementations/NextAdapter';
import { curadoriaRunController } from '@/boardCuradoria/package/curadoriaRun';
import { WithDatabase } from '@/database';
import { WithAuth } from '@/middlewares';

export const nextResolver = new NextAdapter(curadoriaRunController);

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(cors({}));
handler.use(WithDatabase());
handler.use(WithAuth(handler));

handler.post((req: NextApiRequest, res: NextApiResponse) => {
  nextResolver.execute(req, res);
});

export default handler;
