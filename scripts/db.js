export function createDb() {
  var db = new Dexie("chords");

    db.version(1).stores({
      progress: `
        id,
        name,
        duedate,
        inversion,
        common`,
    });

    return db;
}

export async function init(allChords) {
  var db = await createDb();
  
  const res = await db.progress.toArray();
  if (res && res.length > 0) {
    return db;
  }
  const data = _.flatten(
    _.map(allChords, (d, i) => {
      var notes = _.split(d.noteNames, " ");
      return _.map(notes, (n, ii) =>
        ({
          id: i * 10 + ii,
          root: d.name.split(" ")[0],
          name: d.name,
          abbr: d.abbv,
          notes: [n, ..._.filter(notes, (nn) => nn !== n)].join(" "),
          inversion: ii,
          common: d.common,
          response: null,
          duedate: null,
          interval: 0,
          repetition: 0,
          efactor: 2.5,
          ts: null,
        }))
    })
);
  await db.progress.bulkPut( data )
  return db;
}

export async function reset() {
  var db = await createDb();
  await db.progress.where("id").above(-1).delete();
}

export async function get(names, maxInversion, db, today) {
  const DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;
  today = today || Math.floor(new Date().getTime() / DAY_IN_MILISECONDS);
  return db.progress.where("name").anyOf(names).and(f=>f.inversion<=maxInversion && f.duedate<=today && f.ts!==null).sortBy("ts")
}

export async function getNew(names, maxInversion, common, db) {
  const q = db.progress.where("name").anyOf(names).and(f=>f.inversion<=maxInversion && f.duedate===null)
  if(common){
    return q.toArray(a => a.sort((a,b) => a.common < b.common ? -1 : a.common > b.common ? 1 :
    a.inversion < b.inversion ? -1 : a.inversion > b.inversion ? 1 : 0));
  }
  return q.sortBy("inversion");
}

export async function update(id, interval, repetition, efactor, db, today) {
  const DAY_IN_MILISECONDS = 24 * 60 * 60 * 1000;
  const now = new Date().getTime();
  today = today || Math.floor(now / DAY_IN_MILISECONDS);
  
  return db.progress.update(id, {
    duedate: today + interval,
    interval: interval,
    repetition: repetition,
    efactor: efactor, 
    ts: now,
  })
}
