/*
    Als Datenbank wird Indexeddb verwendet, die Datenbank speichert Daten von unserem Auto, die unsere Meinung 
    wichtig sind.

    Im JavaScript File technicalData.js wird erklärt welche Art von Objekt gespeichert wird. Wichtig hier ist:
    Das wir nur einen Datensatz speichert, weil es für uns keinen Sinn macht mehere Technische Daten von unseren
    Auto zu speichern, wenn es nur ein Auto gibt. Damit auch dieses Bedigung erfüllt wird, wird bevor ein neuer 
    Eintrag gespeichert werden soll, wird kontrolliert, ob es schon einen gibt oder ob er der einzige dann ist.


    Kurze Beschreibung zu den einzelnen Funktionen:
        *init():
            Bei Initialisierung der Index.html wird die Datenbank geladen und wenn es sie noch nicht gibt wird sie 
            erstellt. Egal ob sie schon gibt oder erst erstellen werden muss, werden die Datenbank aus der Datenbank
            gelesen
        * insertNewData():
            Wird beim Laden von AddData aufgerufen und Öffnen die Datenbank, um den Zugang zur Datenbank zu ermöglichen
        *saveData():
            Hier werden die Daten gespeichert, in dem die Werte aus der Eingabemaske gelesen werden und dann zu einem
            Objekt durch die Funktion der Klasse umgewandelt und diese Objekt wird dann in der Datenbank gespeichert.
        *getData():
            Diese Funktion holt alle Daten (was bei uns immer ein Datensatz ist) aus der Datenbank und wird 
            tabellarisch in der HTML Seite angezeigt. Wir wollten für die Darstellung immer das links der Name
            der Daten steht und rechts dann die Daten, deshalb der relativ große Code.
        *getUpdateData():
            Die Datenbank wird hier wieder geöffnet, sobald sie geöffnet wurde werden die Datenbank aus der 
            gelesen und in der Eingabemaske angezeigt. Damit ich gezielt auf die erste Zeile anspreche, haben
            wir uns dazu entschieden die Cursor Funktion zu verwenden, denn diese geht automatisch jeden einzelnen
            Datensatz in der Datenbank durch und zeigt auf die einzelen Daten. Das hat den Vorteil, wenn ich nicht 
            cursor.contunie() wird immer nur der erste Datensatz gelesen.
        *deleteData():
            Aufgrund, dass bei der Index.html Seite die Datenbank schon geöffnet ist, muss man hier sie nicht
            aufmachen. Und wie schon oben erklärt verwenden wir auch hier die Cursor Funktion, um genau einen 
            spezifischen Datensatz anzusprechen. Im diesen Fall den Datensatz mi der Id 0. Und nur dieser
            Datensatz wird dann auch gelöscht.
        *checkIfEmpty():
            Diese Funktion ist dafür da, um zu überprüfen ob schon ein Datensatz in der Datenbank vorhanden ist.
            Diese wird benötigt, um zu gewährleisten, dass nur ein einziger Datensatz in der Datenbank vorhanden ist.

    
        Unten finden Sie den Code mit der genaueren Erklärung für vielleicht unverständlichen Code.

*/

var db;

function init() {
    //Öffnen der Datenbank mit der Bezeichnung TechnischeDaten
    let transaction = indexedDB.open("TechnischeDaten", 3);

    //Wird aufgerufen, wenn die Datenbank noch nicht existiert
    transaction.onupgradeneeded = function (e) {

        //Initialisierung der Datenbank
        db = e.target.result;
        //Hier wird überprüft ob die Tabelle TechnischeDaten schon existiert, wenn nicht wird sie erstellt
        //und es wird ein automatische Key zur Eindeutigkeit erstellt. Der automatisch, bei neuen Eintrag um eins
        // erhöht wird
        if (!db.objectStoreNames.contains("TechnischeDaten")) {
            let store = db.createObjectStore("TechnischeDaten", {
                autoIncrement: true
            })
        }
    }

    //Wird aufgerufen, wenn die Datenbank schon besteht und die Verbindung erfolgreich war
    transaction.onsuccess = function (e) {
        //Initialisierung der Datenbank
        db = e.target.result;
        //Aufruf, um Daten anzuzeigen
        getData()
    }

    //Wird aufgerufen, wenn es einen Fehler bei der Verbindungen gab.
    transaction.onerror = function (err) {
        console.log(err.target.error);
    }

}


function insertNewData() {
    //Wie bei init() nur das bei den einzelen Funktionen anderes reagiert wird
    let transaction = indexedDB.open("TechnischeDaten", 3);

    transaction.onupgradeneeded = function (e) {
        db = e.target.result;
        if (!db.objectStoreNames.contains("TechnischeDaten")) {
            let store = db.createObjectStore("TechnischeDaten", {
                autoIncrement: true
            })
        }
    }

    transaction.onsuccess = function (e) {
        db = e.target.result;
    }

    transaction.onerror = function (err) {
        console.log(err.target.error);
    }
}

function saveData() {
    //Alle Daten aus der Eingabemaske werden eingelesen
    let hubraum = document.getElementById("hubraum").value;
    let baujahr = document.getElementById("baujahr").value;
    let höhstgeschwindigkeit = document.getElementById("höhstgeschwindigkeit").value;
    let schadstoffklassen = document.getElementById("schadenstoffklassen").value;
    let leergewicht = document.getElementById("leergewicht").value;
    let null_hundert = document.getElementById("null_hundert").value;
    let standgeräusch = document.getElementById("standgeräusch").value;
    let kraftstoff = document.getElementById("kraftstoff").value;

    //Die Klasse wird hier verwendet, um die Daten laut einer Vorlage zu speichern
    let technicalData = new TechischeDaten(0, baujahr, hubraum, leergewicht, null_hundert, standgeräusch, kraftstoff, schadstoffklassen, höhstgeschwindigkeit);

    // Umwandlung zu einen Objekt
    technicalData = technicalData.generateObject()

    // Es wird eine Transaktion zur Datenbank geöffnet, um Daten reinzuschreiben
    let transaction = db.transaction(["TechnischeDaten"], "readwrite");
    // Ein Store ist die Tabelle wo die Daten gespeichert werden
    let store = transaction.objectStore("TechnischeDaten");

    // Add Funktion, um die Daten zu speichern
    let request = store.add(technicalData);

    // Bei erfolg geht es wieder zurück zur Startseite
    request.onsuccess = function () {
        alert("Der Datensatz wurde hinzugefügt");
        window.location = "index.html";
    }
    // Bei einem Fehler wird eine Fehlermeldung auf die Konsoloe geschrieben
    request.onerror = function (err) {
        console.log(err.target.error);
    }

}


function getData() {

    //Starten einer Transaktion wo nur Daten gelesen werden, deshalb readonly
    let transaction = db.transaction(["TechnischeDaten"], "readonly");
    let store = transaction.objectStore("TechnischeDaten");

    // Cursor, um die auf die einzelnen Daten zuzugreifen
    store.openCursor().onsuccess = function (e) {
        //Zeigt den aktuellen Datensatz an
        let cur = e.target.result
        let htmlText = "<table class='table table-striped'>"

        if (cur) {
            // im Value ist dann das Objekt.
            let daten = cur.value;

            //Hier wird die Tabell als Text zusammengestellt. Für jeden einzelnen Daten wird eine neue 
            //Zeile erstellt. Um das Gefühl eines Zulassungsschein wieder zugeben
            htmlText += "<tr>"
            htmlText += "<th scope='row'><img src='../../icons/speed.svg' width=30px> </th>"
            htmlText += "<td><span></span>Höhstgeschwindigkeit</td>"
            htmlText += "<td>" + daten.hoehstgeschwindigkeit + " km/h</td>"
            htmlText += "</tr>"
            htmlText += "<tr>"
            htmlText += "<th scope='row'><img src='../../icons/class.svg' width=30px> </th>"
            htmlText += "<td>Schadstoffklassen</td>"
            htmlText += "<td>" + daten.schadsstoffeinstufung + "</td>"
            htmlText += "</tr>"
            htmlText += "<tr>"
            htmlText += "<th scope='row'><img src='../../icons/weight.svg' width=30px> </th>"
            htmlText += "<td>Leergewicht</td>"
            htmlText += "<td>" + daten.leergewicht + " kg</td>"
            htmlText += "</tr>"
            htmlText += "<tr>"
            htmlText += "<th scope='row'><img src='../../icons/zero_to.svg' width=30px> </th>"
            htmlText += "<td>Von Null auf Hundert</td>"
            htmlText += "<td>" + daten.null_bis_hundert + " Sekunden</td>"
            htmlText += "</tr>"
            htmlText += "<tr>"
            htmlText += "<th scope='row'><img src='../../icons/sound.svg' width=30px> </th>"
            htmlText += "<td>Standgeräusche</td>"
            htmlText += "<td>" + daten.standgeraeusch + " DB</td>"
            htmlText += "</tr>"
            htmlText += "<tr>"
            htmlText += "<th scope='row'><img src='../../icons/gas.svg' width=30px> </th>"
            htmlText += "<td>Kraftstoff</td>"
            htmlText += "<td>" + daten.kraftstoff + "</td>"
            htmlText += "</tr>"
            htmlText += "<tr>"
            htmlText += "<th scope='row'><img src='../../icons/zeit.svg' width=30px> </th>"
            htmlText += "<td>Baujahr</td>"
            htmlText += "<td>" + daten.baujahr + "</td>"
            htmlText += "</tr>"
            htmlText += "<tr>"
            htmlText += "<th scope='row'><img src='../../icons/motor.svg' width=30px> </th>"
            htmlText += "<td>Hubraum</td>"
            htmlText += "<td>" + daten.hubraum + " cm³</td>"
            htmlText += "</tr>"


        }

        htmlText += "</table>"
        document.getElementById("tabelle").innerHTML = htmlText
    }
}

function getUpdateData() {
    //Gleich wie bei Init() nur das bei den einzelen Funktionen anderes reagiert wird 
    let transaction = indexedDB.open("TechnischeDaten", 3);

    transaction.onupgradeneeded = function (e) {
        db = e.target.result;
        if (!db.objectStoreNames.contains("TechnischeDaten")) {
            let store = db.createObjectStore("TechnischeDaten", {
                autoIncrement: true
            })
        }
        showUpdateData()
    }

    transaction.onsuccess = function (e) {
        db = e.target.result;
        showUpdateData()
    }

    transaction.onerror = function (err) {
        console.log(err.target.error);
    }


}

function showUpdateData() {

    //Transaktion wird wieder geöffnet, um die Daten in die Eingabemaske einzutragen
    let transaction = db.transaction(["TechnischeDaten"], "readonly");
    let store = transaction.objectStore("TechnischeDaten");

    store.openCursor().onsuccess = function (e) {
        let cur = e.target.result

        if (cur) {
            //Hier werden dann die Werte in die Maske eingetragen.
            let daten = cur.value
            document.getElementById("hubraum").value = daten.hubraum
            document.getElementById("baujahr").value = daten.baujahr
            document.getElementById("leergewicht").value = daten.leergewicht
            document.getElementById("kraftstoff").value = daten.kraftstoff
            document.getElementById("null_hundert").value = daten.null_bis_hundert
            document.getElementById("schadenstoffklassen").value = daten.schadsstoffeinstufung
            document.getElementById("standgeräusch").value = daten.standgeraeusch
            document.getElementById("höhstgeschwindigkeit").value = daten.hoehstgeschwindigkeit
        }

    }

}


function updateData() {

    //Es wird wieder eine Trasaktion geöffnet und auf readwrite geset, weil man neue Daten in die 
    //Datenbank zu schreiben
    let transaction = db.transaction(["TechnischeDaten"], "readwrite");
    let store = transaction.objectStore("TechnischeDaten");

    // Es werden alle Daten die in der Eingabemaske eingetrage wurde ausgelesen
    let hubraum = document.getElementById("hubraum").value;
    let baujahr = document.getElementById("baujahr").value;
    let höhstgeschwindigkeit = document.getElementById("höhstgeschwindigkeit").value;
    let schadstoffklassen = document.getElementById("schadenstoffklassen").value;
    let leergewicht = document.getElementById("leergewicht").value;
    let null_hundert = document.getElementById("null_hundert").value;
    let standgeräusch = document.getElementById("standgeräusch").value;
    let kraftstoff = document.getElementById("kraftstoff").value;

    // Wieder mittels der Klasse zu einen Einheitliche Objekt geformt
    let technicalData = new TechischeDaten(0, baujahr, hubraum, leergewicht, null_hundert, standgeräusch, kraftstoff, schadstoffklassen, höhstgeschwindigkeit);

    // Hier wird es zu einen Objekt von der Klasse zurück gegeben
    technicalData = technicalData.generateObject()


    //Wieder mittels Cursor über alle Einträge einzeln drüber gegangen
    store.openCursor().onsuccess = function (e) {
        let cur = e.target.result
        if (cur) {
            //Wenn es einen Datensatz mit der ID 0 gibt werden diese Daten und nur diese Daten
            // mit den neuen Daten ausgetauscht
            if (cur.value.id == 0) {
                let request = cur.update(technicalData);
                //Bei erfolg gibt es eine Meldung und es geht wieder zurück zur Startseite
                request.onsuccess = function () {
                    alert("Daten wurden geändert!")
                    window.location = "./index.html"
                }
                request.onerror = function (err) {
                    console.log(err.target.error);
                }
            }
        }
    }

}


function deleteData() {
    // Eine Transaktion wird wieder geöffnet und weil man wieder was ändern will 
    // steht wieder readwrite. 
    let transaction = db.transaction(["TechnischeDaten"], "readwrite");
    let store = transaction.objectStore("TechnischeDaten");

    // Es wird wieder über jeden einzelnen Datensatz drüber gegangen
    store.openCursor().onsuccess = function (e) {
        let cur = e.target.result

        if (cur) {
            // Und es wird nur der Datensatz gelöscht der die ID 0 hat und der Rest, wenn 
            //einer da sein sollte bleibt.
            if (cur.value.id == 0) {
                let request = cur.delete()
                request.onsuccess = function () {
                    alert("Die Daten wurden gelöscht");
                    location.reload();
                }
                request.onerror = function (err) {
                    console.log(err.target.error);
                }
            }

        }
    }
}



function checkIfEmpty() {

    //Öffnen einer Transaktion, weil man nur die Anzahl überprüfen will muss man nur lesen (readonly)
    let transaction = db.transaction(["TechnischeDaten"], "readonly");
    let store = transaction.objectStore("TechnischeDaten");

    //Die Funktion ermöglicht jeden Datensatz von der Datenbank zu lesen
    // Wird benötigt, um die Anzahl rauszufinden.
    let request = store.getAll();

    request.onsuccess = function (e) {
        //Wenn das Objekt was man zurück bekommt nicht 0 ist kommt die Meldung, ansonten darf man den Datensatz 
        //speichern.
        if (e.target.result.length != 0) {
            alert("Es darf nur ein Datensatz bestehen, entweder löschen sie diesen oder updaten diesen")
        } else {
            saveData()
        }
    }

    //Bei einem Fehler kommt eine Meldung in die Konsole.
    request.onerror = function (err) {
        console.log(err.target.error);
    }


}