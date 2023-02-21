var config = {};

config.puerto = 3000;
config.database = "BIT";
config.pass = 'Rtzz5641@F#';  //Concatenación de la appi para hacer más seguras las contraseñas del usuario
config.listaBlancaDominios = [
    "http://127.0.0.1:5500",
    "http://localhost:4200",
]

module.exports.configExports = config;