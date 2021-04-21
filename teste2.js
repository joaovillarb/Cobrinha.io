var WIDTH, HEIGHT;

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

function initCanvas() {
    WIDTH = 300;//window.innerWidth;
    HEIGHT = 200;//window.innerHeight;

    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    document.body.appendChild(canvas);
    generateGrid();
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
    var girdSize = 10;

    // 2. Get the width and height of Canvas
    var CanvasWidth = context.canvas.width;
    var CanvasHeight = context.canvas.height;

    console.log(CanvasWidth)
    console.log(CanvasHeight)

    // 3. Using traversal, draw the lines of the x-axis
    var xLineTotals = Math.floor(CanvasHeight / girdSize); // Calculate the number of x-axis lines that need to be drawn
    console.log('linha - ' + xLineTotals);
    for (var i = 0; i < xLineTotals; i++) {
        context.beginPath(); // Open the path and set different styles
        context.moveTo(0, girdSize * i - 0.5); // -0.5 is to solve the problem of pixel blur
        context.lineTo(CanvasWidth, girdSize * i - 0.5);
        context.strokeStyle = "#ccc"; // Set the color of each line
        context.stroke();
    }

    // 4. Use the traversal method to draw the y-axis line
    var yLineTotals = Math.floor(CanvasWidth / girdSize); // Calculate the number of lines that need to be drawn on the y axis
    console.log('coluna - ' + yLineTotals);
    for (var j = 0; j < yLineTotals; j++) {
        context.beginPath(); // Open the path and set different styles
        context.moveTo(girdSize * j, 0);
        context.lineTo(girdSize * j, CanvasHeight);
        context.strokeStyle = "#ccc"; // Set the color of each line
        context.stroke();
    }
}

