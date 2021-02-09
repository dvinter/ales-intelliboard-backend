(() => ({}))();
// import { NextApiHandler } from 'next';
// import { apiResolver } from 'next/dist/next-server/server/api-utils';
// import { createServer } from 'http';
// import request from 'supertest';

// export const testClient = async (
//   handler: NextApiHandler,
//   { host = 'example.com' }: { host?: string } = {}
// ) =>
//   request(
//     createServer(async (req, res) => {
//       function paramsToObject(entries: any) {
//         const result: any = {};
//         for (const [key, value] of entries) {
//           result[key] = value;
//         }
//         return result;
//       }
//       req.headers.host = host;
//       return apiResolver(
//         req,
//         res,
//         paramsToObject(new URLSearchParams(req.url?.split('?')[1]).entries()),
//         handler,
//         {} as any,
//         false
//       );
//     })
//   );
