(() => ({}))();
// import { it, describe } from 'mocha';
// import request from 'supertest';
// import assert from 'assert';
// import handle from '@apis/intellilogs/atendimento/index';
// import { testClient } from './createServer.test';
// describe('search calls by interval tests /intellilogs/atendimento/', () => {
//   let client: request.SuperTest<request.Test>;
//   before(async () => {
//     client = await testClient(handle);
//   });
//   it('Missing endDate Param', async () => {
//     const response = await client.get('/').query({
//       startDate: '2020-12-01T14:34:15.116Z',
//     });
//     assert.deepStrictEqual(response.status, 400);
//   });
//   it('Missing startDate Param', async () => {
//     const response = await client.get('/').query({
//       endDate: '2020-12-09T14:34:15.116Z',
//     });
//     assert.deepStrictEqual(response.status, 400);
//   });
//   it('Missing startDate and EndDate Param', async () => {
//     const response = await client.get('/').query({});
//     assert.deepStrictEqual(response.status, 400);
//   });
//   it('Invalid Date Format (null string)!', async () => {
//     const response = await client.get('/').query({
//       startDate: '',
//       endDate: '',
//     });
//     assert.deepStrictEqual(response.status, 400);
//   });
//   it('Invalid Date Format (string or number)!', async () => {
//     const response = await client.get('/').query({
//       startDate: 'oi',
//       endDate: 123,
//     });
//     assert.deepStrictEqual(response.status, 400);
//   });
//   it('Check response type', async () => {
//     const response = await client.get('/').query({
//       startDate: new Date(),
//       endDate: new Date(),
//     });
//     assert.deepStrictEqual(response.body instanceof Array, true);
//   });
// });
