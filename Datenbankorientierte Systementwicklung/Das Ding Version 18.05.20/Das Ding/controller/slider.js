let index = 1;
let timer = setInterval(goRight, 4000);

function goRight() {
    let img_old = document.getElementById("pic");
  
    index++;
    if (index > 11) {
      index = 1;
    }
    img_old.src = "../img/"+index+".jpeg";
    
  }
  
  function goLeft(){
    let img_old = document.getElementById("pic");
  
    index--;
    if (index == 0) {
      index = 11;
    }
  
    img_old.src= "../img/" + index+".jpeg";
  
  }
  
  