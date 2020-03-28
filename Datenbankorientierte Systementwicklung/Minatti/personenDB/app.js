
function init(){

        let row = "";
        row += "<th>";
        row = "<td>Vorname</td>";
        row +=  "<td>Nachname</td>";
        row +=  "<td>Gewicht</td>";
        row +=  "<td>Geburtstag</td>";
        row +=  "<td>Größe</td>";
        row +=  "<td>BMI</td>";
        row += "</th>";

        if(typeof localStorage.data == "undefined"){
            alert("There is no data inside");
        }else{
            let daten = JSON.parse(localStorage.data);
            let tr = document.createElement("tr");
            
            
            for(let i =0 ; i < daten.length; i++){
                let data = daten[i];
                row += "<tr>";
                row += "<td>" +data.vorname + "</td>";
                row += "<td>" +data.nachname + "</td>";
                row += "<td>" +data.gewicht + "</td>";
                row += "<td>" +data.geburtstag + "</td>";
                row += "<td>" +data.groesse + "</td>";
                row += "<td>" +parseFloat(data.gewicht / Math.pow((data.groesse/100),2)).toFixed(2)+ "</td>";
                row += "<td><button onclick='switchLocation("+i+")' class='btn btn-outline-dark'>Bearbeiten</button></td>";
                row += "<td><button onclick='deleteLine("+i+")' class='btn btn-outline-dark'>Löschen</button></td>";
                row += "</tr>";  
            }
        }
        document.getElementById("table").innerHTML = row;
}


function switchLocation(i){
    window.location = "edit.html";
    sessionStorage.tochange = i;
}

function editLine(){

    let i = sessionStorage.getItem("tochange")
    
    let daten = JSON.parse(localStorage.data);
    let singledate = daten[i]; 
    console.log(singledate);
    document.getElementById("vorname").value =singledate.vorname;
    document.getElementById("nachname").value =singledate.nachname
    document.getElementById("gewicht").value = singledate.gewicht;
    document.getElementById("geburtstag").value = singledate.geburtstag;
    document.getElementById("groesse").value = singledate.groesse;

}

function updateNewLine(){
    let i = sessionStorage.getItem("tochange");
    let daten  = JSON.parse(localStorage.data);

    daten.splice(i,1);
    let newData = {}

    newData.vorname = document.getElementById("vorname").value;
    newData.nachname = document.getElementById("nachname").value;
    newData.gewicht = document.getElementById("gewicht").value;
    newData.geburtstag = document.getElementById("geburtstag").value;
    newData.groesse = document.getElementById("groesse").value;

    daten.push(newData);

    localStorage.data = JSON.stringify(daten)

    window.location = "index.html";
}

function deleteLine(i){
    let daten = JSON.parse(localStorage.data);
    daten.splice(i,1);
    localStorage.data = JSON.stringify(daten);
    init()
}


function saveData(){
    let daten = []

    if(typeof localStorage.data != "undefined"){
        daten = JSON.parse(localStorage.data);
    }

    let newData = {}

    newData.vorname = document.getElementById("vorname").value;
    newData.nachname = document.getElementById("nachname").value;
    newData.gewicht = document.getElementById("gewicht").value;
    newData.geburtstag = document.getElementById("geburtstag").value;
    newData.groesse = document.getElementById("groesse").value;

    daten.push(newData);


    localStorage.data = JSON.stringify(daten);
    init();    
}


function searchBar(){
    let search = document.getElementById("search").value;

    let row = "";
    row += "<th>";
    row = "<td>Vorname</td>";
    row +=  "<td>Nachname</td>";
    row +=  "<td>Gewicht</td>";
    row +=  "<td>Geburtstag</td>";
    row +=  "<td>Größe</td>";
    row +=  "<td>BMI</td>";
    row += "</th>";

    if(typeof localStorage.data == "undefined"){
        alert("There is no data inside");
    }else{

        let daten = JSON.parse(localStorage.data);
        let tr = document.createElement("tr");
        
        
        for(let i =0 ; i < daten.length; i++){
            let data = daten[i];

            if(search === data.vorname || search === data.nachname || search === ""){
                row += "<tr>";
                row += "<td>" +data.vorname + "</td>";
                row += "<td>" +data.nachname + "</td>";
                row += "<td>" +data.gewicht + "</td>";
                row += "<td>" +data.geburtstag + "</td>";
                row += "<td>" +data.groesse + "</td>";
                row += "<td>" +parseFloat(data.gewicht / Math.pow((data.groesse/100),2)).toFixed(2)+ "</td>";
                row += "<td><button onclick='switchLocation("+i+")' class='btn btn-outline-dark'>Bearbeiten</button></td>";
                row += "<td><button onclick='deleteLine("+i+")' class='btn btn-outline-dark'>Löschen</button></td>";
                row += "</tr>";  
            }
        }
    }
    document.getElementById("table").innerHTML = row;
   
}

function cleanStorage(){
    localStorage.clear();
}

init()