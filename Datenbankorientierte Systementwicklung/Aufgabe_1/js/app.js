let index = 1;
let timer = setInterval(goRight, 4000);
const text = [
  "Das ist Text eins",
  "Das ist Text zwei",
  "Das ist Text drei",
  "Das ist Text vier"
]


function openNav() {
  document.getElementById("nav").style.width = "200px";
}

function closeNav() {
  document.getElementById("nav").style.width = "0px";
}

function goRight() {
  let img_old = document.getElementById("pic");
  let text_old = document.getElementById("slideText");

  index++;
  if (index > 4) {
    index = 1
  }

  switch (index) {
    case 1:
      img_old.src = "../img/1.jpg";
      text_old.innerHTML = text[0];
      break;
    case 2:
      img_old.src = "../img/2.png";
      text_old.innerHTML = text[1];
      break;
    case 3:
      img_old.src = "../img/3.jpg";
      text_old.innerHTML = text[2];
      break;
    case 4:
      img_old.src = "../img/4.jpg";
      text_old.innerHTML = text[3];
      break;
  }
}


function goLeft(){
  let img_old = document.getElementById("pic");

  index--;
  if (index == 0) {
    index = 4
  }

  switch (index) {
    case 1:
      img_old.src = "../img/1.jpg";
      text_old.innerHTML = text[0];
      break;
    case 2:
      img_old.src = "../img/2.png";
      text_old.innerHTML = text[1];
      break;
    case 3:
      img_old.src = "../img/3.jpg";
      text_old.innerHTML = text[2];
      break;
    case 4:
      img_old.src = "../img/4.jpg";
      text_old.innerHTML = text[3];
      break;
  }

}

