const fs = require("fs");
const initSqlJs = require("sql.js");

const dbFileName = require("./dbconfig");

const log = require('electron-log');

const GetData = (query) => {
  return new Promise((resolve, reject) => {
    FindAll(query, (res, error) => {
      if(error) reject(error);
      else resolve(res);
    })
  })
}

const FindAll = (stmt, callback) => {
  initSqlJs().then((SQL) => {
    SQL.dbOpen = function (databaseFileName) {
      try {
        return new SQL.Database(fs.readFileSync(databaseFileName));
      } catch (error) {
        log.warn("Can't open database file.", error.message);
        return null;
      }
    };

    let db = SQL.dbOpen(dbFileName);
    log.info(`DB Path: ${dbFileName}`);
    var res = db.exec(stmt);

    if (res.length === 0) callback([{ error: "No Data found!" }]);
    else {
      res = _rowsFromSqlDataArray(res[0]);
      callback(res);
      db.close();
    }
  });
}

let _rowsFromSqlDataArray = function (object) {
  let data = [];
  let i = 0;
  let j = 0;
  for (let valueArray of object.values) {
    data[i] = {};
    j = 0;
    for (let column of object.columns) {
      Object.assign(data[i], { [column]: valueArray[j] });
      j++;
    }
    i++;
  }
  return data;
};

module.exports = {GetData};