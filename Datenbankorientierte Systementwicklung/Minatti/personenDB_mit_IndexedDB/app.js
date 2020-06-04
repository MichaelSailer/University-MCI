var db;


function init() {
    if (typeof (indexedDB) == "undefined") {
        alert("You have to upgrade your browser");
    } else {

        transaction = indexedDB.open("PersonenDB", 2);

        transaction.onupgradeneeded = function (event) {
            console.log(event);
            db = event.target.result;
            if (!db.objectStoreNames.contains("Personen")) {
                objectStore = db.createObjectStore("Personen", {
                    autoIncrement: true
                })
            }
        }

        transaction.onsuccess = function (event) {
            console.log("Geöffnet");
            db = event.target.result;
            showData()
        }

        transaction.onerror = function (err) {
            console.log(err);
        }



    }

    function showData() {
        let daten = [];
        let row = "";
        row += "<th>";
        row = "<td>Vorname</td>";
        row += "<td>Nachname</td>";
        row += "<td>Gewicht</td>";
        row += "<td>Geburtstag</td>";
        row += "<td>Größe</td>";
        row += "<td>BMI</td>";
        row += "</th>";

        transaction = db.transaction(["Personen"], "readonly");
        store = transaction.objectStore("Personen");

        request = store.getAll();

        request.onerror = function (err) {
            console.log(err);
        }

        request.onsuccess = function (event) {
            let leng = event.target.result.length;
            for (let i = 0; i < leng; i++) {
                daten.push(event.target.result[i]);
            }

            for (let i = 0; i < daten.length; i++) {
                let data = daten[i];
                row += "<tr>";
                row += "<td>" + data.vorname + "</td>";
                row += "<td>" + data.nachname + "</td>";
                row += "<td>" + data.gewicht + "</td>";
                row += "<td>" + data.geburtstag + "</td>";
                row += "<td>" + data.groesse + "</td>";
                row += "<td>" + parseFloat(data.gewicht / Math.pow((data.groesse / 100), 2)).toFixed(2) + "</td>";
                row += "<td><button onclick='switchLocation(" + (i + 1) + ")' class='btn btn-outline-dark'>Bearbeiten</button></td>";
                row += "<td><button onclick='deleteLine(" + (i + 1) + ")' class='btn btn-outline-dark'>Löschen</button></td>";
                row += "</tr>";
            }
            document.getElementById("table").innerHTML = row;
        }
    }

}


function switchLocation(i) {
    window.location = "edit.html";
    sessionStorage.setItem("tochange", i);
}

function editLine() {
    transaction = indexedDB.open("PersonenDB", 2);

    transaction.onupgradeneeded = function (event) {
        console.log(event);
        db = event.target.result;
        if (!db.objectStoreNames.contains("Personen")) {
            objectStore = db.createObjectStore("Personen", {
                autoIncrement: true
            })
        }
    }

    transaction.onsuccess = function (event) {
        db = event.target.result;

        let i = sessionStorage.getItem("tochange")
        i = parseInt(i);
        console.log(i);


        transaction = db.transaction(["Personen"], "readonly");
        store = transaction.objectStore("Personen");

        request = store.get(i);
        request.onerror = function (err) {
            console.log(err)
        }

        request.onsuccess = function (event) {
            let res = event.target.result;
            if (res) {
                let singledate = res;
                document.getElementById("vorname").value = singledate.vorname;
                document.getElementById("nachname").value = singledate.nachname
                document.getElementById("gewicht").value = singledate.gewicht;
                document.getElementById("geburtstag").value = singledate.geburtstag;
                document.getElementById("groesse").value = singledate.groesse;
            }
        }

    }
}

function updateNewLine() {

    let i = sessionStorage.getItem("tochange");
    i = parseInt(i);

    let newData = {}

    newData.vorname = document.getElementById("vorname").value;
    newData.nachname = document.getElementById("nachname").value;
    newData.gewicht = document.getElementById("gewicht").value;
    newData.geburtstag = document.getElementById("geburtstag").value;
    newData.groesse = document.getElementById("groesse").value;


    transaction = db.transaction(["Personen"], "readwrite");
    store = transaction.objectStore("Personen");

    request = store.put(newData, i);

    request.onerror = function (err) {
        alert(err);
    }

    request.onsucces = function (event) {
        alert(event);
    }

    window.location = "index.html";
}

function deleteLine(i) {
    transaction = db.transaction(["Personen"], "readwrite");
    store = transaction.objectStore("Personen");

    request = store.delete(i);

    request.onerror = function (err) {
        alert(err);
    }

    request.onsucces = function (event) {
        alert(event);
    }

    init()
}


function saveData() {
    let daten = []

    let newData = {}
    newData.vorname = document.getElementById("vorname").value;
    newData.nachname = document.getElementById("nachname").value;
    newData.gewicht = document.getElementById("gewicht").value;
    newData.geburtstag = document.getElementById("geburtstag").value;
    newData.groesse = document.getElementById("groesse").value;


    transaction = db.transaction(["Personen"], "readwrite");
    store = transaction.objectStore("Personen");

    request = store.add(newData);

    request.onerror = function (e) {
        console.log(e);
    }

    request.onsuccess = function (ev) {
        console.log("Success");
    }

    localStorage.data = JSON.stringify(daten);
    init();
}


function searchUser() {

    let suchbegriff = document.getElementById("search").value;
    if (suchbegriff === "") {
        init()
    } else {
        let i = 0;

        let row = "";
        row += "<th>";
        row = "<td>Vorname</td>";
        row += "<td>Nachname</td>";
        row += "<td>Gewicht</td>";
        row += "<td>Geburtstag</td>";
        row += "<td>Größe</td>";
        row += "<td>BMI</td>";
        row += "</th>";

        transaction = db.transaction(["Personen"], "readwrite");
        store = transaction.objectStore("Personen");

        store.openCursor().onsuccess = function (event) {
            let cursor = event.target.result;
            if (cursor) {

                if (cursor.value.vorname === suchbegriff || cursor.value.nachname === suchbegriff) {

                    let data = cursor.value;

                    row += "<tr>";
                    row += "<td>" + data.vorname + "</td>";
                    row += "<td>" + data.nachname + "</td>";
                    row += "<td>" + data.gewicht + "</td>";
                    row += "<td>" + data.geburtstag + "</td>";
                    row += "<td>" + data.groesse + "</td>";
                    row += "<td>" + parseFloat(data.gewicht / Math.pow((data.groesse / 100), 2)).toFixed(2) + "</td>";
                    row += "<td><button onclick='switchLocation(" + (i + 1) + ")' class='btn btn-outline-dark'>Bearbeiten</button></td>";
                    row += "<td><button onclick='deleteLine(" + (i + 1) + ")' class='btn btn-outline-dark'>Löschen</button></td>";
                    row += "</tr>";
                    console.log(row);
                    i++;

                }
                cursor.continue();
            } else {
                console.log("Alles wird angezeigt");
            }

            document.getElementById("table").innerHTML = row;
        }
    }

}