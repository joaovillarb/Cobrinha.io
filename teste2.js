const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const girdSize = 10;

let CanvasWidth;
let CanvasHeight;
let xLineTotal;
let yLineTotal;

let map;
let snake = new Array(3);


let WIDTH;//window.innerWidth;
let HEIGHT;//window.innerHeight;

function initCanvas() {
    WIDTH = 600;
    HEIGHT = 200;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    document.body.appendChild(canvas);
    generateGrid();

    generateSnake();
    console.log(map)

    drawGame();
}

function drawGame() {
    // context.clearRect(0, 0, canvas.width, canvas.height);
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
}

function drawMain() {
    context.lineWidth = 2;
    context.strokeStyle = 'black';

    context.strokeRect(2, 20, canvas.width - 2, canvas.height - 20);
}

function generateSnake() {
    yLineTotal = Math.floor(CanvasHeight / girdSize);
    xLineTotal = Math.floor(CanvasWidth / girdSize);

    // Gera em uma posição aleatória
    var rndX = Math.round(Math.random() * (xLineTotal - 1)),
        rndY = Math.round(Math.random() * (yLineTotal - 1));

    // Vamos ter certeza de que não estamos fora dos limites, pois também precisamos criar espaço para acomodar o
    // outras duas peças do corpo
    while ((rndX - snake.length) < 0) {
        rndX = Math.round(Math.random() * xLineTotal);
    }

    for (let i = 0; i < snake.length; i++) {
        snake[i] = { x: rndX - i, y: rndY };
        map[rndX - i][rndY] = 2;
    }
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
    console.log('linha - ' + xLineTotal);
    for (let j = 0; j < xLineTotal; j++) {
        context.beginPath(); // Open the path and set different styles
        context.moveTo(girdSize * j, 0);
        context.lineTo(girdSize * j, CanvasHeight);
        context.strokeStyle = "#ccc"; // Set the color of each line
        context.stroke();
    }

    yLineTotal = Math.floor(CanvasHeight / girdSize); // Calcula o número de linhas do eixo y
    console.log('coluna - ' + yLineTotal);
    for (let i = 0; i < yLineTotal; i++) {
        context.beginPath(); // Open the path and set different styles
        context.moveTo(0, girdSize * i - 0.5); // -0.5 is to solve the problem of pixel blur
        context.lineTo(CanvasWidth, girdSize * i - 0.5);
        context.strokeStyle = "#ccc"; // Set the color of each line
        context.stroke();
    }

    map = new Array(xLineTotal);
    for (let i = 0; i < map.length; i++) {
        map[i] = new Array(yLineTotal);
    }
}

