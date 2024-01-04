# Typebox

A fork of typebox for instant deploys

Changes
Added `type` to ValueError to fix a bun module resoltuion issue when using workspaces

```tsx filePath={/Users/paulvu/reachsocial/pkgs/typebox/src/compiler/compiler.ts}
export {type ValueError, ValueErrorType, ValueErrorIterator} from '../errors/index';
```
