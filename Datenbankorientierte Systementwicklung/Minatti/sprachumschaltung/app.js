

function saveLanguage(lang){
    localStorage.setItem("language",lang)
    init()
}

function init(){
    if(localStorage.getItem("language")){
        
        document.getElementById("main").style = "visibility:visible";        
        document.getElementById("language_selection").style = "visibility:hidden";
    }else{
        
        document.getElementById("main").style = "visibility:hidden";        
        document.getElementById("language_selection").style = "visibility:visible";

    }

    if(localStorage.getItem("Person")){
        let person = localStorage.getItem("Person");
        
        person = JSON.parse(person)

        document.getElementById("farbe").value = person.farbe;
        document.getElementById("vorname").value = person.vorname;
        document.getElementById("nachname").value = person.nachname;
        document.getElementById("email").value = person.email;
        document.getElementById("nickname").value = person.nickname;

    }
}

function saveInput(){
    let farbe = document.getElementById("farbe").value;
    let vn = document.getElementById("vorname").value;
    let nn = document.getElementById("nachname").value;
    let email = document.getElementById("email").value;
    let nickname = document.getElementById("nickname").value;

    let person = {
        "vorname": vn,
        "nachname": nn,
        "email": email,
        "nickname": nickname,
        "farbe": farbe
    }


    localStorage.setItem("Person",JSON.stringify(person));
    document.body.style.backgroundColor = farbe;
}

function deleteAll(){
    localStorage.clear()

    document.getElementById("farbe").value = "";
    document.getElementById("vorname").value = "";
    document.getElementById("nachname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("nickname").value = "";

    document.body.style.backgroundColor = white

    init()  

}

init()