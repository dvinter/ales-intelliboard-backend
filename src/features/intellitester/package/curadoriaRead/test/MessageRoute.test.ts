// import { it, describe } from 'mocha';
// import request from 'supertest';
// import assert from 'assert';
// import handle from '@apis/intellilogs/messages/[id]';
// import { testClient } from './createServer.test';
// describe('search calls by id tests /api/intellilogs/messages/[id]', () => {
//   let client: request.SuperTest<request.Test>;
//   before(async () => {
//     client = await testClient(handle);
//   });
//   it('Missing id Param', async () => {
//     const response = await client.get('/').query({});
//     assert.deepStrictEqual(response.status, 400);
//   });
//   it('id is empty', async () => {
//     const response = await client.get('/').query({
//       id: '',
//     });
//     assert.deepStrictEqual(response.status, 400);
//   });
// });
