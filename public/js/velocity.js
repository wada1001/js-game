
window.addEventListener("load", init);

var ctx;
var isJumping = false;
var offset = 0;
var timer = 0;
var posX = 0, posY = 300;
var velocityX, velocityY = 0;
var speed = 10;
const gravity = 0.8;
const WIDTH = 600, HEIGHT = 600;

function init() {
    ctx = document.getElementById("viewer").getContext("2d");
    ctx.font = "24px sans-serif";
    onkeydown = function () { isJumping = true; }
    onkeyup = function () { isJumping = false; }
    timer = setInterval(tick, 60);
}

function tick() {
    velocityY += isJumping ? -gravity : gravity;
    posY += velocityY;
    offset += speed;
    if (offset % 100 == 0) speed += 2
    paint();
}

function paint() {
    // bg
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // wave
    ctx.fillStyle = "brown";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (var i = 0; i <= WIDTH; i += 10) {
        var up = 200 + Math.sin((i + offset) * Math.PI / 360) * 90;
        ctx.lineTo(i, up);
        // 波より上なら止める
        if (i == 10 && posY < up) { clearInterval(timer) }
    }
    ctx.lineTo(600, 0);
    ctx.fill();

    // wave 2
    ctx.beginPath();
    ctx.moveTo(0, 600);
    for (var i = 0; i <= 600; i += 10) {
        var down = 400 + Math.sin((i + offset) * Math.PI / 340) * 80;
        ctx.lineTo(i, down);
        // 波より下なら止める
        if (i == 10 && posY + 10 > down) { clearInterval(timer) }
    }
    ctx.lineTo(620, 600);
    ctx.fill();

    // player
    ctx.fillStyle = "yellow";
    ctx.fillRect(posX, posY, 10, 10);
    ctx.fill();

    // text
    ctx.fillStyle = "white";
    ctx.fillText(offset, 500, 50);
}