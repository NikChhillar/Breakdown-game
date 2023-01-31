const grid = document.querySelector(".grid");
const broadWidth = 560;
const bW = 100;
const bH = 20;

const startP = [230, 10];
let currentP = startP;
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

const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.append(user);

function drawUser() {
    user.style.left = currentP[0] + "px";
    user.style.bottom = currentP[1] + "px";
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