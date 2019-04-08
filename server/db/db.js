const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('../../hlr.sqlite3', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the hlr database.');
});
function getSubscribers(){
    return new Promise((resolve, reject) => {
      db.all(`SELECT id as id,
                            extension as name,
                            authorized as authorized
                     FROM Subscriber`, (err, rows) => {
              if (err) {
                console.error(err.message);
              }
              // console.log(rows);
              resolve(rows)
            })
    })
}
// module.exports.db=db;
module.exports.getSubscribers=getSubscribers;
