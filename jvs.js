let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "blue", "yellow"];

let started = false;
let level = 0;

let h1 = document.querySelector("h1");

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function init() {
    started = true;
    level = 0;
    gameSeq = [];
    userSeq = [];
    h1.innerText = `Level ${level}`;
    nextSeq();
}

function nextSeq() {
    userSeq = [];
    level++;
    h1.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randBtn = document.querySelector(`.${randomColor}`);

    gameSeq.push(randomColor);

    setTimeout(function () {
        gameFlash(randBtn);
    }, 500);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(nextSeq, 1000);
        }
    } else {
        h1.innerHTML = `Game over! You reached level ${level}. <br> Press the START button to try again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

function btnPress() {
    if (!started) return; // Prevent clicks before starting the game

    let btn = this;
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    userFlash(btn);

    checkAns(userSeq.length - 1);
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}

// Event listeners
let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

// Add this for the "START" button functionality
document.querySelector("#start-btn").addEventListener("click", init);