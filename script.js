window.onload = function () {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        score = 0,
        level = 0,
        direction = 0,
        snake = new Array(3),
        active = true,
        speed = 400;

    // Initialize the matrix.
    var map = new Array(20);
    for (var i = 0; i < map.length; i++) {
        map[i] = new Array(20);
    }

    canvas.width = 204;
    canvas.height = 224;

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);

    // Add the snake
    map = generateSnake(map);

    // Add the food
    map = generateFood(map);

    drawGame();

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
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Percorra todas as partes do corpo da cobra, começando pela última
        for (var i = snake.length - 1; i >= 0; i--) {

            // Vamos apenas realizar a detecção de colisão usando a cabeça
            // então será tratado de forma diferente do resto
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

                // Verifique se não está fora dos limites. Se for mostrar o jogo em pop-up
                // e saia da função.
                if (snake[0].x < 0 ||
                    snake[0].x >= 20 ||
                    snake[0].y < 0 ||
                    snake[0].y >= 20) {
                    showGameOver();
                    return;
                }

                // Detecte se acertamos em comida e aumente a pontuação se o fizermos,
                // gerando uma nova posição de alimento no processo, e também
                // adicionando um novo elemento ao array snake.
                if (map[snake[0].x][snake[0].y] === 1) {
                    score += 10;
                    map = generateFood(map);

                    // Adicione uma nova peça de corpo à matriz
                    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });
                    map[snake[snake.length - 1].x][snake[snake.length - 1].y] = 2;

                    // Se a pontuação for um multiplicador de 100 (como 100, 200, 300, etc.)
                    // aumenta o nível, o que o tornará mais rápido.
                    if ((score % 100) == 0) {
                        level += 1;
                    }

                    // Vamos também verificar se a cabeça não está batendo em outra parte do corpo
                    // em caso afirmativo, também precisamos encerrar o jogo.
                } else if (map[snake[0].x][snake[0].y] === 2) {
                    showGameOver();
                    return;
                }

                map[snake[0].x][snake[0].y] = 2;
            } else {
                // Lembre-se de que quando eles se movem, os pedaços do corpo se movem para o lugar
                // onde a peça anterior costumava estar. Se for a última peça,
                // também precisa limpar a última posição da matriz
                if (i === (snake.length - 1)) {
                    map[snake[i].x][snake[i].y] = null;
                }

                snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y };
                map[snake[i].x][snake[i].y] = 2;
            }
        }

        // Desenhe a borda, bem como a pontuação
        drawMain();

        // Comece a ciclar a matriz
        for (var x = 0; x < map.length; x++) {
            for (var y = 0; y < map[0].length; y++) {
                if (map[x][y] === 1) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
                } else if (map[x][y] === 2) {
                    ctx.fillStyle = 'orange';
                    ctx.fillRect(x * 10, y * 10 + 20, 10, 10);
                }
            }
        }

        if (active) {
            setTimeout(drawGame, speed - (level * 50));
        }
    }


    function drawMain() {
        ctx.lineWidth = 2; // Nossa borda terá uma espessura de 2 pixels
        ctx.strokeStyle = 'black'; // A borda também será preta

        // A borda é desenhada do lado de fora do retângulo, então vamos
        // precisa movê-lo um pouco para a direita e para cima. Além disso, vamos precisar
        // para deixar um espaço de 20 pixels no topo para desenhar a interface.
        ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);

        ctx.fillStyle = 'black';
        ctx.font = '12px sans-serif';
        ctx.fillText('Score: ' + score + ' - Level: ' + level, 2, 12);
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
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'black';
        ctx.font = '16px sans-serif';

        ctx.fillText('Fim de jogo!', ((canvas.width / 2) - (ctx.measureText('Fim de jogo!').width / 2)), 50);

        ctx.font = '12px sans-serif';

        ctx.fillText('Sua pontuação foi: ' + score, ((canvas.width / 2) - (ctx.measureText('Sua pontuação foi: ' + score).width / 2)), 70);

    }
};