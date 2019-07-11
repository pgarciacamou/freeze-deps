import jsonfile from 'jsonfile';
import fs from 'fs';

export function fileExists(path) {
  try {
    if (fs.existsSync(path)) {
      return true;
    }
  } catch (err) {
    return false;
  }
}

export function readJSON(file) {
  if (!fileExists(file)) {
    throw new Error(`File not found. Path received: ${file}`);
  }
  return jsonfile.readFileSync(file);
}

export function writeJSON(file, obj, cb = err => err && console.error(err)) {
  return jsonfile.writeFile(file, obj, { spaces: 2 }, cb);
}

export function freezeDeps(packageJSON, packageLock, options = {}) {
  let newJSON = { ...packageJSON };

  for (let dependencyName in packageJSON.dependencies) {
    const currentDep = packageLock.dependencies[dependencyName];

    // Skip dependencies not found in package-lock because we can't assume
    // whether the version specified in the package.json is correct or not.
    if (!currentDep) {
      continue;
    }

    newJSON.dependencies[dependencyName] = currentDep.version;
  }

  return newJSON;
}

// Check if module is executed in the terminal or imported into another node module.
if (require.main === module) {
  const program = require('commander');
  const defaults = {
    jsonPath: `${process.env.PWD}/package.json`,
    lockPath: `${process.env.PWD}/package-lock.json`
  };

  program
    .version('0.3.0')
    // .usage('[OPTIONS]...')
    .option('-j, --json [value]', 'Set package.json path', defaults.jsonPath)
    .option(
      '-l, --lock [value]',
      'Set package-lock.json path',
      defaults.lockPath
    )
    .parse(process.argv);

  const packageJSON = readJSON(program.json);
  const packageLock = readJSON(program.lock);

  const newJSON = freezeDeps(packageJSON, packageLock);

  writeJSON(program.json, newJSON);
} else {
  // Ran as a node module
}
