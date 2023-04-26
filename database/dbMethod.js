/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const initSqlJs = require('sql.js');
const dbFileName = require('./dbconfig');
// const log = require('electron-log');

// const RunSQL = (query) => {
//     return new Promise((resolve, reject) => {
//         Run(query, (res, error) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(res);
//             }
//         });
//     });
// };

const RunSQL = async (query) => {
    return new Promise((resolve, reject) => {
        initSqlJs().then(async (SQL) => {
            SQL.dbOpen = (databaseFileName) => {
                try {
                    return new SQL.Database(fs.readFileSync(databaseFileName));
                } catch (error) {
                    console.log('Cannot open database file.', error.message);
                    return null;
                }
            };

            let db = SQL.dbOpen(dbFileName);
            try {
                console.log(`RunSQL: try to run query: ${query}`);
                console.log(`RunSQL: BD: ${db}`);
                const res = await Run(db, query);
                console.log(`RunSQL: Complete! Result: ${res}`);
                const data = db.export();
                const buffer = new Buffer.from(data);
                fs.writeFileSync(dbFileName, buffer);
                resolve(res);
            } catch (error) {
                reject(error);
            }
        });
    });
};

const Run = (db, stmt) => {
    return new Promise((resolve, reject) => {
        try {
            const res = db.exec(stmt);
            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
};

// const Run = (stmt, callback) => {
//     initSqlJs().then((SQL) => {
//         SQL.dbOpen = function (databaseFileName) {
//             try {
//                 return new SQL.Database(fs.readFileSync(databaseFileName));
//             } catch (error) {
//                 console.log("Can't open database file.", error.message);
//                 return null;
//             }
//         };

//         let db = SQL.dbOpen(dbFileName);

//         try {
//             var res = db.exec(stmt);
//             const data = db.export();
//             const buffer = new Buffer.from(data);
//             fs.writeFileSync(dbFileName, buffer);
//             callback(res);
//         } catch (error) {
//             callback(error);
//         }
//     });
// };

// let _rowsFromSqlDataArray = function (object) {
//     let data = [];
//     let i = 0;
//     let j = 0;
//     for (let valueArray of object.values) {
//         data[i] = {};
//         j = 0;
//         for (let column of object.columns) {
//             Object.assign(data[i], { [column]: valueArray[j] });
//             j++;
//         }
//         i++;
//     }
//     return data;
// };

module.exports = { RunSQL };
