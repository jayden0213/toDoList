const body = document.querySelector("body");


const IMG_NUMBER = 5;

function paintImage() {

    
}


function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const radomNumber = genRandom();
}

init();
