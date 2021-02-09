import nc from 'next-connect';
import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextAdapter } from '@/server/implementations/NextAdapter';
import { curadoriaRunController } from '@/intellitester/package/curadoriaRun';
import { curadoriaUpdateController } from '@/intellitester/package/curadoriaUpdate';
import { curadoriaController as curadoriaReadController } from '@/intellitester/package/curadoriaRead';
import { WithDatabase } from '@/database';
import { WithAuth } from '@/middlewares';

export const nextResolverRun = new NextAdapter(curadoriaRunController);
export const nextResolverUpdate = new NextAdapter(curadoriaUpdateController);
export const nextResolverRead = new NextAdapter(curadoriaReadController);

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(cors({}));
handler.use(WithDatabase());
handler.use(WithAuth(handler));

handler.post((req: NextApiRequest, res: NextApiResponse) => {
  nextResolverRun.execute(req, res);
});

handler.put((req: NextApiRequest, res: NextApiResponse) => {
  nextResolverUpdate.execute(req, res);
});

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  nextResolverRead.execute(req, res);
});

export default handler;
