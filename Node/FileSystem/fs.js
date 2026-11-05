const { error } = require("console")
const fs = require("fs")
const { dirname } = require("path")

//PRIMERO LEEMOS EL ARCHIVO
function leer(ruta,cb){
    fs.readFile(ruta,(err,data) => {
        cb(data.toString())
    })
}

function escribir(ruta,contenido){
    fs.writeFile(ruta,contenido,function(err){
        if(err){
            console.log("No se ha podido escribir",err)
        }else{
            console.log("Se ha escrito correctamente")
        }
    })
}

function eliminar(ruta,cb){
    fs.unlink(ruta,cb)
}

//ESTO YA NO SE USA
//leer(__dirname + '/archivo.txt', console.log)

//SINTAXIS ES6
//escribir(`${__dirname}/archivo1.txt`,"Soy un nuevo archivo",console.log)

//leer(`${__dirname}/archivo.txt`,console.log)


borrar(`${__dirname}/archivo1.txt`,console.log)