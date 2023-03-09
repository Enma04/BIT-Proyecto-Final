var carritoModel = {};

const mongoose = require('mongoose');

const esquema = mongoose.Schema;

var esquemaCarrito = new esquema({
    //Traemos la información del ID de los otros esquemas de mongo, con el nombre de la colección
    usuario_id : { type:mongoose.Schema.Types.ObjectId, ref: "usuarios" },
    producto_id : { type:mongoose.Schema.Types.ObjectId, ref: "productos" },
})

const miModelo = mongoose.model("carrito", esquemaCarrito);

const instancia = new miModelo;

/*
---------------------//---------------------------------//-------------- 
------------//--------------APIS DE TIPO (C.R.U.D)-----------//--------- 
---------------------//---------------------------------//--------------
*/

//LÓGICA DE LA API CREATE
carritoModel.AdicionarAlCarrito = function (data, callback) {

    //DATOS ALMACENADOS EN BASE DE DATOS
    instancia.usuario_id = data.usuario_id;
    instancia.producto_id = data.producto_id;
  
    instancia.save((error, correcto) => {
      if (error) {
        console.log(error);
        return callback({ state: false, mensaje: error });
      } else {
        console.log(correcto);
        return callback({
          state: true,
          mensaje: "Servicio agrergado satisfactoriamente",
        });
      }
    });
  }; //Fin api CREATE

//LÓGICA DE LA API READ
carritoModel.ListarMiCarrito = function (data, callback) {
//find({criterio de búsqueda},{datos que se quieren ver o ocultar},{})
miModelo.find({}, { _id: 0, __v: 0, password: 0 }, (error, documentos) => {
    if (error) {
    console.log(error);
    return callback({ state: false, mensaje: error });
    } else {
    console.log(documentos);
    return callback({
        state: true,
        mensaje: "Lista de carrito",
        data: documentos,
    });
    }
});
//return callback({ state: true, datos });
}; //Fin api READ

//LÓGICA DE LA API UPDATE
carritoModel.ActualizarCantidad = function (data, callback) {
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
carritoModel.EliminarItem = function (data, eliminacion) {
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
//EXPORTAMOS LA VARIABLE QUE CONTIENE LA INFORMACIÓN
//---------------------------------------------------------------------------------------
module.exports.modelCarritoExport = carritoModel;