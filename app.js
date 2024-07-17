// Simon Says Game...
let gameSeq=[];
let userSeq=[];
let boxList=["red","green","blue","yellow"];
let start=false;
let level=0;
let h2=document.querySelector("h2");
let h3=document.querySelector("h3");
let game=document.querySelector(".game");
let btn=document.querySelector(".btn");

btn.addEventListener("click",function(){
    if(start==false){
        console.log("started!");
        btn.innerText="Quit";
        h2.innerText=`Double Click Quit key to stop the game`;
        start=true;
        setTimeout(function(){
            levelUp();
        },1000);
    }
});

btn.addEventListener("dblclick",function(){
    if(start==true){
        btn.innerText="Start";
        h2.innerText=`Click Start key to start the game`;
        reset();
    }
});

function gameFlash(box){
    box.classList.add("gameflash");
    setTimeout(function(){
        box.classList.remove("gameflash");
    }, 300);
}

function userFlash(box){
    box.classList.add("userFlash");
    setTimeout(function(){
        box.classList.remove("userFlash");
    },300);
}

function levelUp(){
    userSeq=[];
    level++;
    h3.innerText=`Level ${level}`;
    // random box choose...
    let randIndx=Math.floor(Math.random()*4);
    let randColor=boxList[randIndx];
    let randBox=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBox);
}

function checkBox(indx){
    if(userSeq[indx]===gameSeq[indx]){
        if(userSeq.length==gameSeq.length){
            h2.innerText=`Congratulation!`;
            h2.style.color="green";
            setTimeout(function(){
                h2.innerText=`Click Start key to start the game`;
                h2.style.color="white";
            },1000);
            setTimeout(function(){
                levelUp();
            }, 1500);
            game.style.backgroundColor="green";
            setTimeout(function(){
                game.style.backgroundColor="black"
            }, 200);
        }
    }
    else{
        h2.innerHTML=`<span>Game Over!</span> <b>Your score is - ${level}</b><br> Click Start key to start again.`;
        btn.innerText="Start";
        console.log("game over!");
        h3.innerText=`Level 0`;
        game.style.backgroundColor="brown";
        setTimeout(function(){
            game.style.backgroundColor="black";
        }, 200);
        reset();
    }
}

function boxPress(){
    let box=this;
    userFlash(box);
    let userColor=box.getAttribute("id");
    userSeq.push(userColor);
    let indx=userSeq.length-1;
    checkBox(indx);
}

let allBox=document.querySelectorAll(".box");
for(box of allBox){
    box.addEventListener("click", boxPress);
}

function reset(){
    gameSeq=[];
    userSeq=[];
    start=false;
    level=0;
}