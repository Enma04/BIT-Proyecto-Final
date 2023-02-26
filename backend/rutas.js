/*
 Este archivo lo único que hace es crear las api's que se van a consumir, con
 su respectiva dirección de la pgáina web para hacer las peticiones (dirección)
 y utiliza la información proveniente de "controladoresUsuarios.js"
 ESTE ARCHIVO PUEDE IR PERFECTAMENTE EN "app.js"
*/

const { response } = require("express");

var usuariosRutas = require(__dirname + "/controladores/controladorUsuarios.js").controladorUsuariosExport

//Middlewear valida que la sesión esté activa para usar alguna appi
var validarSesion = function (peticion, respuesta, next) {
    if (peticion.session.nombre == undefined || peticion.session.nombre == "" || peticion.session.nombre == null || peticion.session.nombre == " ") {
        respuesta.json({ state: false, mensaje: "Su sesión ha caducado" });
        return false;
    }
    else {
        next();
    }
}






/*
---------------------//---------------------------------//-------------- 
------------//--------------APIS DE TIPO (C.R.U.D)-----------//--------- 
---------------------//---------------------------------//--------------
*/

// Api CREATE
app.post("/Cliente/Guardar", function (peticion, respuesta) {
    usuariosRutas.Guardar(peticion, respuesta);
})

// Api READ
app.post("/Cliente/ListarUsuarios", /*validarSesion, */function (peticion,respuesta) {
    usuariosRutas.ListarUsuarios(peticion, respuesta);
})

// Api UPDATE
app.post("/Cliente/Modificar", function (peticion, respuesta) {
    usuariosRutas.Modificar(peticion, respuesta);
})

// Api DELETE
app.post("/Cliente/Eliminar", function (peticion, respuesta) {
    usuariosRutas.Eliminar(peticion, respuesta);
})







//---------------------------------------------------------------------------------------
// API'S ADICIONALES
//---------------------------------------------------------------------------------------

// Api READ de 1 usuario
app.post("/Cliente/ListarUsuario", function (peticion,respuesta) {
    usuariosRutas.ListarUsuario(peticion, respuesta);
})

// Api Login (no se usa)
app.post("/Cliente/Login", function (peticion,respuesta) {
    usuariosRutas.Login(peticion, respuesta);
})

// Api Login usuario normal
app.post("/Cliente/LoginUsuario", function (peticion,respuesta) {
    usuariosRutas.LoginUsuario(peticion, respuesta);
})

// Api ver cookies de sesion
app.post("/Cliente/MostrarCookies", function (peticion,respuesta) {
    usuariosRutas.MostrarCookies(peticion, respuesta);
})





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