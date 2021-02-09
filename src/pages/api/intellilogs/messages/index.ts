import nc from 'next-connect';
import cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { messagesController as storeMessageController } from '@/intellilogs/package/StoreMessage';
import { WithDatabase } from '@/database';
import NextAdapter from '@/server/implementations/NextAdapter';

const nextAdapterStoreMessage = new NextAdapter(storeMessageController);
const handler = nc<NextApiRequest, NextApiResponse>();

handler.use(cors({}));
handler.use(WithDatabase());
// handler.use(WithAuth(handler, true));

handler.post((req: NextApiRequest, res: NextApiResponse) => {
  return nextAdapterStoreMessage.execute(req, res);
});

export default handler;
