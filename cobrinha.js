const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const box = 10

let food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box }

let snake = []
snake[0] = { x: 10 * box, y: 10 * box }

let direction = 'RIGHT'

function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = 'orange'
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function keyDownHandler(event) {
    let key = event.key;
    if (key === 'ArrowUp' && direction != 'DOWN') {
        // alert('UP')
        direction = 'UP'
    }
    if (key === 'ArrowDown' && direction != 'UP') {
        // alert('DOWN')
        direction = 'DOWN'
    }
    if (key === 'ArrowLeft' && direction != 'RIGHT') {
        // alert('left')
        direction = 'LEFT'
    }
    if (key === 'ArrowRight' && direction != 'LEFT') {
        // alert('right')
        direction = 'RIGHT'
    }
    drawSnake()
}

function move(snakeX, snakeY) {

    if (direction == "RIGHT") snakeX += box
    else if (direction == "LEFT") snakeX -= box
    else if (direction == "UP") snakeY -= box
    else if (direction == "DOWN") snakeY += box
    return { "snakeX": snakeX, "snakeY": snakeY }
}

function drawFood() {
    context.fillStyle = "#4c4c4c"
    context.fillRect(food.x, food.y, box, box)
}

function toEat() {
    if (snake[0].x == food.x && snake[0].y == food.y) {
        // snake.unshift({ x: box, y: box })
        food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box }
        return;
    }

    snake.pop()
}

window.onload = function () {
    canvas.width = 604;
    canvas.height = 624;

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);

    drawSnake()
    drawFood()

    document.addEventListener('keydown', keyDownHandler)

    update()

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    move(snakeX, snakeY)

    toEat()
    let newHead = { x: snakeX, y: snakeY }
    snake.unshift(newHead)

    function update() {
        requestAnimationFrame(update, canvas)
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
        move(snakeX, snakeY)
        drawSnake()
    }

};