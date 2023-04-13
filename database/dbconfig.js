const path = require("path");
const isDev = require("electron-is-dev");
const Store = require("electron-store");

const store = new Store();

var dbFileName;

if (store.has("dbFileName")) {
  dbFileName = store.get("dbFileName")[0]; // store.get returns array.

  module.exports = dbFileName;
} else {
    if(isDev && process.argv.indexOf(`--noDevServer`) === -1){
        dbFileName = path.join(path.dirname(__dirname), "extra", "testdb.db");
    } else {
        dbFileName = path.join(process.resourcesPath, "extra", "testdb.db")
    }

    module.exports = dbFileName;
}
