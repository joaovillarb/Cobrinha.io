const canvas = document.getElementById("canvas")
const context = canvas.getContext('2d');

const getRange = length => [...Array(length).keys()]

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
let velocidade;

let active = true;

let direction;

var rndX, rndY;

function initCanvas() {
    WIDTH = document.getElementById('campo1').value;
    HEIGHT = document.getElementById('campo2').value;

    level = 0;
    score = 0;
    speed = 100;
    velocidade = speed;
    active = true;
    direction = "RIGHT"
    map = null;
    snake = new Array(3);

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    generateMap();

    generateSnake();
    generateFood();

    drawGame();

    window.addEventListener('keydown', keyDownHandler);
}

function drawGame() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // renderCells();

    for (var i = snake.length - 1; i >= 0; i--) {
        if (i === 0) {
            switch (direction) {
                case "RIGHT": // Right
                    snake[0] = { x: snake[0].x + 1, y: snake[0].y }
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


            //CASO ATINJA A COMIDA
            if (map[snake[0].x][snake[0].y] === "fruta") {
                score += 10;
                generateFood();

                snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
                map[snake[snake.length - 1].x][snake[snake.length - 1].y] = "cobra";

                if ((score % 100) === 0) {
                    level += 1;
                }


            }
            // Caso a cabeça atinga outra parte do corpo, finaliza o jogo
            else if (map[snake[0].x][snake[0].y] === 2) {
                console.log('else if')
                // console.log(map[snake[0].x][snake[0].y])
                // console.log(snake[0].x)
                // console.log(snake[0].y)
                showGameOver();
                return;
            }

            map[snake[0].x][snake[0].y] = 2;
        } else {
            console.log('else')
            if (i === (snake.length - 1)) {
                map[snake[i].x][snake[i].y] = null;
            }

            console.log('CABEÇA COBRA X -' + snake[0].x)
            console.log('CORPO COBRA X -' + snake[i].x)
            console.log('CABEÇA COBRA Y -' + snake[0].y)
            console.log('CORPO COBRA Y -' + snake[i].y)

            snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
            map[snake[i].x][snake[i].y] = "cobra";
        }
    }

    drawMain();

    // Start cycling the matrix
    for (var x = 0; x < map.length; x++) {
        for (let y = 0; y < map[0].length; y++) {
            if (map[x][y] === "fruta") {
                context.fillStyle = 'red';
                context.fillRect(x * girdSize, y * girdSize, 10, 10);
            } else if (map[x][y] === "cobra") {
                context.fillStyle = '#6bd82b';
                context.fillRect(x * girdSize, y * girdSize, 10, 10);
            }
        }
    }

    if (active) {
        velocidade = speed - (level * 10);
        setTimeout(drawGame, velocidade);
    }
}

function keyDownHandler(event) {
    let key = event.key;
    if (key === 'ArrowUp' && direction !== "DOWN") {
        // console.log('UP')
        direction = "UP"; // Up
    } else if (key === 'ArrowDown' && direction !== "UP") {
        // console.log('DOWN')
        direction = "DOWN"; // Down
    } else if (key === 'ArrowLeft' && direction !== "RIGHT") {
        // console.log('LEFT')
        direction = "LEFT"; // Left
    } else if (key === 'ArrowRight' && direction !== "LEFT") {
        // console.log('RIGHT')
        direction = "RIGHT"; // Right
    }
}

const renderCells = () => {
    context.globalAlpha = 0.15
    getRange(CanvasWidth).forEach(column => getRange(CanvasHeight).forEach(row => {
        if ((column + row) % 2 === 1) {
            context.fillStyle = '#000000';
            context.fillRect(column * girdSize, row * girdSize, girdSize, girdSize)
        }
    }))
    context.globalAlpha = 1
}

function drawMain() {
    context.fillStyle = 'black';
    context.font = '15px sans-serif';
    context.fillText(score, score > 0 ? score > 90 ? canvas.width - 25 : canvas.width - 20 : canvas.width - 13, 15);
    context.fillText('Level ' + level, 2, canvas.height - 5);
}

function generateSnake() {
    // Gera em uma posição aleatória
    generateRandomXY()

    // Vamos ter certeza de que não estamos fora dos limites, pois também precisamos criar espaço para acomodar o
    // outras duas peças do corpo
    while ((rndX - snake.length) < 0) {
        rndX = Math.round(Math.random() * xLineTotal);
    }

    for (let i = 0; i < snake.length; i++) {
        snake[i] = { x: rndX - i, y: rndY };
        map[rndX - i][rndY] = "cobra";
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
    while (map[rndX][rndY] === "cobra") {
        rndX = Math.round(Math.random() * (xLineTotal - 1));
        rndY = Math.round(Math.random() * (yLineTotal - 1));
    }

    map[rndX][rndY] = "fruta";
}

function generateRandomXY() {
    rndX = Math.round(Math.random() * (xLineTotal - 1));
    rndY = Math.round(Math.random() * (yLineTotal - 1));
}

window.onload = function () {
    let largura = document.getElementById('campo1')
    let altura = document.getElementById('campo2')

    largura.value = 450;
    altura.value = 450;

    largura.setAttribute('validado', true);
    altura.setAttribute('validado', true);

    document.getElementById('start').disabled = false;
    document.getElementById('start').click()
}

function generateMap() {

    CanvasWidth = context.canvas.width;
    CanvasHeight = context.canvas.height;

    xLineTotal = Math.floor(CanvasWidth / girdSize); // Calcula o número de linhas do eixo x
    yLineTotal = Math.floor(CanvasHeight / girdSize); // Calcula o número de linhas do eixo y

    map = new Array(xLineTotal);
    for (let i = 0; i < map.length; i++) {
        map[i] = new Array(yLineTotal);
    }
}

