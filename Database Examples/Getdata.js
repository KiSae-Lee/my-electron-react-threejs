// get into this directory in the terminal. Use node `.\GetData.js` command to execute and see the result.

const fs = require("fs");
const initSqlJs = require("sql.js")

const dbFileName = "./testdb.db"

initSqlJs().then(function (sql) {
    const db = new sql.Database(fs.readFileSync(dbFileName));
    let stmt = "select count(*) from Person";
    let res = db.exec(stmt);
    // console.log(res);

    // Example.
    // [                                        // this is an array.
    //     {                                    // this is a json.
    //         columns: [ 'count(*)' ],         // property in the json.
    //         values: [ [Array] ]              // property in the json.
    //     } 
    // ]
    //
    // Get first item in array,
    // `res[0]`
    // Obviously this array has only one item which is a json.
    // Use `res[0].values` to get value in "values".

    // console.log(res[0].values);

    // Example.
    // [                                        // this is an array.
    //     [ 2 ]                                // this is an array. which has "2" in there.
    // ]
    
    console.log(`Item count of Table Person is: ${res[0].values[0][0]}`);

    stmt = "select * from Person";
    res = db.exec(stmt);
    console.log(res)                           // Show scheme.
    console.log(res[0].values);                // Show values.
})