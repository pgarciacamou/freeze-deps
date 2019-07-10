import jsonfile from 'jsonfile';
import fs from 'fs';

function fileExists(path) {
  try {
    if (fs.existsSync(path)) {
      return true;
    }
  } catch (err) {
    return false;
  }
}

export function freezeDeps(jsonPath, lockPath, options = {}) {
  if (!fileExists(jsonPath)) {
    throw new Error(
      `File package.json not found, file path received: ${jsonPath}`
    );
  }

  if (!fileExists(lockPath)) {
    throw new Error(
      `File package-lock.json not found, file path received: ${lockPath}`
    );
  }

  const packageJSON = jsonfile.readFileSync(jsonPath);
  const packageLock = jsonfile.readFileSync(lockPath);
  const newJSON = { ...packageJSON };

  for (let dependencyName in packageJSON.dependencies) {
    const currentDep = packageLock.dependencies[dependencyName];

    // Skip dependencies not found in package-lock because we can't assume
    // whether the version specified in the package.json is correct or not.
    if (!currentDep) {
      continue;
    }

    newJSON.dependencies[dependencyName] = currentDep.version;
  }

  jsonfile.writeFile(jsonPath, newJSON, { spaces: 2 }, function(err) {
    if (err) console.error(err);
  });
}

// Check if module is executed in the terminal or imported into another node module.
if (require.main === module) {
  const program = require('commander');
  const jsonDefaultPath = `${process.env.PWD}/package.json`;
  const lockDefaultPath = `${process.env.PWD}/package-lock.json`;

  program
    .version('0.1.0')
    // .usage('[OPTIONS]...')
    .option('-j, --json [value]', 'Set package.json path', jsonDefaultPath)
    .option('-l, --lock [value]', 'Set package-lock.json path', lockDefaultPath)
    .parse(process.argv);

  freezeDeps(program.json, program.lock);
} else {
  // Ran as a node module
}
