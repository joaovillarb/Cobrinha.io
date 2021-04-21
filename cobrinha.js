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

function drawMain() {
    context.lineWidth = 2; 
    context.strokeStyle = 'black'; // A borda também será preta

    // A borda é desenhada do lado de fora do retângulo, então vamos
    // precisa movê-lo um pouco para a direita e para cima. Além disso, vamos precisar
    // para deixar um espaço de 20 pixels no topo para desenhar a interface.
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'black';
    context.font = '12px sans-serif';
    context.fillText('Score: ' + score + ' - Level: ' + level, 2, 12);
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
    drawMain()
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