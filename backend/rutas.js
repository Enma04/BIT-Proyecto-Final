/*
    Este archivo lo único que hace es crear las api's que se van a consumir, con
    su respectiva dirección de la pgáina web para hacer las peticiones (dirección)
    y utiliza la información proveniente de "controladoresUsuarios.js"
    ESTE ARCHIVO PUEDE IR PERFECTAMENTE EN "app.js"
*/

const { response } = require("express");

var usuariosRutas = require(__dirname + "/controladores/controladorUsuarios.js").controladorUsuariosExport;

var productosRutas = require(__dirname + "/controladores/controladorProductos.js").controladorProductosExport;

var carritoRutas = require(__dirname + "/controladores/controladorCarrito.js").controladorCarritoExport;

//Middlewear valida que la sesión esté activa para usar alguna appi
var validarSesion = function (peticion, respuesta, next) {
  if (
    peticion.session._id == undefined || peticion.session._id == "" || peticion.session._id == null || peticion.session._id == " ") {
    respuesta.json({
      state: false,
      mensaje: "Su sesión ha caducado, por favor ingrese nuevamente",
      redireccion: true,
    });
    return false;
  } else {
    next();
    return true;
  }
};








/*
---------------------//---------------------------------//-------------- 
------------//--------------APIS USUARIO DE TIPO (C.R.U.D)-----------//--------- 
---------------------//---------------------------------//--------------
*/

// Api CREATE
app.post("/Cliente/Guardar", function (peticion, respuesta) {
  usuariosRutas.Guardar(peticion, respuesta);
});

// Api READ
app.post("/Cliente/ListarUsuarios", /*validarSesion, */ function (peticion, respuesta) {
    usuariosRutas.ListarUsuarios(peticion, respuesta);
  }
);

// Api UPDATE
app.post("/Cliente/Modificar", function (peticion, respuesta) {
  usuariosRutas.Modificar(peticion, respuesta);
});

// Api DELETE
app.post("/Cliente/Eliminar", function (peticion, respuesta) {
  usuariosRutas.Eliminar(peticion, respuesta);
});




//---------------------------------------------------------------------------------------
// API'S ADICIONALES
//---------------------------------------------------------------------------------------

// Api READ de 1 usuario
app.post("/Cliente/ListarUsuario", function (peticion, respuesta) {
  usuariosRutas.ListarUsuario(peticion, respuesta);
});

// Api Login (no se usa)
app.post("/Cliente/Login", function (peticion, respuesta) {
  usuariosRutas.Login(peticion, respuesta);
});

// Api Login usuario normal
app.post("/Cliente/LoginUsuario", function (peticion, respuesta) {
  usuariosRutas.LoginUsuario(peticion, respuesta);
});

// Api ver cookies de sesion
app.post("/Cliente/MostrarCookies", function (peticion, respuesta) {
  usuariosRutas.MostrarCookies(peticion, respuesta);
});

// Api para cerrar sesion
app.post("/Cliente/CerrarSesion", function (peticion, respuesta) {
  usuariosRutas.CerrarSesion(peticion, respuesta);
});

// Api para definir opciones del menú lateral
app.post("/Cliente/MenuDefinido", validarSesion, function (peticion, respuesta) {
    usuariosRutas.MenuDefinido(peticion, respuesta);
  }
);










/*
---------------------//---------------------------------//-------------- 
------------//--------------APIS SERVICIOS DE TIPO (C.R.U.D)-----------//--------- 
---------------------//---------------------------------//--------------
*/

// Api CREATE
app.post("/Servicio/GuardarProducto", function (peticion, respuesta) {
  productosRutas.GuardarProducto(peticion, respuesta);
});

// Api READ
app.post("/Servicio/ListarProductos", /*validarSesion, */ function (peticion, respuesta) {
  productosRutas.ListarProductos(peticion, respuesta);
});

// Api UPDATE
app.post("/Servicio/ModificarProducto", function (peticion, respuesta) {
  productosRutas.ModificarProducto(peticion, respuesta);
});

// Api DELETE
app.post("/Servicio/EliminarProducto", function (peticion, respuesta) {
  productosRutas.EliminarProducto(peticion, respuesta);
});




//---------------------------------------------------------------------------------------
// API'S ADICIONALES
//---------------------------------------------------------------------------------------

// Api READ de 1 Servicio
app.post("/Servicio/ListarServicio", function (peticion, respuesta) {
  productosRutas.ListarProducto(peticion, respuesta);
});







/*
---------------------//---------------------------------//--------------------------//--------- 
------------//--------------APIS DEL CARRITO DE COMPRAS DE TIPO (C.R.U.D)-----------//--------- 
---------------------//---------------------------------//--------------------------//---------
*/

// Api CREATE
app.post("/Carrito/AdicionarAlCarrito", function (peticion, respuesta) {
  carritoRutas.AdicionarAlCarrito(peticion, respuesta);
});

// Api READ
app.post("/Carrito/ListarMiCarrito", /*validarSesion, */ function (peticion, respuesta) {
    carritoRutas.ListarMiCarrito(peticion, respuesta);
  }
);

// Api UPDATE
app.post("/Carrito/ActualizarCantidad", function (peticion, respuesta) {
  carritoRutas.ActualizarCantidad(peticion, respuesta);
});

// Api DELETE
app.post("/Carrito/EliminarItem", function (peticion, respuesta) {
  carritoRutas.EliminarItem(peticion, respuesta);
});









//--------------------------------------------------------------------------
//PRUEBAS PARA VER EN POSTMAN
//--------------------------------------------------------------------------

// Api Login desde postman (todo en rutas.js)
/*

app.post("/Cliente/LoginPostman", function (peticion,respuesta) {
    peticion.session.nombre = peticion.body.nombre;
    respuesta.json({ state: true });
})

// Api ver cookies
app.post("/Cliente/VerCookies", function (peticion,respuesta) {
    respuesta.json({ clave: peticion.session });
})

*/
