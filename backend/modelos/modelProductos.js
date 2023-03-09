var productosModel = {};

//Se crea una constante para la conexión con mongo
const mongoose = require("mongoose");

//Creamos nuestro propio esquema (molde) de mongo
const esquema = mongoose.Schema;

//Creamos una variables con el esquema anterior
var esquemaProductos = new esquema({
  codigo: Number,
  nombre: String,
  precio: Number,
});

//Creamos el modelo (unión entre el nombre de la colección y el esquema de la colección)
const miModelo = mongoose.model("productos", esquemaProductos);

//Creamos una instancia del modelo
const instancia = new miModelo();

/*
---------------------//---------------------------------//-------------- 
------------//--------------APIS DE TIPO (C.R.U.D)-----------//--------- 
---------------------//---------------------------------//--------------
*/

//LÓGICA DE LA API CREATE
productosModel.GuardarProducto = function (data, callback) {
  //DATOS ALMACENADOS EN BASE DE DATOS
  instancia.codigo = data.codigo;
  instancia.nombre = data.nombre;
  instancia.precio = data.precio;

  instancia.save((error, correcto) => {
    if (error) {
      console.log(error);
      return callback({ state: false, mensaje: error });
    } else {
      console.log(correcto);
      return callback({
        state: true,
        mensaje: "Producto registrado correctamente",
      });
    }
  });
}; //Fin api CREATE

//LÓGICA DE LA API READ
productosModel.ListarProductos = function (data, callback) {
  //find({criterio de búsqueda},{datos que se quieren ver o ocultar},{})
  miModelo.find({}, { _id: 0, __v: 0, password: 0 }, (error, documentos) => {
    if (error) {
      console.log(error);
      return callback({ state: false, mensaje: error });
    } else {
      console.log(documentos);
      return callback({
        state: true,
        mensaje: "Lista de productos",
        data: documentos,
      });
    }
  });
  //return callback({ state: true, datos });
}; //Fin api READ

//LÓGICA DE LA API UPDATE
productosModel.ModificarProducto = function (data, callback) {
  miModelo.find({ codigo: data.codigo }, {}, (error, documentos) => {
    //Devuelve un array[] con los datos en la posicion 0
    if (error) {
      return callback({ state: false, mensaje: error });
    } else {
      if (documentos.length > 0) {
        //return callback({ state: false, mensaje: "Usuario encontrado" });

        miModelo.findOneAndUpdate(
          { _id: documentos[0]._id },
          {
            //Datos que se actualizan
            nombre: data.nombre,
            precio: data.precio,
          },
          (error, productoActualizado) => {
            if (error) {
              console.log(error);
              return callback({ state: false, mensaje: error });
            } else {
              console.log(productoActualizado);
              return callback({
                state: true,
                mensaje: "Servicio actualizado correctamente",
                data: productoActualizado,
              });
            }
          }
        ); //Fin findOneAndUpdate
      } //Fin del if de length
      else {
        return callback({ state: false, mensaje: "código no encontrado" });
      }
    }
  }); // Fin del find()
}; //Fin api UPDATE

//LÓGICA DE LA API DELETE
productosModel.EliminarProducto = function (data, eliminacion) {
  miModelo.find({ codigo: data.codigo }, {}, (error, documentos) => {
    //Devuelve un array[] con los datos en la posicion 0
    if (error) {
      return callback({ state: false, mensaje: error });
    } else {
      if (documentos.length > 0) {
        //return callback({ state: false, mensaje: "Producto encontrado" });

        miModelo.findByIdAndDelete(
          documentos[0]._id,
          (error, productoEliminado) => {
            if (error) {
              console.log(error);
              return eliminacion({ state: false, mensaje: error });
            } else {
              console.log(productoEliminado);
              return eliminacion({
                state: true,
                mensaje: "Producto eliminado correctamente",
                data: productoEliminado,
              });
            }
          }
        ); //Fin findByIdAndDelete
      } //Fin del if de length
      else {
        return eliminacion({ state: false, mensaje: "codigo no encontrado" });
      }
    }
  }); // Fin del find()
}; //Fin api DELETE



//---------------------------------------------------------------------------------------
// API'S ADICIONALES
//---------------------------------------------------------------------------------------

//API READ DE 1 SOLO USUARIO
productosModel.ListarProducto = function (data, callback) {
  //find({criterio de búsqueda},{datos que se quieren ver o ocultar},{})
  miModelo.find({ codigo: data.codigo }, { __v: 0 }, (error, documentos) => {
    if (error) {
      console.log(error);
      return callback({ state: false, mensaje: error });
    } else {
      if (documentos.length > 0) {
        console.log(documentos);
        return callback({
          state: true,
          mensaje: "Servicio encontrado! ",
          data: documentos,
        });
      } //Fin del if de length
      else {
        return callback({ state: false, mensaje: "Servicio no registrado!" });
      }
    }
  });
}; //Fin api READ de 1 solo campo






//---------------------------------------------------------------------------------------
//EXPORTAMOS LA VARIABLE QUE CONTIENE LA INFORMACIÓN
//---------------------------------------------------------------------------------------
module.exports.modelProductosExport = productosModel;
