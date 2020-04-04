function getConnection() {
    return openDatabase("DasDing", "1.0", "DasDing", 1 * 1024 * 1024);
}


function createTable() {
    let db = getConnection();
    sql = "CREATE TABLE IF NOT EXISTS Auto(fahrzeugid integer,name varchar(100),baujahr varchar(60),farbe varchar(60),technischeDatenID integer, PRIMARY KEY(fahrzeugid))";
    db.transaction(tx => {
        tx.executeSql(sql,[],Success,Failure);
    });
}

function Success() {
    alert("NICE");
}

function Failure() {
    alert("NOT SO NICE");
}

function dropTable(){
    let db = getConnection();
    sql = "DROP TABLE AUTO";
    db.transaction(tx => {
        tx.executeSql(sql, [],Success,Failure);
    })
}

createTable()
