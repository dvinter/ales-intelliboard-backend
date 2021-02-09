// import { it, describe } from 'mocha';
// import request from 'supertest';
// import assert from 'assert';
// import handle from '@apis/intellilogs/rate/index';
// describe('add rating on calls /api/intellilogs/rate', () => {
//   let client: request.SuperTest<request.Test>;
//   before(async () => {
//     client = await testClient(handle);
//   });
//   it('Missing id Param', async () => {
//     const response = await client.post('/').send({});
//     assert.deepStrictEqual(response.status, 400);
//   });
//   it('id is empty', async () => {
//     const response = await client.get('/').query({
//       id: '',
//     });
//     assert.deepStrictEqual(response.status, 400);
//   });
//   it('rating is empty', async () => {
//     const response = await client.get('/').query({
//       id: '123',
//       rating: '',
//     });
//     assert.deepStrictEqual(response.status, 400);
//   });
//   it('Invalid rating value', async () => {
//     const response = await client.get('/').query({
//       id: '',
//       rating: '123',
//     });
//     assert.deepStrictEqual(response.status, 400);
//   });
//   it('Invalid rating value', async () => {
//     const response = await client.get('/').query({
//       id: '',
//       rating: '123',
//     });
//     assert.deepStrictEqual(response.status, 400);
//   });
  
// });
