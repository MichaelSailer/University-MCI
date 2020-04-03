var db = null;

function openDB() {
  db = openDatabase(
    "myDB",
    "1.0",
    "Datenbankorientierte Systementwicklung",
    1 * 1024 * 1024
  );
}

function createTable(tx) {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS Kontakte(id, vorname, nachname)",
    [],
    SQLSuccess,
    SQLFail
  );
  console.log(tx);
}

function dropTable(tx) {
  tx.executeSql("DROP TABLE IF EXISTS Kontakte", [], SQLSuccess, SQLFail);
}

function SQLSuccess() {
  alert("Es war erfoglreich");
}
function SQLFail() {
  alert("Es war nicht erfoglreich");
}

function insertToContact(tx) {
  console.log(tx);
  tx.executeSql(
    "INSERT INTO Kontakte(id, vorname,nachname)  VALUES (1,Michael,Sailer) "
  );
}

function init() {
  openDB();
  db.transaction(createTable);
  console.log(db);
}
