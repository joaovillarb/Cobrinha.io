window.onload = function () {
    var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d'),
        score = 0,
        level = 0,
        direction = 0,
        snake = new Array(3),
        active = true,
        speed = 400;

    canvas.width = 604;
    canvas.height = 624;

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);


    var headSnake = {
        x: 10,
        y: 10,
        largura: 10,
        altura: 10
    }

    var bodySnake = {
        x: 20,
        y: 10,
        largura: 20,
        altura: 10
    }

    // // Add length body parts
    // for (var i = 0; i < length; i++) {
    //     var body = new THREE.Mesh(geometry, material);
    //     body.position.x = snake[i].position.x - TILE_SIZE;
    //     body.position.y = snake[i].position.y;
    //     scene.add(body);
    //     snake.push(body);
    // }


    //Our draw came here
    const render = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)
        context.fillStyle = 'red'
        context.fillRect(headSnake.x, headSnake.y, headSnake.largura, headSnake.altura);
        context.fillStyle = 'orange'
        context.fillRect((headSnake.x + bodySnake.x) - 10, (headSnake.y + bodySnake.y) - 10, bodySnake.largura, bodySnake.altura);
    }

    update()

    window.addEventListener('keydown', keyDownHandler);

    function keyDownHandler(e) {
        let key = e.key;
        if (key === 'ArrowUp' && direction !== 3) {
            direction = 2; // Up
            headSnake.y = headSnake.y - 5
        }
        if (key === 'ArrowDown' && direction !== 2) {
            direction = 3; // Down
            headSnake.y = headSnake.y + 5
        }

        if (key === 'ArrowLeft' && direction !== 0) {
            direction = 1; // Left
            headSnake.x = headSnake.x - 5
        }

        if (key === 'ArrowRight' && direction !== 1) {
            direction = 0; // Right
            headSnake.x = headSnake.x + 5
        }
        render()
    }

    function move() {
        if (direction == 2) {
            headSnake.y--;
        }
        if (direction == 3) {
            headSnake.y++;
        }
        if (direction == 1) {
            headSnake.x--;
        }
        if (direction == 0) {
            headSnake.x++;
        }
    }

    function update() {
        requestAnimationFrame(update, canvas)
        move()
        render()
    }

};