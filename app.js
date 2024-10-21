let gameSeq = [];
let userSeq = [];
colors = ["red","blue","green","yellow"]
let h3 =document.querySelector('h3');
let started = false;
let level = 0;
let highestScore =0;

let p=document.createElement('p');
let body = document.querySelector('body');

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("The game has been started");
        started=true;
        levelUp();
    }
})
function blinkClr(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },250)
}
function levelUp(){
    userSeq=[];
    level++;
    h3.innerText = "level "+level;

    let rdIdx = Math.floor(Math.random()*3);
    let rdClr = colors[rdIdx];
    // let rdBtn = document.querySelector(`.${rdClr}`);

    gameSeq.push(rdClr);
    console.log(gameSeq);
    let index =0;
    for(let currClr of gameSeq){
        setTimeout(() => {
            blinkClr(document.querySelector(`.${currClr}`)),500
        },500*index);
        index++;
    }
}

function reset(){
    userSeq=[];
    gameSeq=[];
    level=0;
    started=false;
}

function checkClr(idx){
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }
    else{
        h3.innerHTML=`<h3>Your score was ${level} <br> Press any key to restart`;
        if(level>highestScore){
            highestScore=level;
        }
        p.innerText = `Your highest score is ${highestScore}`
        body.append(p);
        reset();
    }
}

let btns = document.querySelectorAll('.btn');
for(let btn of btns){
    btn.addEventListener("click",function(){
        userSeq.push(this.getAttribute('id'));
        blinkClr(this);

        checkClr(userSeq.length-1);
    })
}