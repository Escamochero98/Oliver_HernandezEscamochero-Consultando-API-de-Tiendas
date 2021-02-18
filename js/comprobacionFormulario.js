/**
 * Función encargada de comprobar si el valor del inpt está vacío mediante la propiedad validity.
 */
function comprobarVacio() {
  var evento = event.target;
  var sitioError = evento.nextElementSibling;
  if (evento.validity.valueMissing) {
    var mensajeError = "Campo requerido.";
    crearMensajeError(evento, mensajeError, sitioError);
  } else {
    borrarMensajeError(evento, sitioError);
  }
}

/**
 * Función encargada de comprobar si el valor del input está vacío mediante la propiedad validity al enviar el formulario.
 */
function comprobarVacioEnviar(elemento) {
  var sitioError = elemento.nextElementSibling;
  if (elemento.validity.valueMissing) {
    var mensajeError = "Campo requerido.";
    crearMensajeError(elemento, mensajeError, sitioError);
  } else {
    borrarMensajeError(elemento, sitioError);
  }
}

/**
 * Función encargada de comprobar si el valor del input está vacío y cumple el formato mediante la propiedad validity.
 */
function comprobarTelefono() {
  var evento = event.target;
  var sitioError = evento.nextElementSibling;
  if (evento.validity.valueMissing) {
    var mensajeError = "Campo requerido.";
    crearMensajeError(evento, mensajeError, sitioError);
  } else {
    if (evento.validity.patternMismatch) {
      var mensajeError =
        "El teléfono ha de tener 9 cifras y emepezar por 6, 8 o 9.";
      crearMensajeError(evento, mensajeError, sitioError);
    } else {
      borrarMensajeError(evento, sitioError);
    }
  }
}

/**
 * Función encargada de comprobar si el valor del input está vacío y cumple el formato mediante la propiedad validity al enviar el formulario.
 */
function comprobarTelefonoEnviar(elemento) {
  var sitioError = elemento.nextElementSibling;
  if (elemento.validity.valueMissing) {
    var mensajeError = "Campo requerido.";
    crearMensajeError(elemento, mensajeError, sitioError);
  } else {
    if (elemento.validity.patternMismatch) {
      var mensajeError =
        "El teléfono ha de tener 9 cifras y emepezar por 6, 8 o 9.";
      crearMensajeError(elemento, mensajeError, sitioError);
    } else {
      borrarMensajeError(elemento, sitioError);
    }
  }
}

/**
 * Función encargada de llamar a demás funciones de comprobación para verificar que el formato de los valores del formulario es el adecuado.
 */
function comprobarEnvio() {
  var nombre = document.getElementById("nombre-empresa");
  var direccion = document.getElementById("direccion-empresa");
  var localidad = document.getElementById("localidad-empresa");
  var telefono = document.getElementById("telefono-empresa");
  comprobarVacioEnviar(nombre);
  comprobarVacioEnviar(direccion);
  comprobarVacioEnviar(localidad);
  comprobarTelefonoEnviar(telefono);
}

/**
 * Función encargada de crear e introducir los mensajes de error en los inputs del formulario.
 */
function crearMensajeError(evento, mensajeError, sitioError) {
  var id = removeClass(evento);

  $(id).addClass("error-borde");
  sitioError.innerHTML = mensajeError;
}

/**
 * Función encargada de borrar los mensajes de error en los inputs del formulario si estos cumplen un determinado formato.
 */
function borrarMensajeError(evento, sitioError) {
  var id = removeClass(evento);

  if (evento.value == "") {
    $(id).addClass("error-borde");
    sitioError.innerHTML = "Campo obligatorio";
  } else {
    $(id).addClass("acierto");
    sitioError.innerHTML = "";
  }
}

/**
 * Función encargada de eliminar la clase con el fin de cambiar el estilo del mensaje de error.
 */
function removeClass(evento) {
  var clase = $(evento).attr("class");
  var id = "#" + evento.id;
  $(id).removeClass(clase);
  return id;
}

export { comprobarVacio, comprobarTelefono, comprobarEnvio };
