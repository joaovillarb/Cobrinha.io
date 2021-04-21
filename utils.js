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

function validaX(){ 
  var x = document.getElementById('campo1').value;
  if(x < 300 || x > 720){
    document.getElementById('campo1').value = "";
    document.getElementById('campoHiden1').value = "0";
    alert('Numero invalido inválido');
    validaCampos();
    return;
  }
  document.getElementById('campoHiden1').value = "1";
  validaCampos();
}

function validaY(){
 
  var x = document.getElementById('campo2').value;
  if(x < 300 || x > 720){
    document.getElementById('campo2').value = "";
    document.getElementById('campoHiden2').value = "0";
    alert('Numero invalido inválido');
    validaCampos();
    return;
  }
  document.getElementById('campoHiden2').value = "1";
  validaCampos();
}

function validaCampos(){
  var x = document.getElementById('campoHiden1').value;
  var y = document.getElementById('campoHiden2').value;
  if(x == 1 && y == 1){
    document.getElementById('start').disabled = false;
  }else{
    document.getElementById('start').disabled = true;
  }
}

