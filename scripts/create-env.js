//Trabajando con el modulo de node llamado fs que nos permite trabajar con el sistema operativo y poder guardar o enviar datos en archivos que podamos escribir en nuestra computadora
const fs = require('fs');
//Metodo que permite crear el archivo para reconocer las variables de entorno
fs.writeFileSync('./.env', `API=${process.env.API}\n`)