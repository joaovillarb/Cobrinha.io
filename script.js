const canvas = document.createElement("canvas")
const context = canvas.getContext("2d")

const box = 19

let food = { x: Math.random() * (box - 1) + 1, y: Math.floor(Math.random() * (box - 1) + 1) * box }

let snake = new Array(3);

window.onload = function () {
    console.log(food)
    var score = 0,
        level = 0,
        direction = 0,
        active = true,
        speed = 400;


    // Initialize the matrix.
    var map = new Array(30);
    for (var i = 0; i < map.length; i++) {
        map[i] = new Array(30);
    }

    canvas.width = 604;
    canvas.height = 654;

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);

    // Add the snake
    map = generateSnake(map);

    // Add the food
    // map = generateFood(map);

    drawGame();
    drawFood();

    window.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp' && direction !== 3) {
            direction = 2; // Up
        } else if (e.key === 'ArrowDown' && direction !== 2) {
            direction = 3; // Down
        } else if (e.key === 'ArrowLeft' && direction !== 0) {
            direction = 1; // Left
        } else if (e.key === 'ArrowRight' && direction !== 1) {
            direction = 0; // Right
        }
    });

    function drawGame() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log('game')
        for (var i = snake.length - 1; i >= 0; i--) {
            if (i === 0) {
                switch (direction) {
                    case 0: // Right
                        snake[0] = { x: snake[0].x + 1, y: snake[0].y }
                        break;
                    case 1: // Left
                        snake[0] = { x: snake[0].x - 1, y: snake[0].y }
                        break;
                    case 2: // Up
                        snake[0] = { x: snake[0].x, y: snake[0].y - 1 }
                        break;
                    case 3: // Down
                        snake[0] = { x: snake[0].x, y: snake[0].y + 1 }
                        break;
                }

                if (snake[0].x < 0 ||
                    snake[0].x >= map.length ||
                    snake[0].y < 0 ||
                    snake[0].y >= map.length) {
                    showGameOver();
                    return;
                }

                if (map[snake[0].x][snake[0].y] === 1) {
                    score += 10;
                    map = generateFood(map);
                    drawFood();

                    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
                    map[snake[snake.length - 1].x][snake[snake.length - 1].y] = 2;

                    if ((score % 100) == 0) {
                        level += 1;
                    }

                } else if (map[snake[0].x][snake[0].y] === 2) {
                    console.log('entrou 2')
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
        drawFood();
        toEat();
        for (var x = 0; x < map.length; x++) {
            for (var y = 0; y < map[0].length; y++) {
                if (map[x][y] === 1) {
                    context.fillStyle = 'black';
                    context.fillRect(x * 10, y * 10 + 20, 10, 10);
                } else if (map[x][y] === 2) {
                    context.fillStyle = 'orange';
                    context.fillRect(x * 10, y * 10 + 20, 10, 10);
                }
            }
        }

        if (active) {
            setTimeout(drawGame, 100);
        }
    }


    function drawMain() {
        context.lineWidth = 2; // Nossa borda terá uma espessura de 2 pixels
        context.strokeStyle = 'black'; // A borda também será preta

        // A borda é desenhada do lado de fora do retângulo, então vamos
        // precisa movê-lo um pouco para a direita e para cima. Além disso, vamos precisar
        // para deixar um espaço de 20 pixels no topo para desenhar a interface.
        context.strokeRect(2, 20, canvas.width - 3, canvas.height - 24);

        context.fillStyle = 'black';
        context.font = '12px sans-serif';
        context.fillText('Score: ' + score + ' - Level: ' + level, 2, 12);
    }

    function generateFood(map) {
        // Gere uma posição aleatória para as linhas e colunas.
        var rndX = Math.round(Math.random() * 19),
            rndY = Math.round(Math.random() * 19);

        // Também precisamos vigiar para não colocar a comida
        // na mesma posição da matriz ocupada por uma parte do
        // corpo da cobra.
        while (map[rndX][rndY] === 2) {
            rndX = Math.round(Math.random() * 19);
            rndY = Math.round(Math.random() * 19);
        }

        map[rndX][rndY] = 1;

        return map;
    }

    function generateSnake(map) {
        // Gere uma posição aleatória para a linha e a coluna do cabeçalho.
        var rndX = Math.round(Math.random() * 19),
            rndY = Math.round(Math.random() * 19);

        // Vamos ter certeza de que não estamos fora dos limites, pois também precisamos criar espaço para acomodar o
        // outras duas peças do corpo
        while ((rndX - snake.length) < 0) {
            rndX = Math.round(Math.random() * 19);
        }

        for (var i = 0; i < snake.length; i++) {
            snake[i] = { x: rndX - i, y: rndY };
            map[rndX - i][rndY] = 2;
        }

        return map;
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
};

function drawFood() {
    console.log('food')
    context.fillStyle = "#4c4c4c"
    context.fillRect(food.x, food.y, 10, 10)
}

function toEat() {
    console.log(snake);
    console.log("x " + snake[0].x);
    console.log("x " + food.x);
    console.log("y " + snake[0].y);
    console.log("y " + food.y);
    if (snake[0].x == food.x && snake[0].y == food.y) {
        // snake.unshift({ x: box, y: box })
        food = { x: Math.floor(Math.random() * (box - 1) + 1), y: Math.floor(Math.random() * (box - 1) + 1) }
        return;
    }

    // snake.pop()
}