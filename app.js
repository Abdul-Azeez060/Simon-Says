let gameSeq = [];
let userSeq = [];

let higScore = 0;

let started = false;
let level  = 0;

let btns = ["yellow","red","purple","green"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started == false){
         console.log("game started");
         started = true; 
         setTimeout( levelUp,400);
        
    }

   
   
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function checkAns(idx){
   if( userSeq[idx] === gameSeq[idx]){
    if(userSeq.length === gameSeq.length){
       setTimeout(levelUp,1000);
    }
   }else{
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function(){
        document.querySelector("body").style.backgroundColor = "white";
    },150);
    higScore = Math.max(higScore,level);
    h2.innerHTML = `Game over! <b>Your score is ${level} </b> <br> <b>Highest Score is ${higScore}</b> <br> press any key to restart`;
    reset();
   }
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // random number 
    let radIdx = Math.floor(Math.random()*4);
    let radCol = btns[radIdx];
    let randbtn = document.querySelector(`.${radCol}`);
    gameSeq.push(radCol);
    console.log(gameSeq);

    gameFlash(randbtn);
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    let col = btn.getAttribute("id");
    userSeq.push(col);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
} 

function reset(){
    level = 0;
    userSeq = [];
    gameSeq = [];
    started = false;
}