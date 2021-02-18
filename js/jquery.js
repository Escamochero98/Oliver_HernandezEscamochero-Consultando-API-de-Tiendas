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
 * Función encargada de mostrar un loader, para posteriormente mostrar las tiendas a través de una petición JQuery al elegir la opción de AJAX
 * (funciona como plantilla principal).
 */
function todasTiendasJQueryInicio() {
  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    beforeSend: loader(),
    success: function (data) {
      templateBody();

      data.forEach((element) => crearElementos(element));
      var botonTienda = document.getElementById("nueva-tienda");
      botonTienda.addEventListener("click", nuevaTienda);
      var botonBusqueda = document.getElementById("buscador");
      botonBusqueda.addEventListener("click", filtroTiendasJQuery);
    },
    error: function () {
      eliminarNodos("eleccion-consulta");
      errorTienda(
        "eleccion-consulta",
        "Ha habido un error en la petición de la base de datos."
      );
    },
  });
}

/**
 * Función encargada de mostrar las tiendas a través de una petición JQuery.
 */
function todasTiendasJQuery() {
  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    success: function (data) {
      data.forEach((element) => crearElementos(element));
    },
    error: function () {
      errorTienda(
        "contenido-tiendas",
        "Ha habido un error en la petición de la base de datos."
      );
    },
  });

  var botonTienda = document.getElementById("nueva-tienda");
  botonTienda.addEventListener("click", nuevaTienda);
  var botonBusqueda = document.getElementById("buscador");
  botonBusqueda.addEventListener("click", filtroTiendasJQuery);
}

/**
 * Función encargada de mostrar una tienda a través de la filtración por Id introducida por teclado utilizando JQuery.
 */
function filtroTiendasJQuery() {
  eliminarNodos("contenido-tiendas");
  var numeroId = document.getElementById("texto-buscador").value;
  if (numeroId.trim() != "") {
    var url =
      "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/" +
      numeroId;

    $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      beforeSend: loaderButton(),
      success: function (data) {
        if (data != null) {
          crearElementos(data);
        } else {
          errorTienda("contenido-tiendas", "Tienda no encontrada");
        }
      },
      error: function () {
        errorTienda("contenido-tiendas", "Tienda no encontrada");
      },
    });
  } else {
    errorTienda("contenido-tiendas", "Tienda no encontrada");
  }
  var buscador = document.getElementById("buscador");
  buscador.removeEventListener("click", filtroTiendasJQuery);
  buscador.addEventListener("click", borrarBusquedaJQuery);
  buscador.disabled = false;
  $("#lupa").removeClass("fa fa-search");
  $("#lupa").html("x");
  $("#texto-buscador").val("");
}

/**
 * Función encargada de introducir una tienda a través de un formulario, con valores introducidos por teclado utilizando JQuery.
 */
function postTiendasJQuery() {
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
    $.ajax({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      type: "POST",
      url: url,
      dataType: "json",
      beforeSend: loaderButtonTienda(),
      data: peticion,
      success: function () {
        eliminarNodos("contenido-tiendas");
        todasTiendasJQuery();
        var buscador = document.getElementById("aniadir-tienda");
        buscador.disabled = false;
        $("#aniadir-tienda").html(`Añadir Tienda`);
      },
      error: function () {
        eliminarNodos("contenido-tiendas");
        errorTienda(
          "contenido-tiendas",
          "Ha habido un error en la petición de la base de datos."
        );
        var buscador = document.getElementById("aniadir-tienda");
        buscador.disabled = false;
        $("#aniadir-tienda").html(`Añadir Tienda`);
      },
    });
    $(":input").val("");
  }
}

/**
 * Función encargada de borrar la busqueda realizada por filtración JQuery.
 */
function borrarBusquedaJQuery() {
  var buscador = document.getElementById("buscador");
  buscador.removeEventListener("click", borrarBusquedaJQuery);
  borrarBusqueda();
  todasTiendasJQuery();
}

export { todasTiendasJQueryInicio, postTiendasJQuery };
