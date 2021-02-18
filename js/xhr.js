import {
  loader,
  templateBody,
  nuevaTienda,
  crearElementos,
  eliminarNodos,
  errorTienda,
  borrarBusqueda,
  loaderButton,
  loaderButtonTienda,
} from "./funcionesAdminisTienda.js";
import { comprobarEnvio } from "./comprobacionFormulario.js";

const url =
  "https://webapp-210130211157.azurewebsites.net/webresources/mitienda";

/**
 * Función encargada de mostrar un loader, para posteriormente mostrar las tiendas a través de una petición Xhr al elegir la opción de AJAX
 * (funciona como plantilla principal).
 */
function todasTiendasXhrInicio() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && (this.status == 200 || this.status == 204)) {
      var respuesta = this.responseText;
      respuesta = JSON.parse(respuesta);
      templateBody();
      crearEventos();
      respuesta.forEach((element) => {
        crearElementos(element);
      });
    } else {
      if (this.readyState == 4 && this.status == 0) {
        eliminarNodos("eleccion-consulta");
        errorTienda(
          "eleccion-consulta",
          "Ha habido un error en la petición de la base de datos."
        );
      } else {
        loader();
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

/**
 * Función encargada de mostrar las tiendas a través de una petición Xhr.
 */
function todasTiendasXhr() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var respuesta = this.responseText;
      respuesta = JSON.parse(respuesta);
      crearEventos();
      respuesta.forEach((element) => {
        crearElementos(element);
      });
    } else {
      if (this.readyState == 4 && this.status == 0) {
        eliminarNodos("contenido-tiendas");
        errorTienda(
          "contenido-tiendas",
          "Ha habido un error en la petición de la base de datos."
        );
      }
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

/**
 * Función encargada de mostrar una tienda a través de la filtración por Id introducida por teclado utilizando Xhr.
 */
function filtroTiendasXhr() {
  eliminarNodos("contenido-tiendas");
  var numeroId = document.getElementById("texto-buscador").value;
  if (numeroId.trim() != "") {
    var urlFiltro =
      "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/" +
      numeroId;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var respuesta = this.responseText;
        try {
          respuesta = JSON.parse(respuesta);
          crearElementos(respuesta);
          cambiarLupa();
        } catch {
          errorTienda("contenido-tiendas", "Tienda no encontrada");
          cambiarLupa();
        }
      } else {
        if (
          this.readyState == 4 &&
          (this.status == 0 || this.status == 204 || this.status == 404)
        ) {
          eliminarNodos("contenido-tiendas");
          errorTienda(
            "contenido-tiendas",
            "Ha habido un error en la petición de la base de datos."
          );
          cambiarLupa();
        } else {
          loaderButton();
        }
      }
    };
    xhttp.open("GET", urlFiltro, true);
    xhttp.send();
  } else {
    errorTienda("contenido-tiendas", "Tienda no encontrada");
    cambiarLupa();
  }
}

/**
 * Función encargada de introducir una tienda a través de un formulario, con valores introducidos por teclado utilizando Xhr.
 */
function postTiendasXhr() {
  var fallo = false;
  comprobarEnvio();
  var errores = document.querySelectorAll("#error");
  errores.forEach((element) => {
    if (element.innerHTML != "") {
      fallo = true;
    }
  });
  if (!fallo) {
    var nombre = $("#nombre-empresa").val();
    var direccion = $("#direccion-empresa").val();
    var localidad = $("#localidad-empresa").val();
    var telefono = $("#telefono-empresa").val();
    var peticion = JSON.stringify({
      nombreTienda: nombre,
      direccion: direccion,
      localidad: localidad,
      telefono: telefono,
    });
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && (this.status == 200 || this.status == 204)) {
        eliminarNodos("contenido-tiendas");
        todasTiendasXhr();
        var buscador = document.getElementById("aniadir-tienda");
        buscador.disabled = false;
        $("#aniadir-tienda").html(`Añadir Tienda`);
      } else {
        if (this.readyState == 4 && (this.status == 0 || this.status == 404)) {
          eliminarNodos("contenido-tiendas");
          errorTienda(
            "contenido-tiendas",
            "Ha habido un error en la petición de la base de datos."
          );
          var buscador = document.getElementById("aniadir-tienda");
          buscador.disabled = false;
          $("#aniadir-tienda").html(`Añadir Tienda`);
        } else {
          loaderButtonTienda();
        }
      }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(peticion);
    $(":input").val("");
  }
}

/**
 * Función encargada de establecer distintos eventos a botones.
 */
function crearEventos() {
  var botonTienda = document.getElementById("nueva-tienda");
  botonTienda.addEventListener("click", nuevaTienda);
  var botonBusqueda = document.getElementById("buscador");
  botonBusqueda.addEventListener("click", filtroTiendasXhr);
}

/**
 * Función encargada de cambiar visualmente y en cuanto a contenido el botón de busqueda por filtración.
 */
function cambiarLupa() {
  var buscador = document.getElementById("buscador");
  buscador.disabled = false;
  buscador.removeEventListener("click", filtroTiendasXhr);
  buscador.addEventListener("click", borrarBusquedaXhr);
  $("#lupa").removeClass("fa fa-search");
  $("#lupa").html("x");
  $("#texto-buscador").val("");
}

/**
 * Función encargada de borrar la busqueda realizada por filtración Xhr.
 */
function borrarBusquedaXhr() {
  var buscador = document.getElementById("buscador");
  buscador.removeEventListener("click", borrarBusquedaXhr);
  borrarBusqueda();
  todasTiendasXhr();
}

export { todasTiendasXhrInicio, postTiendasXhr };
