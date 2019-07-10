# freeze-deps

> Using package-lock.json, determine the current installed version of the dependencies and replace it in package.json with the exact version.

[![NPM](https://img.shields.io/npm/v/freeze-deps.svg)](https://www.npmjs.com/package/freeze-deps) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


E.g.
```bash
# package.json
{ dependencies: { react: "^16.0.0" } }

# package-lock.json
{ dependencies: { react: { version: "16.1.0" } } }

# result package.json
{ dependencies: { react: "16.1.0" } }
```

I created this module to avoid manually having to freeze dependencies for big JS apps.

Because there is no restriction towards how the developers of a certain package handle versioning, projects can easily break if one dependency upgrades a minor or patch but should have been a major.

I intended this module to be used on big projects where refactoring based on a small dependency can consume serious resources.

## Usage

### Terminal

```bash
# Default (takes package.json and package-lock.json from the current root directory).
npx freeze-deps

# Optional pass arguments
npx freeze-deps -j <path/to/package.json> -l <path/to/package-lock.json>
npx freeze-deps -json <path/to/package.json> -lock <path/to/package-lock.json>
```

Alternatively

```bash
npm install -g freeze-deps
freeze-deps <args>
```

### Node

```bash
npm install --save freeze-deps
```

```js
import { freezeDeps } from 'freeze-deps';

const pathToPackageJSON = "...";
const pathToPackageLockJSON = "...";

try {
  freezeDeps(pathToPackageJSON, pathToPackageLockJSON);
} catch (ex) {
  console.error(ex);
}
```

## Next

1. Instead of freezing to an exact version, add another argument that allow adding a patch ("~") prefix. E.g. from the example at the top, `"react": "~16.1.0"`.
2. Allow changing not only dependencies but peer and dev dependencies.

## License

MIT © [pgarciacamou](https://github.com/pgarciacamou)
