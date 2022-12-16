import { access, mkdir } from 'fs';
import { dirname } from 'path';

const isExists = path => {
    try {
      access(path);
      return true;
    } catch {
      return false;
    }
};
  
const makeDir = filePath => {
    try {
        const dirName = dirname(filePath);
        const exist = isExists(dirName);
        if (!exist) {
            mkdir(dirName, { recursive: true }, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Directory created successfully!')
            });
        }
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
  makeDir,
}