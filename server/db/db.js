const sqlite3 = require('sqlite3').verbose();

function getSubscribers(){
  let db = new sqlite3.Database('../../hlr.sqlite3', (err) => {
    if (err) {
      console.error(err.message);
    }
    // console.log('Connected to the hlr database.');
  });
    return new Promise((resolve, reject) => {
      db.all(`SELECT id as id,
                            extension as name,
                            authorized as authorized
                     FROM Subscriber`, (err, rows) => {
              db.close()
              if (err) {
                console.error(err.message);
              }
              // console.log(rows);
              resolve(rows)
            })
    })
}
function activateSubscriber(id){
  let db = new sqlite3.Database('../../hlr.sqlite3', (err) => {
    if (err) {
      console.error(err.message);
    }
    // console.log('Connected to the hlr database.');
  });
    return new Promise((resolve, reject) => {
        let data = [id];
        let sql = `UPDATE Subscriber
                    SET authorized = 1
                    WHERE id = ?`;

        db.run(sql, data, function(err) {
          db.close()
          if (err) {
            resolve(err.message);
          }
          resolve(`Row(s) updated: ${this.changes}`);
        });
    })
}
// module.exports.db=db;
module.exports.getSubscribers=getSubscribers;
module.exports.activateSubscriber=activateSubscriber;
