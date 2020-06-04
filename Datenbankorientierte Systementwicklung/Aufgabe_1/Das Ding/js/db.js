function getConnection() {
    return openDatabase("DasDing", "1.0", "DasDing", 1 * 1024 * 1024);
}

function createTableAuto() {
    let db = getConnection();
    sql = "CREATE TABLE IF NOT EXISTS Auto(fahrzeugid integer,name varchar(100),baujahr varchar(60),farbe varchar(60),technischeDatenID integer, PRIMARY KEY(fahrzeugid), FOREIGN KEY (technischeDatenID) REFERENCES TechnischeDaten(technischeDatenID))";
    db.transaction(tx => {
        tx.executeSql(sql,[],Success,(tx,err) =>{
            Failure(err)
        });
    });
}

function createTableTechnischeDaten(){
    let db= getConnection()
    sql = "CREATE TABLE IF NOT EXISTS TechnischeDaten(technischeDatenID integer,antrieb varchar(60),zylinderzahl integer,hubraum double,ps integer,drehmoment integer,antriebsart varchar(60), verbrennungsverfahren varchar(60), getriebe integer, type varchar(100), türen integer, sitze integer, abmaße varchar(50),kofferraumvolumen integer, leergewicht integer, gesamtgewicht integer, zuladung integer, beschleunigung double, maxGeschwindigkeit integer, standsound integer, fahrsound integer, kraftstoff varchar(40), tankvolumen integer, reichweite integer, co2Austoss integer, schadestoffeinstufung varchar(30), effizientklasse varchar(4), PRIMARY KEY(technischeDatenID))";
    db.transaction(tx => {
        tx.executeSql(sql,[],Success,(tx,err) => {
            Failure(err)
        });
    });
}

function Success() {

}

function Failure(err) {
    alert(err.message);
    console.log(err)
}

function dropTableAuto(){
    let db = getConnection();
    sql = "DROP TABLE IF EXISTS AUTO";
    db.transaction(tx => {
        tx.executeSql(sql, [],Success,(tx,err) => {
            Failure(err)
        });
    })
}

function dropTableTechnischeDaten(){
    let db = getConnection();
    sql = "DROP TABLE IF EXISTS TechnischeDaten";
    db.transaction(tx => {
        tx.executeSql(sql, [],Success, (tx,err) => {
            Failure(err);
        })
    })
}

function addAutoData(){
    let fahrzeugid = 1234;
    let name = "David";
    let baujahr = "2013";
    let farbe  = "Blau";
    let technischeDatenID = 2;
    let db = getConnection()
    sql = "INSERT INTO AUTO(fahrzeugid,name,baujahr,farbe,technischeDatenID) VALUES(?,?,?,?,?)";
    db.transaction(tx =>{
        tx.executeSql(sql,[fahrzeugid,name,baujahr,farbe,technischeDatenID], 
            (tx,result) => {
                alert(result.message);
            }),
            (tx,err) => {
                alert(err.message);
            }
    });
}


function inputTechnischeDaten(){
    let technischeDatenID = 2;
    let antrieb = "vorne";
    let zylinderzahl = 4;
    let hubraum = 123.5;
    let ps = 70;
    let drehmoment = 10;
    let antriebsart = "Vorne2";
    let verbrennungsverfahren = "Volle geil";
    let getriebe = 4;
    let type = "Geländefahrzeug";
    let türen = 4;
    let sitze = 5;
    let abmaße ="100 x 50x30";
    let kofferraumvolumen = 100;
    let leergewicht = 1500;
    let gesamtgewicht = 22000;
    let zuladung = 450;
    let beschleunigung = 70.7;
    let maxGeschwindigkeit = 170;
    let standsound = 60;
    let fahrsound = 100;
    let kraftstoff = "Benzin";
    let tankvolumen = 100;
    let reichweite = 1400;
    let co2Austoss = 50;
    let schadestoffeinstufung = "Euro 5";
    let effizientklasse = "B";

    return [technischeDatenID,antrieb,zylinderzahl,hubraum,ps,drehmoment,antriebsart,verbrennungsverfahren,getriebe,type,türen,sitze,abmaße,kofferraumvolumen,leergewicht,gesamtgewicht,zuladung,beschleunigung,maxGeschwindigkeit,standsound,fahrsound,kraftstoff,tankvolumen,reichweite,co2Austoss,schadestoffeinstufung,effizientklasse];
}

function addTechnischeDatenToDB(){
    let db = getConnection()
    sql = "INSERT INTO TechnischeDaten VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    db.transaction(tx =>{
        tx.executeSql(sql,inputTechnischeDaten(), 
            (tx,result) => {
                alert(result.message);
            }),
            (tx,err) => {
                alert(err.message);
            }
    });
}

function getAutoData(){
    let autos = []
    let db = getConnection()
    sql = "SELECT * FROM AUTO" ;
    db.transaction(tx => {
        tx.executeSql(sql,[], (tx,result) => {
            let length = result.rows.length;
            for(let i =0; i< length; i++){
                daten = {
                    fahrzeugid:result.rows[i].fahrzeugid,
                    name:result.rows[i].name,
                    baujahr:result.rows[i].baujahr,
                    farbe:result.rows[i].farbe,
                    technischeDatenID:result.rows[i].technischeDatenID
                }
                sessionStorage.autoDaten = JSON.stringify(daten);
            }
        },(tx,err) => {
            console.log(err.message)
        })
    })
    autos.push(JSON.parse(sessionStorage.autoDaten));
    return autos[0]
}

function getTechnischeData(){
    let technischeDaten = []
    let db = getConnection()
    sql = "SELECT * FROM TechnischeDaten" ;
    db.transaction(tx => {
        tx.executeSql(sql,[], (tx,result) => {
            let length = result.rows.length;
            for(let i =0; i< length; i++){
                daten =  {
                technischeDatenID: result.rows[i].technischeDatenID,
                antrieb : result.rows[i].antrieb,
                zylinderzahl : result.rows[i].zylinderzahl,
                hubraum : result.rows[i].hubraum,
                ps : result.rows[i].ps,
                drehmoment : result.rows[i].drehmoment,
                antriebsart : result.rows[i].antriebsart,
                verbrennungsverfahren : result.rows[i].verbrennungsverfahren,
                getriebe : result.rows[i].getriebe,
                type : result.rows[i].type,
                türen : result.rows[i].türe,
                sitze : result.rows[i].sitze,
                abmaße : result.rows[i].abmaße,
                kofferraumvolumen : result.rows[i].kofferraumvolumen,
                leergewicht : result.rows[i].leergewicht,
                gesamtgewicht : result.rows[i].gesamtgewicht,
                zuladung : result.rows[i].zuladung,
                beschleunigung : result.rows[i].beschleunigung,
                maxGeschwindigkeit : result.rows[i].maxGeschwindigkeit,
                standsound : result.rows[i].standsound,
                fahrsound : result.rows[i].fahrsound,
                kraftstoff : result.rows[i].kraftstoff,
                tankvolumen : result.rows[i].tankvolumen,
                reichweite : result.rows[i].reichweite,
                co2Austoss : result.rows[i].co2Austoss,
                schadestoffeinstufung : result.rows[i].schadestoffeinstufung,
                effizientklasse : result.rows[i].effizientklasse
                }
                return daten;
            }
            console.log(technischeDaten[0])
        },(tx,err) => {
            console.log(err.message)
        })
    })
}




console.log( getTechnischeData())