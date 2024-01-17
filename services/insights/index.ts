import { Elysia } from 'elysia';
import { StorageService } from 'storage';
import { edenTreaty } from '@elysiajs/eden';

//eden treaty is just fetch
const serviceApi = edenTreaty<StorageService>('http://localhost:3002', {
  //**Auth credentials etc */
});

type StorageSchema = StorageService['schema']; //do something with your schema

//your elysia code / plugins
const service = new Elysia().get('/', async () => {
  //calling another service
  // await serviceApi.storage.buckets.get();
  console.log('[inissghts] handling reuest from internal service');
  return {
    metrics: {
      cpu: 0.5,
      memory: 0.5,
      disk: 0.5,
      network: 0.5,
    },
  };
});

export type InsightsService = typeof service;

service.listen(
  {
    port: 3001,
  },
  s => {
    console.log('[ insights ] main app started http://localhost:3001');
  }
);
