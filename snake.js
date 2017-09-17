////////////////////////////////////////////////////////////////////////////////
/////// Author: Andres Zibula                                           ////////
/////// Source: https://github.com/andres-zibula/snake-js               ////////
////////////////////////////////////////////////////////////////////////////////

var canvas = document.getElementById("idCanvas");
var ctx = canvas.getContext("2d");
ctx.canvas.width = 700;
ctx.canvas.height = 300;


var cell_size = 15;
var snake = [];
var snake_size = 5;

var food;
var direction = "right",
    previos_direction = "left";

var game_speed = 100;

function createSnake() {
    for (var i = 0; i < snake_size; i++) {
        snake.push({ x: i, y: 0 });
    };
}

function createFood() {
    food = {
        x: Math.round(Math.random() * (ctx.canvas.width - cell_size) / cell_size),
        y: Math.round(Math.random() * (ctx.canvas.height - cell_size) / cell_size),
    };
}

function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    drawFood();
    drawSnake();
}

function drawSnake() {
    for (var i = 0; i < snake_size; i++) {
        ctx.beginPath();
        ctx.arc(snake[i].x * cell_size + cell_size / 2, snake[i].y * cell_size + cell_size / 2, cell_size / 2, 0, Math.PI * 2);
        ctx.fillStyle = "green";
        ctx.fill();
        ctx.closePath();
    };
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * cell_size, food.y * cell_size, cell_size, cell_size);
}

function handleCollisions() {
    if (snake[snake.length - 1].x == -1 || snake[snake.length - 1].y == -1 || snake[snake.length - 1].x >= ctx.canvas.width / cell_size - 1 || snake[snake.length - 1].y >= ctx.canvas.height / cell_size - 1) {
        alert("GAME OVER");
        document.location.reload();
    }

    if (snake[snake.length - 1].x == food.x && snake[snake.length - 1].y == food.y) {
        if (snake[0].x == snake[1].x) {
            if (snake[0].y < snake[1].y) {
                snake.unshift({ x: snake[0].x, y: snake[0].y - 1 });
            } else {
                snake.unshift({ x: snake[0].x, y: snake[0].y + 1 });
            }
        } else {
            if (snake[0].x < snake[1].x) {
                snake.unshift({ x: snake[0].x - 1, y: snake[0].y });
            } else {
                snake.unshift({ x: snake[0].x + 1, y: snake[0].y });
            }
        }

        snake_size++;
        createFood();
        game_speed -= 10;
    }
}

function moveSnake() {
    snake.shift();
    var last_x = snake[snake.length - 1].x;
    var last_y = snake[snake.length - 1].y;
    var new_x, new_y;

    switch (direction) {
        case "right":
            new_x = last_x + 1;
            new_y = last_y;
            break;
        case "down":
            new_x = last_x;
            new_y = last_y + 1;
            break;
        case "left":
            new_x = last_x - 1;
            new_y = last_y;
            break;
        case "up":
            new_x = last_x;
            new_y = last_y - 1;
            break;
        default:
            break;
    }

    previos_direction = direction;
    snake.push({ x: new_x, y: new_y });
}


document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39 && previos_direction != "left") {
        direction = "right";
    } else if (e.keyCode == 38 && previos_direction != "down") {
        direction = "up";
    } else if (e.keyCode == 37 && previos_direction != "right") {
        direction = "left";
    } else if (e.keyCode == 40 && previos_direction != "up") {
        direction = "down";
    }
}

function mainLoop() {
    draw();
    handleCollisions();
    moveSnake();

    setTimeout(mainLoop, game_speed);
}

createSnake();
createFood();
mainLoop();