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

    //Debemos hacer unso de un "aggregate", para enlazar los usuarios con productos y el carrito
    miModelo.aggregate([
        //Filtramos solo los elementos de este usuario
        { $match: { usuario_id:mongoose.Types.ObjectId( data.usuario_id ) } },
        {
            //Hacemos la unión de las tablas con las colecciones
            $lookup:{
                //Nos enlazamos con productos por medio de esta sentencia "from"
                from: "productos",
                //Campo local del modelo del carrito
                localField: "producto_id",
                //Campo del destino
                foreignField: "_id",
                //alias de la unión
                as: "productos"
            }
        },

        { $unwind: "$productos" }, //para que no se muestre como array sinó como un objeto

        {
            $project:{
                _id:1, producto_id:1, productos:{codigo:1, nombre:1, precio:1 } //campos que queremos mostrar
            }
        }


    ], (error,documentos) => {
        if(error){
            return callback({ state:false, error:error });
        }
        else{
            return callback({ state:true, data:documentos });
        }


    }) //FIN DEL AGGREGATE

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

    miModelo.findByIdAndDelete(data._id, (error, servicioCarritoEliminado) => {

            if (error) {
                console.log(error);
                return eliminacion({ state: false, mensaje: error });
            }
            else {
                console.log(servicioCarritoEliminado);
                return eliminacion({
                    state: true,
                    mensaje: "Servicio eliminado del carrito correctamente",
                    data: servicioCarritoEliminado,
                });
            }
        }
    ); //Fin findByIdAndDelete
}; //Fin api DELETE



//---------------------------------------------------------------------------------------
//EXPORTAMOS LA VARIABLE QUE CONTIENE LA INFORMACIÓN
//---------------------------------------------------------------------------------------
module.exports.modelCarritoExport = carritoModel;