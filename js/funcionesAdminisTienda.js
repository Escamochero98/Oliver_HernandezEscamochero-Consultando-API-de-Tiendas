import { comprobarVacio, comprobarTelefono } from "./comprobacionFormulario.js";
import { postTiendasFetch } from "./fetch.js";
import { postTiendasJQuery } from "./jquery.js";
import { postTiendasXhr } from "./xhr.js";

/**
 * Función encargada de mostrar antes de que las peticiones AJAX finalicen.
 */
function loader() {
  var consulta = document.getElementById("eleccion-consulta");
  eliminarNodos("eleccion-consulta");
  if (consulta != null) {
    consulta.innerHTML = `<div class="loader">
    <img src="./img/Rolling-1s-200px.png" alt="" id="imagen-loader" />
    </div>`;
  }
}

/**
 * Función encargada de cambiar el contenido del html una vez se elija la opción de petición AJAX.
 */
function templateBody() {
  var body = document.getElementById("cuerpo");
  var tempForm = document.getElementById("template-body");
  var clonForm = tempForm.content.cloneNode(true);
  eliminarNodos("cuerpo");
  body.appendChild(clonForm);
}

/**
 * Función encargada de mostrar un mensaje de error cuando la petición AJAX no se realice de forma exitosa.
 */
function errorTienda(sitio, mensaje) {
  var contenedor = document.getElementById(sitio);
  let errorTitulo = document.createElement("h1");
  errorTitulo.innerHTML = mensaje;
  errorTitulo.setAttribute("id", "errorTienda");
  contenedor.appendChild(errorTitulo);
}

/**
 * Función encargada de eliminar los nodos hijos de un elemento determinado.
 */
function eliminarNodos(sitio) {
  var tipoContenedor = document.getElementById(sitio);
  if (tipoContenedor != null) {
    while (tipoContenedor.firstChild) {
      tipoContenedor.removeChild(tipoContenedor.firstChild);
    }
  }
}

/**
 * Función encargada de crear los nodos hijos con la información de las peticiones a la API.
 */
function crearElementos(element) {
  var contenedor = document.getElementById("contenido-tiendas");
  let div = document.createElement("div");
  let nombreTienda = document.createElement("h1");
  let calleLocalidad = document.createElement("p");
  let telefono = document.createElement("p");
  nombreTienda.innerHTML = `${element.nombreTienda}`;
  calleLocalidad.innerHTML = `${element.direccion} (${element.localidad})`;
  telefono.innerHTML = `${element.telefono}`;
  div.appendChild(nombreTienda);
  div.appendChild(calleLocalidad);
  div.appendChild(telefono);
  contenedor.appendChild(div);
}

/**
 * Función encargada de ocultar el formulario una vez este se ha abierto.
 */
function cerrarFormulario() {
  var botonTienda = document.getElementById("nueva-tienda");
  $("#contenido-formulario").removeClass("open");
  $("#contenido-formulario").addClass("close");
  setTimeout(function () {
    $("#contenido-formulario").addClass("hide");
  }, 1000);
  botonTienda.removeEventListener("click", cerrarFormulario);
  botonTienda.addEventListener("click", nuevaTienda);
}

/**
 * Función encargada de crear y mostrar el formulario para introducir una nueva tienda.
 */
function nuevaTienda() {
  $("#contenido-formulario").removeClass("close");
  $("#contenido-formulario").removeClass("hide");
  var botonTienda = document.getElementById("nueva-tienda");
  var formulario = document.getElementById("formulario");
  if (!formulario.hasChildNodes()) {
    var tempForm = document.getElementById("template-formulario");
    var clonForm = tempForm.content.cloneNode(true);
    formulario.appendChild(clonForm);
    $("#contenido-formulario").addClass("open");
    eventosFormulario();
    tipoPost();
  } else {
    $("#contenido-formulario").addClass("open");
  }
  botonTienda.removeEventListener("click", nuevaTienda);
  botonTienda.addEventListener("click", cerrarFormulario);
}

/**
 * Función encargada de establecer eventos determinados para introducir una nueva tienda según el tipo de petición AJAX elegido.
 */
function tipoPost() {
  var htmlTipo = document.getElementsByTagName("html")[0].id;
  var aniadirBoton = document.getElementById("aniadir-tienda");
  switch (htmlTipo) {
    case "XHR":
      aniadirBoton.addEventListener("click", postTiendasXhr);
      break;
    case "JQuery":
      aniadirBoton.addEventListener("click", postTiendasJQuery);
      break;
    default:
      aniadirBoton.addEventListener("click", postTiendasFetch);
      break;
  }
}

/**
 * Función encargada de borrar la búsqueda de una filtración Id dada.
 */
function borrarBusqueda() {
  eliminarNodos("contenido-tiendas");
  $("#lupa").addClass("fa fa-search");
  $("#lupa").html("");
  $("#texto-buscador").val("");
}

/**
 * Función encargada de la comprobación del formato adecuado en el formulario.
 */
function eventosFormulario() {
  document
    .getElementById("nombre-empresa")
    .addEventListener("input", comprobarVacio);
  document
    .getElementById("direccion-empresa")
    .addEventListener("input", comprobarVacio);
  document
    .getElementById("localidad-empresa")
    .addEventListener("input", comprobarVacio);
  document
    .getElementById("telefono-empresa")
    .addEventListener("input", comprobarTelefono);
}

/**
 * Función encargada de establecer la animación de carga en el botón al realizar una petición.
 */
function loaderButton() {
  var buscador = document.getElementById("buscador");
  buscador.disabled = true;
  $("#lupa").removeClass("fa fa-search");
  $("#lupa").html(`<i class="fa fa-refresh" aria-hidden="true"></i>`);
  $("#texto-buscador").val("");
}

/**
 * Función encargada de establecer la animación de carga en el botón al introducir una tienda.
 */
function loaderButtonTienda() {
  var buscador = document.getElementById("aniadir-tienda");
  buscador.disabled = true;
  $("#aniadir-tienda").html(
    `Añadir Tienda<i class="fa fa-refresh" aria-hidden="true"></i>`
  );
  $("#texto-buscador").val("");
}

export {
  loader,
  templateBody,
  nuevaTienda,
  crearElementos,
  eliminarNodos,
  errorTienda,
  borrarBusqueda,
  loaderButton,
  loaderButtonTienda,
};
