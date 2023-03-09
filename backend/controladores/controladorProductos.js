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
    cedula: peticion.body.cedula,
    name: peticion.body.name,
    apellido: peticion.body.apellido,
    edad: peticion.body.edad,
    direccion: peticion.body.direccion,
    telefono: peticion.body.telefono,
    estadocivil: peticion.body.estadocivil,
    //password: peticion.body.password,
  };

  //VALIDACIONES
  //CEDULA
  if (
    data.cedula == "" || data.cedula == null || data.cedula == undefined || data.cedula == " ") {
    respuesta.json({ state: false, mensaje: "El campo cedula es obligatorio" });
    return false;
  }

  /*   if (
    data.password == "" ||
    data.password == null ||
    data.password == undefined ||
    data.password == " "
  ) {
    respuesta.json({
      state: false,
      mensaje: "El campo password es obligatorio",
    });
    return false;
  } */

  //EDAD
  if (
    data.edad == "" || data.edad == null || data.edad == undefined || data.edad == " ") {
    respuesta.json({ state: false, mensaje: "El campo edad es obligatorio" });
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
//EXPORTAMOS LA VARIABLE QUE CONTIENE LA INFORMACIÓN
//---------------------------------------------------------------------------------------
module.exports.controladorProductosExport = productosController;
