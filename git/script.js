const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Definindo o tamanho do canvas
canvas.width = 400;
canvas.height = 400;

const snakeSize = 10;
let snake = [{ x: 50, y: 50 }];
let food = { x: 100, y: 100 };
let dx = snakeSize; // Direção inicial para a cobrinha
let dy = 0;
let score = 0;

document.addEventListener("keydown", changeDirection);

function gameLoop() {
    clearCanvas();
    moveSnake();
    checkCollisions();
    drawSnake();
    drawFood();
    updateScore();
    setTimeout(gameLoop, 100); // Controla a velocidade
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Verificar se a cobrinha comeu a comida
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
    } else {
        snake.pop(); // Remover a cauda
    }
}

function checkCollisions() {
    // Verificar se a cobrinha bateu nas paredes
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        alert("Game Over! Seu score: " + score);
        snake = [{ x: 50, y: 50 }];
        score = 0;
    }

    // Verificar se a cobrinha bateu nela mesma
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            alert("Game Over! Seu score: " + score);
            snake = [{ x: 50, y: 50 }];
            score = 0;
        }
    }
}

function drawSnake() {
    ctx.fillStyle = "green";
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, snakeSize, snakeSize);
    }
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize,
        y: Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize
    };
}

function updateScore() {
    document.querySelector("h1").textContent = "Jogo da Cobrinha - Pontuação: " + score;
}

function changeDirection(event) {
    if (event.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -snakeSize;
    } else if (event.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = snakeSize;
    } else if (event.key === "ArrowLeft" && dx === 0) {
        dx = -snakeSize;
        dy = 0;
    } else if (event.key === "ArrowRight" && dx === 0) {
        dx = snakeSize;
        dy = 0;
    }
}

gameLoop();
