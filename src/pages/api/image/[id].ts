import nc from 'next-connect';
import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { imageController } from '@/images/package/images';
import { WithDatabase } from '@/database';
import NextAdapter from '@/server/implementations/NextAdapter';

const nextAdapter = new NextAdapter(imageController);
const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(cors({}));
handler.use(WithDatabase());
handler.get((req: NextApiRequest, res: NextApiResponse) =>
  nextAdapter.execute(req, res)
);

export default handler;
