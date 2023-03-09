var productosController = {};

var modelProductos = require(__dirname +
  "/../modelos/modelProductos.js").modelProductosExport;

/*
---------------------//---------------------------------//-------------- 
------------//--------------APIS DE TIPO (C.R.U.D)-----------//--------- 
---------------------//---------------------------------//--------------
*/

//Api Guardar
productosController.GuardarProducto = function (peticion, respuesta) {
  //Guardamos los datos recolectados desde el body (desde la página web)
  //para realizar las respectivas verificaciones
  let data = {
    codigo: peticion.body.codigo,
    nombre: peticion.body.nombre,
    precio: peticion.body.precio,
  };

  //VALIDACIONES DE LOS DATOS
  //CÓDIGO PRODUCTO
  if (
    data.codigo == "" || data.codigo == null || data.codigo == undefined || data.codigo == " ") {
    respuesta.json({ state: false, mensaje: "El campo código es obligatorio" });
    return false;
  }

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

  modelProductos.GuardarProducto(data, function (res) {
    respuesta.json(res);
  });
}; //Fin api Guardar

//Api ListarProductos
productosController.ListarProductos = function (peticion, respuesta) {
  modelProductos.ListarProductos(null, function (res) {
    respuesta.json(res);
  });
}; //Fin api Listar productos

//Api Modificar
productosController.ModificarProducto = function (peticion, respuesta) {

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
  modelProductos.ModificarProducto(data, function (res) {
    respuesta.json(res);
  });
}; //Fin api Modificar

//Api Eliminar
productosController.EliminarProducto = function (peticion, respuesta) {

  let data = {
    codigo: peticion.body.codigo,
  };

  //VALIDACIONES
  //CODIGO
  if (
    data.codigo == "" || data.codigo == null || data.codigo == undefined || data.codigo == " ") {
    respuesta.json({ state: false, mensaje: "El campo código es obligatorio" });
    return false;
  }

  //Respuesta del servidor
  modelProductos.EliminarProducto(data, function (res) {
    respuesta.json(res);
  });
}; //Fin api Eiliminar


//---------------------------------------------------------------------------------------
// API'S ADICIONALES
//---------------------------------------------------------------------------------------

//Api ListarUsuario, tipo READ de 1 usuario
productosController.ListarProducto = function (peticion, respuesta) {
  let data = { codigo: peticion.body.codigo };

  if (
    data.codigo == "" ||
    data.codigo == null ||
    data.codigo == undefined ||
    data.codigo == " "
  ) {
    respuesta.json({
      state: false,
      mensaje: "El campo código no puede estar vacío",
    });
    return false;
  } else {
    modelProductos.ListarProducto(data, function (res) {
      console.log(res);
      respuesta.json(res);
    });
  }
}; //Fin api Listar usuario



//---------------------------------------------------------------------------------------
//EXPORTAMOS LA VARIABLE QUE CONTIENE LA INFORMACIÓN
//---------------------------------------------------------------------------------------
module.exports.controladorProductosExport = productosController;
