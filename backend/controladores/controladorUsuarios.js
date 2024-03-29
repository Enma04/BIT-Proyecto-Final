/*
Este archivo se encarga de recolectar y verificar toda la información
del usuario, antes de ser enviada a la base de datos conectada con
el serviodor.
Aquí únicamente se realizan las validaciones de ingreso correcto
de los datos que serán tratados, y que previamente hayan sido enviados
por el archivo (rutas.js)
 */

var usuariosController = {};
var SHA256 = require("sha256");

/*
En la ruta especificada anteponemos "/../" para salirnos de una carpeta e ingresar a otra del
mismo nivel de jerarquía, en este caso, la carpeta "controladores" para ingresar en la
carpeta "modelos"
*/
var modelUsuario = require(__dirname +
  "/../modelos/modelUsuarios.js").modelUsuariosExport;

/*
---------------------//---------------------------------//-------------- 
------------//--------------APIS DE TIPO (C.R.U.D)-----------//--------- 
---------------------//---------------------------------//--------------
*/

//Api Guardar
usuariosController.Guardar = function (peticion, respuesta) {
  //Guardamos los datos recolectados desde el body (desde la página web)
  //para realizar las respectivas verificaciones
  let data = {
    cedula: peticion.body.cedula,
    name: peticion.body.name,
    apellido: peticion.body.apellido,
    edad: peticion.body.edad,
    direccion: peticion.body.direccion,
    telefono: peticion.body.telefono,
    estadocivil: peticion.body.estadocivil,
    email: peticion.body.email,
    password: peticion.body.password,
  };

  //VALIDACIONES DE LOS DATOS
  //CEDULA
  if (data.cedula == "" || data.cedula == null || data.cedula == undefined || data.cedula == " ") {
    respuesta.json({ state: false, mensaje: "El campo cedula es obligatorio" });
    return false;
  }

  //PASSWORD
  if (
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
  }

  //NOMBRE
  if (
    data.name == "" || data.name == null || data.name == undefined || data.name == " ") {
    respuesta.json({ state: false, mensaje: "El campo name es obligatorio" });
    return false;
  }
  if (data.name.length < 4 || data.name.length > 20) {
    respuesta.json({
      state: false,
      mensaje: "El campo name debe tener entre 4 y 20 caracteres",
    });
    return false;
  }

  //APELLIDO
  if (data.apellido == "" || data.apellido == null || data.apellido == undefined || data.apellido == " ") {
    respuesta.json({
      state: false,
      mensaje: "El campo apellido es obligatorio",
    });
    return false;
  }
  if (data.apellido.length < 4 || data.apellido.length > 20) {
    respuesta.json({
      state: false,
      mensaje: "El campo apellido debe tener entre 4 y 20 caracteres",
    });
    return false;
  }

  //EDAD
  if (
    data.edad == "" || data.edad == null || data.edad == undefined || data.edad == " ") {
    respuesta.json({ state: false, mensaje: "El campo edad es obligatorio" });
    return false;
  }

  modelUsuario.Guardar(data, function (res) {
    respuesta.json(res);
  });
}; //Fin api Guardar

//Api ListarUsuarios
usuariosController.ListarUsuarios = function (peticion, respuesta) {
  modelUsuario.ListarUsuarios(null, function (res) {
    respuesta.json(res);
  });
}; //Fin api Listar usuarios

//Api Modificar
usuariosController.Modificar = function (peticion, respuesta) {
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
    data.cedula == "" ||
    data.cedula == null ||
    data.cedula == undefined ||
    data.cedula == " "
  ) {
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
    data.edad == "" ||
    data.edad == null ||
    data.edad == undefined ||
    data.edad == " "
  ) {
    respuesta.json({ state: false, mensaje: "El campo edad es obligatorio" });
    return false;
  }

  //Respuesta del servidor
  modelUsuario.Modificar(data, function (res) {
    respuesta.json(res);
  });
}; //Fin api Modificar

//Api Eliminar
usuariosController.Eliminar = function (peticion, respuesta) {
  let data = {
    cedula: peticion.body.cedula,
  };

  //VALIDACIONES
  //CEDULA
  if (
    data.cedula == "" ||
    data.cedula == null ||
    data.cedula == undefined ||
    data.cedula == " "
  ) {
    respuesta.json({ state: false, mensaje: "El campo cedula es obligatorio" });
    return false;
  }

  //Respuesta del servidor
  modelUsuario.Eliminar(data, function (res) {
    respuesta.json(res);
  });
}; //Fin api Eiliminar

//---------------------------------------------------------------------------------------
// API'S ADICIONALES
//---------------------------------------------------------------------------------------

//Api ListarUsuario, tipo READ de 1 usuario
usuariosController.ListarUsuario = function (peticion, respuesta) {
  let data = { _id: peticion.session._id };

  if (
    data._id == "" ||
    data._id == null ||
    data._id == undefined ||
    data._id == " "
  ) {
    respuesta.json({
      state: false,
      mensaje: "No se pudo conectar con el usuario",
    });
    return false;
  } else {
    modelUsuario.ListarUsuario(data, function (res) {
      console.log(res);
      respuesta.json(res);
    });
  }
}; //Fin api Listar usuario

//Api Login de las actividades anteriores (no se usa)
usuariosController.Login = function (peticion, respuesta) {
  let data = {
    cedula: peticion.body.cedula,
    password: peticion.body.password, //Obtenemos el password sin encriptar, para validar campos
  };

  if (
    data.cedula == "" ||
    data.cedula == null ||
    data.cedula == undefined ||
    data.cedula == " "
  ) {
    respuesta.json({
      state: false,
      mensaje: "El campo correo electrónico es obligatorio",
    });
    return false;
  } else {
    if (
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
    } else {
      //Encriptamos la contraseña igual como se registró en la api "usuariosModel.Guardar()"
      data.password = SHA256(data.password + configuracion.pass);
      //Enviamos los datos actualizados
      modelUsuario.Login(data, function (res) {
        respuesta.json(res);
      });
    }
  }
}; //Fin api Login

//Api Login de los usuarios normales de la página
usuariosController.LoginUsuario = function (peticion, respuesta) {
  let data = {
    email: peticion.body.email,
    password: peticion.body.password, //Obtenemos el password sin encriptar, para validar campos
  };

  if (
    data.email == "" ||
    data.email == null ||
    data.email == undefined ||
    data.email == " "
  ) {
    respuesta.json({
      state: false,
      mensaje: "El campo correo electrónico es obligatorio",
    });
    return false;
  } else {
    if (
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
    } else {
      //Encriptamos la contraseña igual como se registró en la api "usuariosModel.Guardar()"
      data.password = SHA256(data.password + configuracion.pass);
      //Enviamos los datos actualizados
      modelUsuario.LoginUsuario(data, function (res) {
        //Miramos lo que contien res (state,documento), para saber la información que trae
        console.log(res);
        if (res.state == true) {
          peticion.session.nombre = res.documento[0].nombre;
          peticion.session.email = res.documento[0].email;
          peticion.session._id = res.documento[0]._id;
          peticion.session.rol = res.documento[0].rol;

          console.log(peticion.session);

          respuesta.json({
            state: true,
            mensaje: "Bienvenido " + res.documento[0].nombre,
          });
        } else {
          respuesta.json({
            state: false,
            mensaje: "Usuario o contraseña incorrectos!",
          });
        }
      });
    }
  }
}; //Fin api Login

// Api para ver cookies
usuariosController.MostrarCookies = function (peticion, respuesta) {
  respuesta.json({ clave: peticion.session }); //Muestra lo que hay en session
};

// Api para cerrar sesión
usuariosController.CerrarSesion = function (peticion, respuesta) {
  peticion.session.destroy();
  respuesta.json({ state: true, mensaje: "Sesión Finalizada" });
};

// Api para definir el menu lateral según el rol
usuariosController.MenuDefinido = function (peticion, respuesta) {
  if (peticion.session.rol == 1) {
    respuesta.json({
      state: true,
      poner: "pagActiva",
      datos: [
        { nombre: "Dashboard", destino: "/Dashboard" },
        { nombre: "Mi Perfil", destino: "/Perfil" },
        { nombre: "Actualizar Datos", destino: "/Usuario" },
        { nombre: "Admin. Servicios", destino: "/ReadServicios" },
      ],
    });
  } //Fin rol 1
  else {
    if (peticion.session.rol == 2) {
      respuesta.json({
        state: true,
        poner: "pagActiva",
        datos: [
          { nombre: "Dashboard", destino: "/Dashboard" },
          { nombre: "Mi Perfil", destino: "/Perfil" },
          { nombre: "Actualizar Datos", destino: "/Usuario" },
          { nombre: "Mis Servicios", destino: "/Productos" },
        ],
      });
    } //Fin de los demás roles
  }
}; //Fin api MenuDefinido

//---------------------------------------------------------------------------------------
//EXPORTAMOS LA VARIABLE QUE CONTIENE LA INFORMACIÓN
//---------------------------------------------------------------------------------------
module.exports.controladorUsuariosExport = usuariosController;
