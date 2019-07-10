import { freezeDeps } from './';

describe('freezeDeps', () => {
  it('dependencies to be frozen', () => {
    const packageJSON = {
      dependencies: {
        a: '^1.2.3',
        b: '~1.2.3',
        c: '1.2.3'
      }
    };
    const packageLock = {
      dependencies: {
        a: {
          version: '1.4.2'
        },
        b: {
          version: '1.2.6'
        },
        c: {
          version: '1.2.3'
        }
      }
    };

    expect(freezeDeps(packageJSON, packageLock)).toEqual({
      dependencies: {
        a: '1.4.2',
        b: '1.2.6',
        c: '1.2.3'
      }
    });
  });
});
