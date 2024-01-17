import { Elysia } from 'elysia';

export const aplugin = new Elysia({ name: 'awesome' }).onBeforeHandle(() => {
  console.log(`[A Plugin]: I'm an internal plugin`);
  console.log('[A Plugin]: I run before a get request');
});
