const gameboard = document.querySelector("#gameBoard");
// to paint on the canvas we need create context

const ctx = gameboard.getContext("2d");
const scoreText = document.querySelector("#score");
const resetBtn = document.querySelector("#reset");


//creating a variable to hold the width and height of the gameboard

const gameWidth = gameboard.width;
const gameHeigth = gameboard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;


// we will examine running to see if our game is currently
let running = false;
// X velocity will be how far we move on the X-axis
//=>if x Velocity is positive number will move right  and if itis negative it will move left 
// |||ly y velocity is Y axix
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

//our snake is array of object 

let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gamestart();

// In gamestart function we will change running to true 
//and calling createfood, drawfood, nextTick Functions
function gamestart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();

};

//
//

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();

        }, 100)
    }
    else {
        displayGameOver();
    }

};
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeigth);
};

// create food function will create random number to place the food in co-ordinates;
// to accurately place the food will multiply by unitSize so that the number generated will be divisble by the unitSize( i.e 25)


function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round(Math.random() * ((max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};

//using context filling style in red
//using context we can fill rectange 

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);

};

// to mobe the snake we need to create a new head in the direction of moving to elimiante the tail

function moveSnake() {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };
    snake.unshift(head);
    // this condition  is to check whether the food is eaten and to eliminate the tail
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    }
    else {
        snake.pop();
    }
};



function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};

//the change direction function should have one parameter i.e event
//each of the key will have the value and we are storing it 

function changeDirection(event) {
    const keyPress = event.keyCode;
    const left = 37;
    const right = 39;
    const down = 40;
    const up = 38;


    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    const goingRight = (xVelocity == unitSize);

    switch (true) {
        case (keyPress == left && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPress == right && !goingLeft):

            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPress == up && !goingDown):

            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case (keyPress == down && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;

    }



};

function checkGameOver() {
    switch (true) {
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeigth):
            running = false;
            break;

    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
        }
    }
};
// In displayGameover function usimng context we just saygameover and sety running to false
function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeigth / 2);
    running = false;
};

// In reset game we let setting score x, y velocities to default and again we create the snake
//call gameStart function
function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    gamestart();

};




