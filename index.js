const grid = document.querySelector(".grid");
const score = document.getElementById("score");

const broadWidth = 560;
const broadHeight = 300;
const bW = 100;
const ballD = 20;
const bH = 20;
let timerId;
let xDir = -2;
let yDir = 2;
let sc = 0;

const startP = [230, 10];
let currentP = startP;

const ballStartP = [270, 40];
let currentBallP = ballStartP;
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + bW, yAxis];
        this.topLeft = [xAxis, yAxis + bH];
        this.topRight = [xAxis + bW, yAxis + bH];
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

function addBlocks() {

    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.style.left = blocks[i].bottomLeft[0] + "px";
        block.style.bottom = blocks[i].bottomLeft[1] + "px";
        grid.appendChild(block);
    }

}

addBlocks();

// User
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.append(user);

function drawUser() {
    user.style.left = currentP[0] + "px";
    user.style.bottom = currentP[1] + "px";
}

function drawBall() {
    ball.style.left = currentBallP[0] + "px";
    ball.style.bottom = currentBallP[1] + "px";
}

function moveUser(e) {
    switch (e.key) {
        case "ArrowLeft":
            if (currentP[0] > 10) {
                currentP[0] -= 10;
                drawUser();
            }
            break;
        case "ArrowRight":
            if (currentP[0] < broadWidth - bW) {
                currentP[0] += 10;
                drawUser();
            }
            break;
    }
}


document.addEventListener("keydown", moveUser);

// Ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);


function moveBall() {
    currentBallP[0] += xDir;
    currentBallP[1] += yDir;
    drawBall();
    checkCollisions();
}

timerId = setInterval(moveBall, 30);

function checkCollisions() {


    for (let i = 0; i < blocks.length; i++) {

        if (
            (
                currentBallP[0] > blocks[i].bottomLeft[0] &&
                currentBallP[0] < blocks[i].bottomRight[0]
            )
            &&
            (
                (currentBallP[1] + ballD) > blocks[i].bottomLeft[1] &&
                currentBallP[1] < blocks[i].topLeft[1]
            )
        ) {
            const allBlocks = Array.from(document.querySelectorAll(".block"));
            //  console.log(allBlocks);
            allBlocks[i].classList.remove("block");
            blocks.splice(i, 1);
            changeDirection();
            sc++;
            score.innerHTML = sc;

            if (blocks.length === 0) {
                score.innerHTML = "You Wins";
                clearInterval(timerId);
                document.removeEventListener("keydown");
            }
        }

    }



    // walls collision
    if (currentBallP[0] >= (broadWidth - ballD) ||
        currentBallP[1] >= (broadHeight - ballD) ||
        currentBallP[0] <= 0
    ) {
        changeDirection();
    }


    // user collision
    if (
        (
            currentBallP[0] > currentP[0] &&
            currentBallP[0] < currentP[0] + bW
        ) &&
        (
            currentBallP[1] > currentP[1] &&
            currentBallP[1] < currentP[1] + bH
        )
    ) {
        changeDirection();
    }

    //game over
    if (currentBallP[1] <= 0) {
        clearInterval(timerId);
        score.innerHTML = "Game Over";
        document.removeEventListener("keydown");
    }
}



function changeDirection() {
    if (xDir === 2 && yDir === 2) {
        yDir = -2;
        return;
    }
    if (xDir === 2 && yDir === -2) {
        xDir = -2;
        return;
    }
    if (xDir === -2 && yDir === -2) {
        yDir = 2;
        return;
    }
    if (xDir === -2 && yDir === 2) {
        xDir = 2;
        return;
    }

}