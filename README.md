# Mono Repo

importing and exporting multiple type defiitions from elysia

Using bun workspaces

The example is rudimentary; I made it bery quickly for a discord chat

As note for anybody buildin with bun you can prevent any possible leak by setting your builds to exclude elysia, and any other code that you want to keep on the server.

const artifacts = Bun.build({
//...rest of build config
naming: `${hash}/[name].[ext]`,
external: ['bun', 'typebox', 'elysia'],
});

No typebox/ elysia code will be bundled, one method to ensure that you don't accidentally leak server code if you're using react-dom ssr.
