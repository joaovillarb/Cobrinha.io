function onlynumber(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;

  key = String.fromCharCode(key);
  // console.log(key);
  var regex = /^[0-9.,]+$/;
  if (!regex.test(key)) {
    theEvent.returnValue = false;
    if (theEvent.preventDefault) theEvent.preventDefault();
  }
}

function valida(campo) {
  var x = campo.value;
  if (x < 300 || x > 720) {
    campo.classList.add("error");
    campo.setAttribute('validado', false);
    $.notify('O valor precisa estar entre 300 e 720');
    validaCampos();
    return;
  }
  campo.classList.remove("error");
  campo.setAttribute('validado', true);
  validaCampos();
}

function validaCampos() {
  var largura = document.getElementById('campo1').getAttribute('validado');
  var altura = document.getElementById('campo2').getAttribute('validado');

  if (largura == 'true' && altura == 'true') {
    document.getElementById('start').disabled = false;
  } else {
    document.getElementById('start').disabled = true;
  }
}