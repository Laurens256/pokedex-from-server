const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db/pokemon.db', (err: { message: any }) => {
	if (err) {
		console.error(err.message);
	}
	console.log('Connected to the chinook database.');
});

db.serialize(() => {
	db.each(`SELECT PlaylistId as id,
					Name as name
			 FROM playlists`, (err: any, row: any) => {
	  if (err) {
		console.error(err.message);
	  }
	  console.log(row.id + "\t" + row.name);
	});
  });
  
  db.close((err: any) => {
	if (err) {
	  console.error(err.message);
	}
	console.log('Close the database connection.');
  });

db.close();

export default db;
