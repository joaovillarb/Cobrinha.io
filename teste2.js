const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const girdSize = 10;

let CanvasWidth;
let CanvasHeight;
let xLineTotal;
let yLineTotal;

let map;
let snake;

let WIDTH;//window.innerWidth;
let HEIGHT;//window.innerHeight;

let score;
let level;

let speed;

let active = true;

let direction;

var rndX, rndY;

function initCanvas() {
    WIDTH = 300;
    HEIGHT = 300;

    level = 0;
    score = 0;
    speed = 100;
    active = true;
    direction = "RIGHT"
    map = null;
    snake = new Array(3);

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    document.body.appendChild(canvas);
    generateGrid();

    generateSnake();
    generateFood();
    console.log(map)

    drawGame();

    window.addEventListener('keydown', keyDownHandler);
}

function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log(map[snake[0].x][snake[0].y])

    for (var i = snake.length - 1; i >= 0; i--) {
        if (i === 0) {
            switch (direction) {
                case "RIGHT": // Right
                    snake[0] = { x: snake[0].x + 1, y: snake[0].y }
                    console.log("case")
                    break;
                case "LEFT": // Left
                    snake[0] = { x: snake[0].x - 1, y: snake[0].y }
                    break;
                case "UP": // Up
                    snake[0] = { x: snake[0].x, y: snake[0].y - 1 }
                    break;
                case "DOWN": // Down
                    snake[0] = { x: snake[0].x, y: snake[0].y + 1 }
                    break;
            }

            if (snake[0].x < 0 ||
                snake[0].x >= xLineTotal ||
                snake[0].y < 0 ||
                snake[0].y >= yLineTotal) {
                console.log('if 2')
                showGameOver();
                return;
            }

            if (map[snake[0].x][snake[0].y] === 1) {
                score += 10;
                generateFood();

                snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
                map[snake[snake.length - 1].x][snake[snake.length - 1].y] = 2;

                if ((score % 10) === 0) {
                    level += 1;
                }

                // Caso a cabeça atinga outra parte do corpo, finaliza o jogo
            } else if (map[snake[0].x][snake[0].y] === 2) {
                console.log('else if')
                console.log(map[snake[0].x][snake[0].y])
                console.log(snake[0].x)
                console.log(snake[0].y)
                showGameOver();
                return;
            }

            map[snake[0].x][snake[0].y] = 2;
        } else {
            if (i === (snake.length - 1)) {
                map[snake[i].x][snake[i].y] = null;
            }

            snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
            map[snake[i].x][snake[i].y] = 2;
        }
    }

    drawMain();

    // Start cycling the matrix
    for (var x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
            if (map[x][y] === 1) {
                context.fillStyle = 'black';
                context.fillRect(x * girdSize, y * girdSize, 10, 10);
            } else if (map[x][y] === 2) {
                context.fillStyle = 'orange';
                context.fillRect(x * girdSize, y * girdSize, 10, 10);
            }
        }
    }

    if (active) {
        let velocidade = speed - (level * 10);
        console.log(velocidade)
        setTimeout(drawGame, velocidade);
    }
}

function keyDownHandler(event) {
    let key = event.key;
    if (key === 'ArrowUp' && direction !== "DOWN") {
        console.log('UP')
        direction = "UP"; // Up
    } else if (key === 'ArrowDown' && direction !== "UP") {
        console.log('DOWN')
        direction = "DOWN"; // Down
    } else if (key === 'ArrowLeft' && direction !== "RIGHT") {
        console.log('LEFT')
        direction = "LEFT"; // Left
    } else if (key === 'ArrowRight' && direction !== "LEFT") {
        console.log('RIGHT')
        direction = "RIGHT"; // Right
    }
}

function drawMain() {
    context.lineWidth = 2;
    context.strokeStyle = 'black';

    context.strokeRect(2, 20, canvas.width - 2, canvas.height - 20);

    context.fillStyle = 'black';
    context.font = '12px sans-serif';
    context.fillText('Score: ' + score + ' - Level: ' + level, 2, 12);
}

function generateSnake() {
    // Gera em uma posição aleatória
    generateRandomXY()

    // Vamos ter certeza de que não estamos fora dos limites, pois também precisamos criar espaço para acomodar o
    // outras duas peças do corpo
    while ((rndX - snake.length) < 0) {
        rndX = Math.round(Math.random() * xLineTotal);
    }

    console.log(rndX)
    console.log(snake.length)
    for (let i = 0; i < snake.length; i++) {
        snake[i] = { x: rndX - i, y: rndY };
        map[rndX - i][rndY] = 2;
    }
}


function showGameOver() {
    // Desative o jogo.
    active = false;

    // Limpe a tela
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'black';
    context.font = '16px sans-serif';

    context.fillText('Fim de jogo!', ((canvas.width / 2) - (context.measureText('Fim de jogo!').width / 2)), 50);

    context.font = '12px sans-serif';

    context.fillText('Sua pontuação foi: ' + score, ((canvas.width / 2) - (context.measureText('Sua pontuação foi: ' + score).width / 2)), 70);

}

function generateFood() {
    // Gere uma posição aleatória para as linhas e colunas.
    generateRandomXY();

    // Também precisamos vigiar para não colocar a comida
    // na mesma posição da matriz ocupada por uma parte do
    // corpo da cobra.
    while (map[rndX][rndY] === 2) {
        rndX = Math.round(Math.random() * (xLineTotal - 1));
        rndY = Math.round(Math.random() * (yLineTotal - 1));
    }

    map[rndX][rndY] = 1;
}

function generateRandomXY() {
    rndX = Math.round(Math.random() * (xLineTotal - 1));
    rndY = Math.round(Math.random() * (yLineTotal - 1));
}

function resizeCanvas() {
    WIDTH = 600;//window.innerWidth;
    HEIGHT = 600;//window.innerHeight;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    document.body.appendChild(canvas);
    generateGrid();
}


window.onload = function () {
    // initCanvas();
    /*
                 1. Set the size of the grid, gridSize is used to determine the spacing between the lines in the grid
                 2. Get the width and height of Canvas, which are used to calculate the number of paintings on the x-axis and y-axis
                 3. Use the traversal method to draw the lines of the x-axis
                 4. Use the traversal method to draw the y-axis line
    */

    // 1. Set the grid size
    // generateGrid();


}

function generateGrid() {

    CanvasWidth = context.canvas.width;
    CanvasHeight = context.canvas.height;

    xLineTotal = Math.floor(CanvasWidth / girdSize); // Calcula o número de linhas do eixo x
    yLineTotal = Math.floor(CanvasHeight / girdSize); // Calcula o número de linhas do eixo y


    // console.log('linha - ' + xLineTotal);
    // for (let j = 0; j < xLineTotal; j++) {
    //     context.beginPath(); // Open the path and set different styles
    //     context.moveTo(girdSize * j, 0);
    //     context.lineTo(girdSize * j, CanvasHeight);
    //     context.strokeStyle = "#ccc"; // Set the color of each line
    //     context.stroke();
    // }

    // console.log('coluna - ' + yLineTotal);
    // for (let i = 0; i < yLineTotal; i++) {
    //     context.beginPath(); // Open the path and set different styles
    //     context.moveTo(0, girdSize * i - 0.5); // -0.5 is to solve the problem of pixel blur
    //     context.lineTo(CanvasWidth, girdSize * i - 0.5);
    //     context.strokeStyle = "#ccc"; // Set the color of each line
    //     context.stroke();
    // }

    map = new Array(xLineTotal);
    for (let i = 0; i < map.length; i++) {
        map[i] = new Array(yLineTotal);
    }
}

