import { Elysia } from 'elysia';
import type { InsightsService } from 'insights'; //type import only
import type { StorageService } from 'storage'; //type import only
import { aplugin } from 'plugin'; //import a plugin internally
import { edenTreaty } from '@elysiajs/eden';

//assuming that you have microservices hosted on different deplyoments , switch out the urls, and authorize accordingly
const service = edenTreaty<StorageService>('http://localhost:3002');

const insights = edenTreaty<InsightsService>('http://localhost:3001');

//alternatively do something with your schemas
type StorageSchema = StorageService['schema'];
type InsightsSchedma = InsightsService['schema'];

const mainApp = new Elysia({}).use(aplugin).get('/', async () => {
  //
  const insightsRes = await insights.get();
  const storageRes = await service.get();

  return {
    insights: insightsRes,
    storage: storageRes,
  };
});

mainApp.listen(
  {
    port: 3000,
  },
  s => {
    console.log('[ main ] main app started http://localhost:3000');
  }
);
export type MainApp = typeof mainApp;
