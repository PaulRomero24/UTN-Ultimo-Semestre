//this === global = true

//MOSTRAR ALGO EN CONSOLA
console.log()

//MOSTRAR UN MENSAJE EN FORMA DE ERROR
console.error()

//EJECUTAR un codigo despues de un tiempo determinado
setTimeout(()=>{})

//Ejecutar un codigo cada intervalo de tiempo
setInterval(()=>{})

//Da prioridad de EJECUCION a una funcion "asyn"crona
setImmediate(()=> {})


//VER LAS FUNCIONES O MODULOS QUE SON GLOBALES
//console.log(global)

let i = 0
let intervalo =setInterval(()=>{
    console.log("hola")
    if(i === 3){
        clearInterval(intervalo)
    }
    i++
},1000)

setImmediate(()=>{
    console.log("Saludo inmediato")
})

//requiere()

//console.log(process)

//console.log(__dirname)

//console.log(__filename)

global.miVariable = "mi variable global"
console.log(miVariable)