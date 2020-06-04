export default class Car{
    
    constructor(name,farbe,baujahr) {
        this.name = name;
        this.farbe = farbe;
        this.baujahr = baujahr;
    }

    get getCar(){
        return { 
            name: this.name,
            farbe: this.farbe,
            baujahr: this.baujahr
        }
    }

}

