export function createDb() {
  return new Promise((resolve, reject) => {
    var db_name = "progress";
    var db_version = "1.0";
    var db_describe = "prog";
    var db_size = 2048;
    var db = openDatabase(
      db_name,
      db_version,
      db_describe,
      db_size,
      function (db) {
        console.log(db);
        console.log(
          "Database opened Successfully! Or created for the first time !"
        );
        resolve(db);
      }
    );
    if (db) {
      resolve(db);
    }
  });
}

function createTable(db) {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (tx) {
        tx.executeSql(
          "create table chords(id int primary key , root text, name text, notes text, inversion int, response int, duedate int, interval int, repetition int, efactor float, ts int)",
          [],
          function (transaction, result) {
            resolve(result);
            console.log("Table created Successfully!");
          },
          function (transaction, error) {
            reject(error);
          }
        );
      },
      transError,
      transSuccess
    );
  });
}

function query(str, db, values = []) {
  return new Promise((resolve, reject) => {
    db.transaction(
      function (tx) {
        tx.executeSql(
          str,
          values,
          function (transaction, result) {
            resolve(result.rows);
          },
          function (transaction, error) {
            reject(error);
          }
        );
      },
      transError,
      transSuccess
    );
  });
}
function transError(t, e) {
  // console.log(t);
  // console.log(e);
  // console.error("Error occured ! Code:" + e.code + " Message : " + e.message);
}

function transSuccess(t, r) {
  // console.info("Transaction completed Successfully!");
  // console.log(t);
  // console.log(r);
}

export async function init(data) {
  var db = await createDb();
  var res = await query(
    `SELECT name FROM sqlite_master WHERE type='table' AND name='chords';`,
    db
  );
  if (res && res.length > 0 && res[0].name === "chords") {
    return db;
  }
  await createTable(db);
  res = await Promise.all(
    _.flatten(
      _.map(data, (d, i) => {
        var notes = _.split(d.notes, " ");
        return _.map(notes, (n, ii) =>
          query(`insert into chords values (?,?,?,?,?,?,?,?,?,?,?)`, db, [
            i * 10 + ii,
            d.root,
            d.name,
            [n, ..._.filter(notes, (nn) => nn !== n)].join(" "),
            ii,
            null,
            null,
            0,
            0,
            2.5,
            null,
          ])
        );
      })
    )
  );
  return db;
}

export async function reset() {
  var db = await createDb();
  await query("drop table chords", db);
}

export async function get(names, maxInversion, db) {
  const DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;
  const today = Math.floor(new Date().getTime() / DAY_IN_MILISECONDS);
  return query(
    `select * from chords where name in (${_.join(
      _.map(names, (n) => `'${n}'`, ",")
    )}) and inversion <= ${maxInversion} and duedate <= ${today} and ts is not null order by ts asc`,
    db
  );
}

export async function getNew(names, maxInversion, db) {
  return query(
    `select * from chords where name in (${_.join(
      _.map(names, (n) => `'${n}'`, ",")
    )}) and inversion <= ${maxInversion} and duedate is null order by inversion asc`,
    db
  );
}

export async function update(id, interval, repetition, efactor, db) {
  const DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;
  const now = new Date().getTime();
  const today = Math.floor(now / DAY_IN_MILISECONDS);
  return query(
    `update chords set duedate='${
      today + interval
    }', repetition=${repetition}, efactor=${efactor}, ts=${now} where id = ${id}`,
    db
  );
}
