import { join, dirname } from 'path';
import isDev from 'electron-is-dev';
import Store from 'electron-store';

const store = new Store();

var dbFileName;

if (store.has('dbFileName')) {
    dbFileName = store.get('dbFileName')[0]; // store.get returns array.

    module.exports = dbFileName;
} else {
    if (isDev && process.argv.indexOf(`--noDevServer`) === -1) {
        dbFileName = join(dirname(__dirname), 'extra', 'testdb.db');
    } else {
        dbFileName = join(process.resourcesPath, 'extra', 'testdb.db');
    }

    module.exports = dbFileName;
}
