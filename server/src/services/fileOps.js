import * as fs from 'fs';

export const readFileSync = (path, options) => {
  return fs.readFileSync(path, options);
};
