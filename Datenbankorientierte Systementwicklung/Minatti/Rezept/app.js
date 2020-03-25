
    // Rezept Definition
    var rezept = {
        name: "Pizza Diavolo",
        zubereitungszeit: 20,
        zutaten: [
            "Tomaten Souce",
            "Scharfe Salami",
            "Käse",
            "Mehl",
            "Wasser",
            "Salz",
            "Peperoni"
        ]
    };
    // Erste Ausgabe vom JSON Object
    console.log(JSON.stringify(rezept));

    // Veränderung der Daten vom JSON
    rezept.zubereitungszeit = 25;
    rezept.name = "Die Feurige Pizza";
    rezept.zutaten[4] = "Milch";
    rezept.zutaten.push("Scharfes Öl");

    // Ausgabe vom neuen JSON
    console.log(JSON.stringify(rezept));

    // Aufgabe 2
    function add(){
        //Einlesen des Textes und definition der einzelnen Variabeln
        let newZ = document.getElementById("neueZutat").value;
        let ausgabe = document.getElementById("ausgabe");
        let ausgabeText = "";

        //Hinzufügen der neuen Zutat
        rezept.zutaten.push(newZ);

        localStorage.newZutat = JSON.stringify(rezept);

        //Ausgabe Text wird definiert
        for(let i=0; i< rezept.zutaten.length; i++){
            ausgabeText += rezept.zutaten[i] + "<br>";
        }
        //Leeres Feld für die nächste eingabe
        document.getElementById("neueZutat").value = " ";
        //Ausgabe im DIV
        ausgabe.innerHTML = ausgabeText;
    }
    function checkCookingStatus(state){
        sessionStorage.KochenStarten = state
        if (sessionStorage.KochenStarten === "true") {
            document.getElementById("stopCooking").style.visibility = "visible";
            document.getElementById("startCooking").style.visibility = "hidden";
        }else{
            document.getElementById("startCooking").style.visibility = "visible";
            document.getElementById("stopCooking").style.visibility = "hidden";           
        }        
    }


checkCookingStatus(sessionStorage.KochenStarten)