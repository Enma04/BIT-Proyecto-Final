/*
Este archivo se encarga de recolectar y verificar toda la información
del usuario, antes de ser enviada a la base de datos conectada con
el serviodor.
Aquí únicamente se realizan las validaciones de ingreso correcto
de los datos que serán tratados, y que previamente hayan sido enviados
por el archivo (rutas.js)
 */

var usuariosController = {}
var SHA256 = require("sha256");


/*
En la ruta especificada anteponemos "/../" para salirnos de una carpeta e ingresar a otra del
mismo nivel de jerarquía, en este caso, la carpeta "controladores" para ingresar en la
carpeta "modelos"
*/
var modelUsuario = require(__dirname + "/../modelos/modelUsuarios.js").modelUsuariosExport

//Api Guardar
usuariosController.Guardar = function (peticion, respuesta) {
    
    //Guardamos los datos recolectados desde el body (desde la página web)
    //para realizar las respectivas verificaciones
    let data = {
        cedula       :peticion.body.cedula,
        name         :peticion.body.name,
        apellido     :peticion.body.apellido,
        edad         :peticion.body.edad,
        direccion    :peticion.body.direccion,
        telefono     :peticion.body.telefono,
        estadocivil  :peticion.body.estadocivil,
        email        :peticion.body.email,
        password     :peticion.body.password,
    }

    //VALIDACIONES DE LOS DATOS
    //CEDULA
    if (data.cedula == "" || data.cedula == null || data.cedula == undefined || data.cedula == " ") {
        respuesta.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false;
    }

    //PASSWORD
    if (data.password == "" || data.password == null || data.password == undefined || data.password == " ") {
        respuesta.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false;
    }

    //NOMBRE
    if (data.name == "" || data.name == null || data.name == undefined || data.name == " ") {
        respuesta.json({ state: false, mensaje: "El campo name es obligatorio" })
        return false;
    }
    if (data.name.length < 4 || data.name.length > 20) {
        respuesta.json({ state: false, mensaje: "El campo name debe tener entre 4 y 20 caracteres" })
        return false;
    }

    //APELLIDO
    if (data.apellido == "" || data.apellido == null || data.apellido == undefined || data.apellido == " ") {
        respuesta.json({ state: false, mensaje: "El campo apellido es obligatorio" })
        return false;
    }
    if (data.apellido.length < 4 || data.apellido.length > 20) {
        respuesta.json({ state: false, mensaje: "El campo apellido debe tener entre 4 y 20 caracteres" })
        return false;
    }

    //EDAD
    if (data.edad == "" || data.edad == null || data.edad == undefined || data.edad == " ") {
        respuesta.json({ state: false, mensaje: "El campo edad es obligatorio" })
        return false;
    }

    modelUsuario.Guardar(data, function (res) {
        respuesta.json(res);
    });

} //Fin api Guardar

//Api ListarUsuarios
usuariosController.ListarUsuarios = function (peticion, respuesta) {
    modelUsuario.ListarUsuarios(null, function (res) {
        respuesta.json(res);
    })
    
} //Fin api Listar usuarios

//Api Modificar
usuariosController.Modificar = function (peticion, respuesta) {

    let data = {
        cedula       :peticion.body.cedula,
        name         :peticion.body.name,
        apellido     :peticion.body.apellido,
        edad         :peticion.body.edad,
        direccion    :peticion.body.direccion,
        telefono     :peticion.body.telefono,
        estadocivil  :peticion.body.estadocivil,
        password     :peticion.body.password,
    }

    //VALIDACIONES
    //CEDULA
    if (data.cedula == "" || data.cedula == null || data.cedula == undefined || data.cedula == " ") {
        respuesta.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false;
    }

    if (data.password == "" || data.password == null || data.password == undefined || data.password == " ") {
        respuesta.json({ state: false, mensaje: "El campo password es obligatorio" })
        return false;
    }

    //EDAD
    if (data.edad == "" || data.edad == null || data.edad == undefined || data.edad == " ") {
        respuesta.json({ state: false, mensaje: "El campo edad es obligatorio" })
        return false;
    }

    //Respuesta del servidor
    modelUsuario.Modificar(data, function (res) {
        respuesta.json(res);
    })

} //Fin api Modificar

//Api Eliminar
usuariosController.Eliminar = function (peticion, respuesta) {

    let data = {
        cedula: peticion.body.cedula,
    }

    //VALIDACIONES
    //CEDULA
    if (data.cedula == "" || data.cedula == null || data.cedula == undefined || data.cedula == " ") {
        respuesta.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false;
    }

    //Respuesta del servidor
    modelUsuario.Eliminar(data, function (res){
        respuesta.json(res);
    })
    

} //Fin api Eiliminar






//---------------------------------------------------------------------------------------
// API'S ADICIONALES

//Api ListarUsuario
usuariosController.ListarUsuario = function (peticion, respuesta) {

    let data = { cedula: peticion.body.cedula, }

    if (data.cedula == "" || data.cedula == null || data.cedula == undefined || data.cedula == " ") {
        respuesta.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false;
    }
    else {
        modelUsuario.ListarUsuario(data, function (res) {
        respuesta.json(res);
        })
    } 
    
} //Fin api Listar usuario



//Api Login de las actividades anteriores (no se usa)
usuariosController.Login = function (peticion, respuesta) {

    let data = {
        cedula     :peticion.body.cedula,
        password   :SHA256(peticion.body.password + configuracion.pass),
    }

    if (data.cedula == "" || data.cedula == null || data.cedula == undefined || data.cedula == " ") {
        respuesta.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false;
    }
    else {
        if (data.password == "" || data.password == null || data.password == undefined || data.password == " ") {
            respuesta.json({ state: false, mensaje: "El campo password es obligatorio" })
            return false;
        }
        else {
            modelUsuario.Login(data, function (res) {
                respuesta.json(res);
            })
        }
    }
    
} //Fin api Login


//Api Login de los usuarios normales de la página
usuariosController.LoginUsuario = function (peticion, respuesta) {

    let data = {
        email      :peticion.body.email,
        password   :peticion.body.password, //Obtenemos el password sin encriptar, para validar campos
    }

    if (data.email == "" || data.email == null || data.email == undefined || data.email == " ") {
        respuesta.json({ state: false, mensaje: "El campo correo electrónico es obligatorio" })
        return false;
    }
    else {
        if (data.password == "" || data.password == null || data.password == undefined || data.password == " ") {
            respuesta.json({ state: false, mensaje: "El campo password es obligatorio" })
            return false;
        }
        else {
            //Encriptamos la contraseña igual como se registró en la api "usuariosModel.Guardar()"
            data.password = SHA256(data.password + configuracion.pass);
            //Enviamos los datos actualizados
            modelUsuario.LoginUsuario(data, function (res) {
                respuesta.json(res);
            })
        }
    }
    
} //Fin api Login


//EXPORTAMOS LA VARIABLE QUE CONTIENE LA INFORMACIÓN
module.exports.controladorUsuariosExport = usuariosController;