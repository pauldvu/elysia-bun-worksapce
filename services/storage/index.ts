import { Elysia } from 'elysia';

//your elysia code / plugins
const service = new Elysia().get('/', async () => {
  console.log('[storage] handling reuest from internal service');
  return {
    buckets: [
      {
        id: '1',
        name: 'test',
        size: 100,
      },
      {
        id: '2',
        name: 'test2',
        size: 100,
      },
    ],
  };
});
//export types
export type StorageService = typeof service;
service.listen(
  {
    port: 3002,
  },
  s => {
    console.log('[ storage ] main app started http://localhost:3002');
  }
);
