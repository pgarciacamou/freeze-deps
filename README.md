# freeze-deps

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors) [![NPM](https://img.shields.io/npm/v/freeze-deps.svg)](https://www.npmjs.com/package/freeze-deps) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Using package-lock.json, determine the current installed version of the dependencies and replace it in package.json with the exact version.

I created this module to avoid manually having to freeze dependencies in `package.json` for big JS apps. Currently, there is no restriction towards how the developers of a certain package handle versioning, projects can easily break if one dependency upgrades a minor or patch but should have been a major. I intended this module to be used on big projects where refactoring based on a small dependency can consume serious resources.

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

#### Options

You can get this list by running `npx freeze-deps --help`.

<table>
  <tr>
    <td>-V, --version</td>
    <td>output the version number</td>
  </tr>
  <tr>
    <td>-j, --json [value]</td>
    <td>Set package.json path (default: "< root dir >/package.json")</td>
  </tr>
  <tr>
    <td>-l, --lock [value]</td>
    <td>Set package-lock.json path (default: "< root dir >/package-lock.json")</td>
  </tr>
  <tr>
    <td>-h, --help</td>
    <td>output usage information</td>
  </tr>
</table>

### Node

```bash
npm install --save freeze-deps
```

```js
import { freezeDeps } from 'freeze-deps';

const packageJSON = {
  dependencies: {}
};
const packageLock = {
  dependencies: {}
};

try {
  const newPackageJSON = freezeDeps(packageJSON, packageLock);
} catch (ex) {
  console.error(ex);
}
```

### Example

```bash
# project-root-dir/package.json
{ dependencies: { react: "^16.0.0" } }

# project-root-dir/package-lock.json
{ dependencies: { react: { version: "16.1.0" } } }

npx freeze-deps
# same as: npx freeze-deps -j ./package.json -l ./package-lock.json
# 
# project-root-dir/package.json
{ dependencies: { react: "16.1.0" } }
```

## Next

1. Instead of freezing to an exact version, add another argument that allow adding a patch ("~") prefix. E.g. from the example at the top, `"react": "~16.1.0"`.
2. Allow changing not only dependencies but peer and dev dependencies.
3. Allow passing json formatting arguments. E.g. "spaces".
4. Add a way to run this with yarn-lock.json
5. Add whitelist and blacklist arguments to skip certain packages or only update certain packages. This could be done with regexp.
6. Allow changing some packages to ^, others to ~, etc. Although this could be done with separate commands using a whitelist and a prefix argument.

## License

MIT © [pgarciacamou](https://github.com/pgarciacamou)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://www.pgarciacamou.dev"><img src="https://avatars3.githubusercontent.com/u/8354571?v=4" width="100px;" alt="Pablo Garcia"/><br /><sub><b>Pablo Garcia</b></sub></a><br /><a href="https://github.com/pgarciacamou/freeze-deps/commits?author=pgarciacamou" title="Code">💻</a> <a href="https://github.com/pgarciacamou/freeze-deps/commits?author=pgarciacamou" title="Documentation">📖</a> <a href="https://github.com/pgarciacamou/freeze-deps/commits?author=pgarciacamou" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
