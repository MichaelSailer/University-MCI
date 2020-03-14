var index = 1;
var timer = setInterval(goRight,3000);

function goRight(){
    let img_old = document.getElementById("pic");

    index ++;
    if(index > 4){index = 1}

    switch(index){
        case 1: 
            img_old.src = "../img/1.jpg";
        break;
        case 2: 
            img_old.src = "../img/2.png";
        break;
        case 3: 
            img_old.src = "../img/3.jpg";
        break;
        case 4: 
            img_old.src = "../img/4.jpg";
        break;
    }
}