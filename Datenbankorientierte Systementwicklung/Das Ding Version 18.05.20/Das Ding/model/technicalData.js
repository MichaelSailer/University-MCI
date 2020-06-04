/*
    Eine Klasse, damit man einfach mit Objekten arbeiten kann. Damit wir mehr in Richtung Objektorientierte 
    Programmierung arbeiten. Es wird die ES6 Schreibweise für Klassendefinierung verwendet

    Die wichtigsten Dateien:
        *ID: Wird verwendet, um Daten gezielt zu löschen, zudem wird immer nur ein Datensatz gespeichert.
        *Der Rest:  Sind technische Daten zum Auto. Es werden nur die für uns wichtigisten Daten gespeichert.
                    Also nur Daten die entwedert wichtig sind und/ oder sich ändern können.
*/
class TechischeDaten{

    /*
        Konstruktor für die direkte Initialisierung der Daten. Es werden die Daten direkt vom Kontroller eingegeben,
        diese Daten werden von der Eingabemaske eingelesen.

        Darunter sind die Setter und Getter der einzelnen Daten. Bis auf die Getter werden die Setter nur 
        verwenden, um die Daten direkt vom Konstruktor aus initialisiert werden

    */
    constructor(id,baujahr,hubraum,leergewicht,null_bis_hundert,standgeräusch,kraftstoff,schadsstoffeinstufung,höhstgeschwindigkeit){
        this._id = id;
        this._baujahr = baujahr || 0;
        this._hubraum = hubraum || 0;
        this._leergewicht = leergewicht || 0;
        this._null_bis_hundert = null_bis_hundert || 0;
        this._standgeräusch = standgeräusch || 0;
        this._kraftstoff = kraftstoff || "";
        this._schadsstoffeinstufung = schadsstoffeinstufung || "";
        this._höhstgeschwindigkeit = höhstgeschwindigkeit || 0;
        
    

        this.setBaujahr = function(baujahr){
            this._baujahr = baujahr;
        };
        this.getBaujahr = function(){
            return this._baujahr;
        }
        this.setHubraum = function(hubraum){
            this._hubraum = hubraum;
        }
        this.getHubraum = function(){
            return this._hubraum;
        }
        this.setLeergewicht = function(leergewicht){
            this._leergewicht = leergewicht;
        }
        this.getLeergewicht = function(){
            return this._leergewicht;
        }
        this.setNull_bis_hundert = function(null_bis_hundert){
            this._null_bis_hundert = null_bis_hundert;
        }
        this.getNull_bis_hundert = function(){
            return this._null_bis_hundert
        }
        this.setStandgeräusch = function(standgeräusch){
            this._standgeräusch = standgeräusch;
        }
        this.getStandgeräusch = function(){
            return this._standgeräusch
        }
        this.setKraftstoff = function(kraftstoff){
            this._kraftstoff = kraftstoff
        }
        this.getKraftstoff = function(){
            return this._kraftstoff
        }
        this.setSchadsstoffeinstufung = function(schadsstoffeinstufung){
            this._schadsstoffeinstufung = schadsstoffeinstufung
        }
        this.getSchadsstoffeinstufung = function(){
            return this._schadsstoffeinstufung
        }
        this.setHöhstgeschwindigkeit = function(höhstgeschwindigkeit){
            this._höhstgeschwindigkeit = höhstgeschwindigkeit
        }
        this.getHöhstgeschwindigkeit = function(){
            return this._höhstgeschwindigkeit
        }
        this.setId = function(id){
            this._id = id
        }
        this.getId = function(){
            return this._id;
        }

    }

}


/*
    Hier wird das Prototyp Pattern umgesetzt. Damit ist es neben den MVC (Model View Controll) Pattern das zweite Patter das umgesetzt wurde.
    Diese Funktion gibt nicht eine Ausgabe, sondern es gibt ein Objekt zurück mit dem man dann die Daten gespeichert
    werden kann. Wie man unten sieht werden die Keys mit dem getter gesetzt. Wichtig ist hier, dass hier keine 
    Überprüfung statt findet, ob die Daten sinnvoll sind. Das geschieht wo anders.

*/ 
TechischeDaten.prototype.generateObject = function(){
    return {
        id: this.getId(),
        baujahr: this.getBaujahr(),
        hubraum: this.getHubraum(),
        leergewicht: this.getLeergewicht(),
        null_bis_hundert: this.getNull_bis_hundert(),
        standgeraeusch: this.getStandgeräusch(),
        kraftstoff: this.getKraftstoff(),
        schadsstoffeinstufung: this.getSchadsstoffeinstufung(),
        hoehstgeschwindigkeit: this.getHöhstgeschwindigkeit()
    }
};
    
    



