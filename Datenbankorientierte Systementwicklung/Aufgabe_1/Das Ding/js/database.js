
var db;


function createTableAuto() {
    let transaction = indexedDB.open("DasDing", 2);

    transaction.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains("Auto")) {
            store = db.createObjectStore("Auto", {
                autoIncrement: true
            });

        }
    }

    transaction.onsuccess = function (event) {
        db = event.target.result;
        getDaten()
    }
    transaction.onerror = function (err) {
        console.log(err);
    }
}


function addNew() {
    let transaction = indexedDB.open("DasDing", 2);

    transaction.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains("Auto")) {
            store = db.createObjectStore("Auto", {
                autoIncrement: true
            });

        }
        saveDaten();
    }

    transaction.onsuccess = function (event) {
        db = event.target.result;
        saveDaten();
    }
    transaction.onerror = function (err) {
        console.log(err);
    }
}

function saveDaten() {
    //Die neuen Daten werden angelegt
    
    car = new Car("Hans","Grüm",2012)
    let newData = {
        namen: document.getElementById("name").value,
        baujahr: document.getElementById("baujahr").value,
        farbe: document.getElementById("farbe").value
    }

    transaction = db.transaction(["Auto"], "readwrite");
    let store = transaction.objectStore("Auto");

    let request = store.add(newData);

    request.onsuccess = function () {
        console.log("Daten wurden angelegt");
        window.location = "../database.html"
    }

    request.onerror = function (err) {
        alert(err);
    }

}

function getDaten() {
    transaction = db.transaction(["Auto"], "readonly");
    let store = transaction.objectStore("Auto");

    let request = store.getAll();

    request.onsuccess = function (event) {
        console.log(event.target.result);
        showDaten(event.target.result);

    }
    request.onerror = function (err) {
        alert(err);
    }
}

function showDaten(daten) {

    document.getElementById("buttons").style.visibility = "visible";
    let tabelle = document.getElementById("dbTabelle");
    let htmlText = "<table>";
    htmlText += "<tr>";
    htmlText += "<th>Name</td>";
    htmlText += "<th>Baujahr</td>";
    htmlText += "<th>Farbe</td>";
    htmlText += "</tr>";


    for (let i = 0; i < daten.length; i++) {
        htmlText += "<tr>";
        htmlText += "<td>" + daten[i].namen + "</td>";
        htmlText += "<td>" + daten[i].baujahr + "</td>";
        htmlText += "<td>" + daten[i].farbe + "</td>";
        htmlText += "</tr>";
    }

    htmlText += "</table>"
    tabelle.innerHTML = htmlText;
}

function createAdmin() {
    transaction = indexedDB.open("Admin", 1);

    transaction.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains("AdminVerwaltung")) {
            store = db.createObjectStore("AdminVerwaltung", {
                autoIncrement: true
            });

        }

    }

    transaction.onsuccess = function (event) {
        db = event.target.result;
        let isLoggedIn = sessionStorage.getItem("HasLogged");
        if (isLoggedIn) {
            hideLogin()
            createTableAuto()
        }
        let adminCreated = sessionStorage.getItem("AdminIsCreated");
        console.log(adminCreated + " Status");
        if (!adminCreated) {
            insertAdmin();
            sessionStorage.setItem("adminIsCreated", true);
        }

    }
    transaction.onerror = function (err) {
        alert(err);
    }
}

function insertAdmin() {
    let admin = {
        adminName: "Michael",
        password: "1234"
    }

    console.log(db);
    transaction = db.transaction(["AdminVerwaltung"], "readwrite");
    let store = transaction.objectStore("AdminVerwaltung");

    let request = store.add(admin);

    request.onsuccess = function (event) {
        console.log(event)

    }
    request.onerror = function (err) {
        console.log(err);
    }



}

function deleteAdmin() {
    transaction = db.transaction(["AdminVerwaltung"], "readwirte");
    let store = transaction.objectStore("AdminVerwaltung");
    let request = store.delete(2);

    request.onsuccess = function (event) {
        console.log(event);
    }
    request.onerror = function (err) {
        console.log(err);
    }
}

async function checkPassword() {

    let pwInput = document.getElementById("pw").value;
    transaction = db.transaction(["AdminVerwaltung"], "readonly");
    let store = transaction.objectStore("AdminVerwaltung");
    let request = store.get(1);

    request.onsuccess = function (event) {
        console.log(event.target.result);
        if (pwInput === event.target.result.password) {
            hideLogin()
            createTableAuto()
            sessionStorage.setItem("HasLogged", true);
        }
    }
    request.onerror = function (err) {
        console.log(err);
    }
}



function hideLogin() {
    let loginForm = document.getElementById("login");
    loginForm.style.visibility = "hidden";
}

function datenLöschen() {
    let form = document.getElementById("form");
    form.style.visibility = "visible";
    form.style.height = "400px";
    let btn_delete = document.getElementById("btn_Entry")
    btn_delete.innerText = "Löschen";
    btn_delete.setAttribute("onclick", "deleteEntry()");
    document.getElementById("NLable").innerText = "Geben Sie den Namen ein den Sie löschen wollen:";
}

function datenHinzufügen() {
    window.location = "./db_DatenChange/AddNewData.html";
}

function datenAktualisieren() {
    let form = document.getElementById("form");
    form.style.visibility = "visible";
    form.style.height = "400px";
    let btn_update = document.getElementById("btn_Entry")
    btn_update.innerText = "Aktualisieren";
    btn_update.setAttribute("onclick", "updateEntry()");

    document.getElementById("NLable").innerText = "Geben Sie den Namen ein den Sie aktualisieren wollen wollen:";
}

function closeForm() {
    document.getElementById("form").style.visibility = "hidden";
}

function backToDatabase() {
    window.location = "../database.html";
}

function updateEntry() {
    let name = document.getElementById("name").value;
    window.location = "./db_DatenChange/UpdateData.html";
    sessionStorage.setItem("toUpdatedCar", name);
}


function deleteEntry() {
    let name = document.getElementById("name").value;
    deleteLine(name);
}


function deleteLine(name) {
    transaction = db.transaction(["Auto"], "readwrite");
    let store = transaction.objectStore("Auto");
    store.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;
        if (cursor) {
            if (cursor.value.namen === name) {
                var request = cursor.delete();
                request.onsuccess = function () {
                    console.log('Deleted the row.');
                };
            }
            cursor.continue();
        } else {
            console.log('Entries displayed.');
        }
    }
}

function updateInit() {
    let transaction = indexedDB.open("DasDing", 2);

    transaction.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains("Auto")) {
            store = db.createObjectStore("Auto", {
                autoIncrement: true
            });

        }
        updateLine();
    }

    transaction.onsuccess = function (event) {
        db = event.target.result;
        updateLine();
    }
    transaction.onerror = function (err) {
        console.log(err);
    }
}


function updateLine() {
    let name = sessionStorage.getItem("toUpdatedCar");

    transaction = db.transaction(["Auto"], "readonly");
    let store = transaction.objectStore("Auto");

    store.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;
        if (cursor) {
            console.log(cursor);
            if (cursor.value.namen === name) {
                document.getElementById("name").value = cursor.value.namen;
                document.getElementById("farbe").value = cursor.value.farbe;
                document.getElementById("baujahr").value = cursor.value.baujahr;
            }
            cursor.continue();
        } else {
            console.log("Entries displayed");
        }
    }
}


function updateCar() {
    let name = sessionStorage.getItem("toUpdatedCar");
    let updatedCar = {
        namen: document.getElementById("name").value,
        baujahr: document.getElementById("baujahr").value,
        farbe: document.getElementById("farbe").value
    }

    transaction = db.transaction(["Auto"], "readwrite");
    let store = transaction.objectStore("Auto");

    store.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;
        if (cursor) {

            if (cursor.value.namen === name) {
                let request = cursor.update(updatedCar);

                request.onsuccess = function (event) {
                    console.log(event);
                    window.location = "../database.html";
                }
                request.onerror = function (err) {
                    console.log(err);
                }

            }

            cursor.continue()
        } else {
            console.log("Fertig")
        }
    }
}