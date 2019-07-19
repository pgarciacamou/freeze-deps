import { freezeDeps } from '..';

function toLockFile(versions) {
  let lock = { dependencies: {} };
  for (let prop in versions) {
    lock.dependencies[prop] = {
      version: versions[prop]
    };
  }
  return lock;
}

function setup() {
  const versions = {
    a: '^1.2.3',
    b: '~1.2.3',
    c: '1.2.3'
  };
  const actualVersions = {
    a: '1.4.2',
    b: '1.2.6',
    c: '1.2.3'
  };
  return {
    versions,
    actualVersions,
    packageJSON: {
      dependencies: { ...versions },
      devDependencies: { ...versions }
    },
    packageLock: toLockFile(actualVersions)
  };
}

describe('freezeDeps', () => {
  var packageJSON;
  it('should freeze dependencies', () => {
    const { packageJSON, packageLock, versions, actualVersions } = setup();

    expect(freezeDeps(packageJSON, packageLock)).toEqual({
      dependencies: { ...actualVersions },
      devDependencies: { ...versions }
    });
  });

  it('should freeze devDependencies', () => {
    const { packageJSON, packageLock, versions, actualVersions } = setup();

    expect(
      freezeDeps(packageJSON, packageLock, { jsonProp: 'devDependencies' })
    ).toEqual({
      dependencies: { ...versions },
      devDependencies: { ...actualVersions }
    });
  });
});
