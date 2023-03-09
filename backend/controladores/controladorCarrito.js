var carritoController = {};

var modelCarrito = require(__dirname + "/../modelos/modelCarrito.js").modelCarritoExport;


/*
---------------------//---------------------------------//-------------- 
------------//--------------APIS DE TIPO (C.R.U.D)-----------//--------- 
---------------------//---------------------------------//--------------
*/


//Api Guardar
carritoController.AdicionarAlCarrito = function (peticion, respuesta) {
  //Guardamos los datos recolectados desde el body (desde la página web)
  //para realizar las respectivas verificaciones
  let data = {
    usuario_id   : peticion.session._id,
    producto_id  : peticion.body.producto_id,
    //cantidad     : peticion.body.cantidad,
  };

  console.log(data.usuario_id);

  //VALIDACIONES DE LOS DATOS
  //ID DEL USUARIO
  if (
    data.usuario_id == "" || data.usuario_id == null || data.usuario_id == undefined || data.usuario_id == " ") {
    respuesta.json({ state: false, mensaje: "El campo usuario Id es obligatorio", data: "hola " + peticion.session._id });
    return false;
  }

  //ID DEL PRODUCTO O SERVICIO
  if (data.producto_id == "" || data.producto_id == null || data.producto_id == undefined || data.producto_id == " ") {
    respuesta.json({ state: false, mensaje: "El campo id del producto es obligatorio" });
    return false;
  }

  //CANTIDAD
  /* if (
    data.cantidad == "" || data.cantidad == null || data.cantidad == undefined || data.cantidad == " ") {
    respuesta.json({state: false, mensaje: "La cantidad del producto es obligatorio",});
    return false;
  } */

  modelCarrito.AdicionarAlCarrito(data, function (res) {
    respuesta.json(res);
  });
}; //Fin api Guardar

//Api ListarProductos
carritoController.ListarMiCarrito = function (peticion, respuesta) {

    let data = {
        usuario_id   : peticion.session._id,
    };

    //VALIDACIONES DE LOS DATOS
    //ID DEL USUARIO
    if (data.usuario_id == "" || data.usuario_id == null || data.usuario_id == undefined || data.usuario_id == " ") {
        respuesta.json({ state: false, mensaje: "El campo usuario Id es obligatorio", data: "hola " + peticion.session._id });
        return false;
    }

    modelCarrito.ListarMiCarrito(data, function (res) {
        respuesta.json(res);
    });
}; //Fin api Listar productos

//Api Modificar
carritoController.ActualizarCantidad = function (peticion, respuesta) {

  let data = {
    codigo: peticion.body.codigo,
    nombre: peticion.body.nombre,
    precio: peticion.body.precio,
  };

  //VALIDACIONES
  //NOMBRE PRODUCTO
  if (data.nombre == "" || data.nombre == null || data.nombre == undefined || data.nombre == " ") {
    respuesta.json({ state: false, mensaje: "El campo nombre es obligatorio" });
    return false;
  }
  if (data.nombre.length < 4 || data.nombre.length > 20) {
    respuesta.json({ state: false, mensaje: "El campo nombre debe tener entre 4 y 20 caracteres" });
    return false;
  }

  //PRECIO
  if (
    data.precio == "" || data.precio == null || data.precio == undefined || data.precio == " ") {
    respuesta.json({
      state: false,
      mensaje: "El campo precio es obligatorio",
    });
    return false;
  }

  //Respuesta del servidor
  modelCarrito.ActualizarCantidad(data, function (res) {
    respuesta.json(res);
  });
}; //Fin api Modificar

//Api Eliminar
carritoController.EliminarItem = function (peticion, respuesta) {

  let data = {
    _id: peticion.body.carrito_id,
  };

  //VALIDACIONES
  //CODIGO
  if (data._id == "" || data._id == null || data._id == undefined || data._id == " ") {
    respuesta.json({ state: false, mensaje: "El campo _id es obligatorio" });
    return false;
  }

  //Respuesta del servidor
  modelCarrito.EliminarItem(data, function (res) {
    respuesta.json(res);
  });
}; //Fin api Eiliminar


//---------------------------------------------------------------------------------------
// API'S ADICIONALES
//---------------------------------------------------------------------------------------




//---------------------------------------------------------------------------------------
//EXPORTAMOS LA VARIABLE QUE CONTIENE LA INFORMACIÓN
//---------------------------------------------------------------------------------------
module.exports.controladorCarritoExport = carritoController;
