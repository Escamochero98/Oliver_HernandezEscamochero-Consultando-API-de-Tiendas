import { todasTiendasFetchInicio, postTiendasFetch } from "./fetch.js";
import { todasTiendasJQueryInicio, postTiendasJQuery } from "./jquery.js";
import { todasTiendasXhrInicio, postTiendasXhr } from "./xhr.js";

var xhr = document.getElementById("boton-filtro-XHR");
var fetch = document.getElementById("boton-filtro-Fetch");
var jquery = document.getElementById("boton-filtro-JQuery");
var htmlTipo = document.getElementsByTagName("html")[0];

xhr.addEventListener("click", filtroTipo);
fetch.addEventListener("click", filtroTipo);
jquery.addEventListener("click", filtroTipo);

/**
 * Función encargada de establecer el tipo de petición AJAX según la opción que se elija en el indice del documento HTML.
 */
function filtroTipo() {
  var evento = event.target;
  var tipoAjax = evento.value;
  htmlTipo.setAttribute("id", tipoAjax);

  switch (tipoAjax) {
    case "XHR":
      todasTiendasXhrInicio();
      break;
    case "JQuery":
      todasTiendasJQueryInicio();
      break;
    default:
      todasTiendasFetchInicio();
      break;
  }
}
