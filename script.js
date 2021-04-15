window.onload = function () {
    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    canvas.width = 204;
    canvas.height = 224;

    var body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);

    ctx.lineWidth = 2; //  expessura da borda 2 pixels
    ctx.strokeStyle = 'black'; // cor da borda

    // A borda desenhada do lado de fora do retângulo
    // espaço no topo para escrever a interface - score e level.
    ctx.strokeRect(2, 20, canvas.width - 4, canvas.height - 24);


};