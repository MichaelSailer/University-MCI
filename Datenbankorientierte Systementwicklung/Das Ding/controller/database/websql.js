var db = null;

function SQLSuccess(){
    console.log("Success");
}
function SQLFail(){
    console.log("Fail");
}


function openDB(){
    db = openDatabase(
        "Technische Daten",
        "1.0",
        "Das Ding",
        1*1024*1024
    )
}

function createDatabase(tx){
    let sql = "CREATE TABLE IF NOT EXISTS TechnischeDaten(";
    sql += "techNr integer NOT NULL PRIMARY KEY AUTOINCREMENT,hubraum integer,baujahr integer,höhstgeschwindigkeit integer,schadstoffklasse varchar(10),leergewicht integer,null_hundert float,standgeräusche integer,kraftstoff varchar(20)";
    sql += ")";
    tx.executeSql(
        sql,
        [],
        SQLSuccess,
        SQLFail
    );
}
function saveData(tx){
    //Alle Daten aus der Eingabemaske werden eingelesen
    let hubraum = document.getElementById("hubraum").value;
    let baujahr = document.getElementById("baujahr").value;
    let höhstgeschwindigkeit = document.getElementById("höhstgeschwindigkeit").value;
    let schadstoffklassen = document.getElementById("schadenstoffklassen").value;
    let leergewicht = document.getElementById("leergewicht").value;
    let null_hundert = document.getElementById("null_hundert").value;
    let standgeräusch = document.getElementById("standgeräusch").value;
    let kraftstoff = document.getElementById("kraftstoff").value;
}

openDB();
db.transaction(createDatabase);