/*
 Este archivo lo único que hace es crear las api's que se van a consumir, con
 su respectiva dirección de la pgáina web para hacer las peticiones (dirección)
 y utiliza la información proveniente de "controladoresUsuarios.js"
 ESTE ARCHIVO PUEDE IR PERFECTAMENTE EN "app.js"
*/

const { response } = require("express");


/*
---------------------//---------------------------------//-------------- 
------------//--------------APIS DE TIPO (C.R.U.D)-----------//--------- 
---------------------//---------------------------------//--------------
*/


var usuariosRutas = require(__dirname + "/controladores/controladorUsuarios.js").controladorUsuariosExport

// Api CREATE
app.post("/Cliente/Guardar", function (peticion, respuesta) {
    usuariosRutas.Guardar(peticion, respuesta);
})

// Api READ
app.post("/Cliente/ListarUsuarios", function (peticion,respuesta) {
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



//--------------------------------------------------------------------------
//PRUEBAS PARA VER EN POSTMAN
//--------------------------------------------------------------------------

// Api Login usuario normal
app.post("/Cliente/LoginPostman", function (peticion,respuesta) {
    peticion.sesion = peticion.body.usuario;
    respuesta.json({ state: true });
})

// Api ver cookies
app.post("/Cliente/VerCookies", function (peticion,respuesta) {
    respuesta.json({ clave: peticion.sesion });
})