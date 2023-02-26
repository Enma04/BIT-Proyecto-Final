// Aplicación

/* En el backend existen las peticiones tipo:
    GET, POST, DELETE, PUT. Las más usadas son GET y POST ya que contienen la información
    necesaria para hacer todo tipo de peticiones
    Toda petición debe tener una respuesta por parte del servidor
    Las peticiones tipo GEt son las que se hacen desde la URL
*/

//CONFIGURACIONES NECESARIAS DE PARTE DEL SERVIDOR
//variables y librerías
var express = require('express');

global.app = express();  //Para que app quede global
global.configuracion = require(__dirname + "/config.js").configExports;

//Configuración adicional para usar body-parse
var bodyParse = require('body-parser');
//const { request } = require('express')
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

//Creamos una variable que permita usar el paquete de sesionesde express
var sesion = require("express-session")({
    secret: configuracion.claveOculta,  //Esta cadena de texto solo la conoce el dueño del servidor
    resave: true,  //Permite grabar la sesion en node
    saveUninitialized: true,  //Grabe cuando se inicialice
    cookie: { path: "/", httpOnly: true, maxAge: configuracion.tiempoSesion },  //ruta de almacenamiento
    name: "CookieFinal", //Nombre de la cookie
    rolling: true //Siempre va

})

app.use(sesion);  //Listo para usar la sesión

//Configuraciónpara realizar las peticiones desde HTML
app.all("*", function (peticion, respuesta, next) {

    var listaBlanca = peticion.headers.origin;

    console.log(listaBlanca);
    respuesta.header("Access-Control-Allow-Origin", listaBlanca);
    respuesta.header("Access-Control-Allow-Credentials", "true");
    respuesta.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    respuesta.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    next();
})


//Configuración para permitir o no el paso de usuarios a la información
var cors_VAR = require('cors');  //Cross origin resource sharing

app.use(cors_VAR({
    origin: function (origin, callback) {

        console.log(origin);

        if (!origin) return callback(null, true);

        if (configuracion.listaBlancaDominios.indexOf(origin) === -1) {
            return callback("Error de cors: usuario no autorizado!", false);
        }

        return callback(null,true);
    }
    
}))

var sha256 = require('SHA256');
console.log("La palabra 'Hola' se codifica: ", sha256("Hola"));





//----------------------------------------------------------------------------------------------------------------
//ESTA SECCIÓN SIEMPRE VA DE ÚLTIMO PROQUER ES LA CONEXIÓN CON EL SERVIDOR Y CON LA BASE DE DATOS

//Configuración de la base de datos con node (mongoose)
const mongoose = require("mongoose");

//Se agrega esta línea quearroja la terminal, para evitar DeprecationWarning
mongoose.set('strictQuery', false);

//Conexión a mongo
mongoose.connect('mongodb://127.0.0.1:27017/' + configuracion.database, { useNewUrlParser: true, UseUnifiedTopology: true }, (error, response) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("conectado a la bse de datos");
    }
});

//Conexión al servidor
app.listen(configuracion.puerto, function(){
    console.log('Servidor en linea por el puerto: ' + configuracion.puerto);
    }
)


//----------------------------------------------------------------------------------------------------------------
//ESTE REQUERIMIENTO SIEMPRE DEBE IR DE ÚLTIMO PARA NO ENTRAR EN CONFLICO CON LOS DATOS ENVIADOS DESDE EL BODY
//Comando para utilizar el archivo que contiene las rutas de dirección
require(__dirname + "/rutas.js");  
