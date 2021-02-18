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

const urlFull =
  "https://webapp-210130211157.azurewebsites.net/webresources/mitienda";

/**
 * Función encargada de mostrar un loader, para posteriormente mostrar las tiendas a través de una petición Fetch al elegir la opción de AJAX
 * (funciona como plantilla principal).
 */
function todasTiendasFetchInicio() {
  loader();
  fetch(urlFull)
    .then((resp) => resp.json())
    .then(function (data) {
      let tiendas = data;
      templateBody();
      var botonTienda = document.getElementById("nueva-tienda");
      botonTienda.addEventListener("click", nuevaTienda);
      var botonBusqueda = document.getElementById("buscador");
      botonBusqueda.addEventListener("click", filtroTiendasFetch);
      tiendas.forEach((element) => crearElementos(element));
    })
    .catch(function () {
      eliminarNodos("eleccion-consulta");
      errorTienda(
        "eleccion-consulta",
        "Ha habido un error en la petición de la base de datos."
      );
    });
}

/**
 * Función encargada de mostrar las tiendas a través de una petición Fetch.
 */
function todasTiendasFetch() {
  fetch(urlFull)
    .then((resp) => resp.json())
    .then(function (data) {
      let tiendas = data;
      tiendas.forEach((element) => crearElementos(element));
    })
    .catch(function () {
      eliminarNodos("contenido-tiendas");
      errorTienda(
        "contenido-tiendas",
        "Ha habido un error en la petición de la base de datos."
      );
    });
  var botonBusqueda = document.getElementById("buscador");
  botonBusqueda.addEventListener("click", filtroTiendasFetch);
}

/**
 * Función encargada de mostrar una tienda a través de la filtración por Id introducida por teclado utilizando Fetch.
 */
function filtroTiendasFetch() {
  eliminarNodos("contenido-tiendas");
  var numeroId = document.getElementById("texto-buscador").value;
  if (numeroId.trim() != "") {
    var url =
      "https://webapp-210130211157.azurewebsites.net/webresources/mitienda/" +
      numeroId;
    loaderButton();
    fetch(url)
      .then((resp) => resp.json())
      .then(function (data) {
        let tiendas = data;
        crearElementos(tiendas);
      })
      .catch(function () {
        errorTienda("contenido-tiendas", "Tienda no encontrada");
      });
  } else {
    errorTienda("contenido-tiendas", "Tienda no encontrada");
  }
  var buscador = document.getElementById("buscador");
  buscador.removeEventListener("click", filtroTiendasFetch);
  buscador.addEventListener("click", borrarBusquedaFetch);
  buscador.disabled = false;
  $("#lupa").removeClass("fa fa-search");
  $("#lupa").html("x");
  $("#texto-buscador").val("");
}

/**
 * Función encargada de introducir una tienda a través de un formulario, con valores introducidos por teclado utilizando Fetch.
 */
function postTiendasFetch() {
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
    loaderButtonTienda();
    fetch(urlFull, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: peticion,
    })
      .then(function () {
        eliminarNodos("contenido-tienda");
        todasTiendasFetch();
        var buscador = document.getElementById("aniadir-tienda");
        buscador.disabled = false;
        $("#aniadir-tienda").html(`Añadir Tienda`);
      })
      .catch(function () {
        eliminarNodos("contenido-tiendas");
        errorTienda("contenido-tiendas", "Tienda no encontrada");
        var buscador = document.getElementById("aniadir-tienda");
        buscador.disabled = false;
        $("#aniadir-tienda").html(`Añadir Tienda`);
      });
    $(":input").val("");
  }
}

/**
 * Función encargada de borrar la busqueda realizada por filtración Fetch.
 */
function borrarBusquedaFetch() {
  var buscador = document.getElementById("buscador");
  buscador.removeEventListener("click", borrarBusquedaFetch);
  borrarBusqueda();
  todasTiendasFetch();
}

export { todasTiendasFetchInicio, postTiendasFetch };
