let index = 1;
let timer = setInterval(goRight, 4000);
const text = [
  "Das ist Text eins",
  "Das ist Text zwei",
  "Das ist Text drei",
  "Das ist Text vier",
  "Das ist Text fünf",
  "Das ist Text sechs",
  "Das ist Text sieben",
  "Das ist Text acht",
  "Das ist Text neun",
  "Das ist Text zehn",
  "Das ist Text elf",
  "Das ist Text zwölf",
  "Das ist Text dreizehn",
  "Das ist Text vierzehn",
  "Das ist Text fünfzehn",
  "Das ist Text sechszehn"
]


function goRight() {
    let img_old = document.getElementById("pic");
    let text_old = document.getElementById("slideText");
  
    index++;
    if (index > 16) {
      index = 1;
    }
    img_old.src = "../img/"+index+".jpeg";
    //text_old.innerHTML = text[index];
    
  }
  
  function goLeft(){
    let img_old = document.getElementById("pic");
    let text_old = document.getElementById("slideText");
  
    index--;
    if (index == 0) {
      index = 16;
    }
  
    img_old.src= "../img/" + index+".jpeg";
    //text_old.innerHTML = text[index -1];
  
  }
  
  