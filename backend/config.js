var config = {};

config.puerto = 3000;
config.database = "BIT";
config.pass = 'Rtzz5641@F#';  //Concatenación de la appi para hacer más seguras las contraseñas del usuario

//Configuración de la lista blanca de conexión
config.listaBlancaDominios = [
    "http://127.0.0.1:5500",
    "http://localhost:4200",
]

config.claveOculta = "MyClaveOculta";
config.tiempoSesion = (60000 * 10); //Tiempo en milisegundos (var/1000) = var_en_seg

//EXPORTAMOS LA VARIABLE "config" (LA CUAL ES UN JSON), MEDIANTE
//EL NOMBRE "configExports"
module.exports.configExports = config;