import nc from 'next-connect';
import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextAdapter } from '@/server/implementations/NextAdapter';
import { curadoriaController as curadoriaCreateController } from '@/boardCuradoria/package/curadoriaCreate';
import { curadoriaController as curadoriaReadController } from '@/boardCuradoria/package/curadoriaRead';
import { curadoriaController as curadoriaUpdateController } from '@/boardCuradoria/package/curadoriaUpdate';
import { curadoriaController as curadoriaDeleteController } from '@/boardCuradoria/package/curadoriaDelete';
import { WithDatabase } from '@/database';
import { WithAuth } from '@/middlewares';

export const nextResolverCreate = new NextAdapter(curadoriaCreateController);
export const nextResolverRead = new NextAdapter(curadoriaReadController);
export const nextResolverUpdate = new NextAdapter(curadoriaUpdateController);
export const nextResolverDelete = new NextAdapter(curadoriaDeleteController);

const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(cors({}));
handler.use(WithDatabase());
handler.use(WithAuth(handler));

handler.post((req: NextApiRequest, res: NextApiResponse) => {
  nextResolverCreate.execute(req, res);
});

handler.get((req: NextApiRequest, res: NextApiResponse) => {
  nextResolverRead.execute(req, res);
});

handler.put((req: NextApiRequest, res: NextApiResponse) => {
  nextResolverUpdate.execute(req, res);
});

handler.delete((req: NextApiRequest, res: NextApiResponse) => {
  nextResolverDelete.execute(req, res);
});

export default handler;
