/*
Este archivo se encarga de gestionar toda la información del
usuario en una base de datos conectada al serviodor.
Aquí únicamente se realizan las configuraciones,
modificaciones y manipulaciones de los datos de usuario,
que previamente hayan pasado por el filtro
(controladorUsuarios.js)
 */

var usuariosModel = {}
var SHA256 = require("sha256");

//Se crea una constante para la conexión con mongo
const mongoose = require("mongoose");

//Creamos nuestro propio esquema (molde) de mongo
const esquema = mongoose.Schema;

//Creamos una variables con el esquema anterior
var esquemaUsuarios = new esquema({
    cedula         :String,
    nombre         :String,
    apellido       :String,
    edad           :Number,
    direccion      :String,
    telefono       :String,
    estadocivil    :String,
    email          :String,
    password       :String,
})

//Creamos el modelo (unión entre el nombre de la colección y el esquema de la colección)
const miModelo = mongoose.model('usuarios', esquemaUsuarios);

//Creamos una instancia del modelo
const instancia = new miModelo;





/*
---------------------//---------------------------------//-------------- 
------------//--------------APIS DE TIPO (C.R.U.D)-----------//--------- 
---------------------//---------------------------------//--------------
*/

//LÓGICA DE LA API CREATE
usuariosModel.Guardar = function (data, callback) {

    //DATOS ALMACENADOS EN BASE DE DATOS
    instancia.cedula =       data.cedula;
    instancia.nombre =       data.name;
    instancia.apellido =     data.apellido;
    instancia.edad =         data.edad;
    instancia.direccion =    data.direccion;
    instancia.telefono =     data.telefono;
    instancia.estadocivil =  data.estadocivil;
    instancia.email =        data.email;
    instancia.password =     SHA256(data.password + configuracion.pass);

    instancia.save((error, correcto) => {
        if (error) {
            console.log(error);
            return callback({ state: false, mensaje: error });
        }
        else {
            console.log(correcto);
            return callback({ state: true, mensaje: "Usuario guardado correctamente" });
        }
    })

    
} //Fin api CREATE

//LÓGICA DE LA API READ
usuariosModel.ListarUsuarios = function (data, callback) {
    //find({criterio de búsqueda},{datos que se quieren ver o ocultar},{})
    miModelo.find({}, { _id: 0, __v: 0, password: 0 }, (error, documentos) => {
        if (error) {
            console.log(error);
            return callback({ state: false, mensaje: error });
        }
        else {
            console.log(documentos);
            return callback({ state: true, mensaje: "Lista de usuarios", data:documentos });
        }
    });
    //return callback({ state: true, datos });
} //Fin api READ

//LÓGICA DE LA API UPDATE
usuariosModel.Modificar = function (data, callback) {

    miModelo.find({ cedula: data.cedula }, {}, (error, documentos) => {  //Devuelve un array[] con los datos en la posicion 0
        if (error) {
            return callback({ state: false, mensaje: error });
        }
        else {
            if (documentos.length > 0) {
                //return callback({ state: false, mensaje: "Usuario encontrado" });

                miModelo.findOneAndUpdate({ cedula:documentos[0].cedula }, {
                // Para actualizar por _id es lo mismo pero se coloca así:
                // miModelo.findById(data.cedula, {

                    //Datos que se actualizan
                    nombre      :data.name,
                    apellido    :data.apellido,
                    edad        :data.edad,
                    direccion   :data.direccion,
                    telefono    :data.telefono,
                    estadocivil :data.estadocivil,
                    password    :SHA256(data.password + configuracion.pass),
                    
                }, (error, usuarioActualizado) => {

                    if (error) {
                        console.log(error);
                        return callback({ state: false, mensaje: error });
                    }
                    else {
                        console.log(usuarioActualizado);
                        return callback({ state: true, mensaje: "Usuario actualizado correctamente", data:usuarioActualizado });
                    }
                })  //Fin findOneAndUpdate
            } //Fin del if de length
            else {
                return callback({ state: false, mensaje: "cedula no encontrada" });
            }
        }
    })// Fin del find()
    
} //Fin api UPDATE

//LÓGICA DE LA API DELETE
usuariosModel.Eliminar = function (data, eliminacion) {
    
    miModelo.find({ cedula: data.cedula }, {}, (error, documentos) => {  //Devuelve un array[] con los datos en la posicion 0
        if (error) {
            return callback({ state: false, mensaje: error });
        }
        else {
            if (documentos.length > 0) {
                //return callback({ state: false, mensaje: "Usuario encontrado" });

                miModelo.findByIdAndDelete(documentos[0]._id, (error, usuarioEliminado) => {

                    if (error) {
                        console.log(error);
                        return eliminacion({ state: false, mensaje: error });
                    }
                    else {
                        console.log(usuarioEliminado);
                        return eliminacion({ state: true, mensaje: "Usuario eliminado correctamente", data:usuarioEliminado });
                    }
                })  //Fin findByIdAndDelete
            } //Fin del if de length
            else {
                return eliminacion({ state: false, mensaje: "cedula no encontrada" });
            }
        }
    })// Fin del find()

} //Fin api DELETE







//---------------------------------------------------------------------------------------
// API'S ADICIONALES
//---------------------------------------------------------------------------------------

//API READ DE 1 SOLO USUARIO
usuariosModel.ListarUsuario = function (data, callback) {

    //find({criterio de búsqueda},{datos que se quieren ver o ocultar},{})
    miModelo.find({ cedula: data.cedula }, { _id: 0, __v: 0 }, (error, documentos) => {

        if (error) {
            console.log(error);
            return callback({ state: false, mensaje: error });
        }
        else {
            if (documentos.length > 0) {
                console.log(documentos);
                return callback({ state: true, mensaje: "Usuario encontrado: ", data: documentos });
            } //Fin del if de length
            else {
                return callback({ state: false, mensaje: "Usuario no encontrado"});
            }
        }

    });
} //Fin api READ de 1 solo campo


//API LOGIN (no se usa)
usuariosModel.Login = function (data, callback) {

    //find({criterio de búsqueda}, {datos que se quieren ver o ocultar}, () => {})
    miModelo.find({ cedula: data.cedula, password: data.password }, {
        _id: 0,
        __v: 0,
    }, (error, documentos) => {

        if (error) {
            console.log(error);
            return callback({ state: false, mensaje: error });
        }
        else {
            if (documentos.length === 1) {
                return callback({ state: true, mensaje: "Bienvenido: " + documentos[0].nombre });
            } //Fin del if de length
            else {
                return callback({ state: false, mensaje: "El usuario o el password son incorrectos!"});
            }
        }

    });
} //Fin api LOGIN


//API LOGIN USUARIO NORMAL
usuariosModel.LoginUsuario = function (data, callback) {

    //find({criterio de búsqueda}, {datos que se quieren ver o ocultar}, () => {})
    miModelo.find({ email: data.email, password: data.password }, {
        _id: 1,
        __v: 0,
    }, (error, documentos) => {

        if (error) {
            console.log(error);
            return callback({ state: false, mensaje: error });
        }
        else {
            if (documentos.length === 1) {
                //Devuelve el documento json
                return callback({ state: true, documento:documentos });
            }
            else {
                //devuelve el error
                return callback({ state: false, documento:error });
            }
        }

    });
} //Fin api LOGIN





//---------------------------------------------------------------------------------------
//EXPORTAMOS LA VARIABLE QUE CONTIENE LA INFORMACIÓN
//---------------------------------------------------------------------------------------
module.exports.modelUsuariosExport = usuariosModel;