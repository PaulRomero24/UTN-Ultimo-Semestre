function hola(nombre,miCallback){
    setTimeout(function(){
        console.log("Hola"+nombre)
        miCallback()
    },1000)//AGREGAMOS 1 seg 
}

function adios(nombre,otroCallback){
    setTimeout(function(){
        console.log("Adios"+nombre)
        otroCallback()
    },1000)//AGREGAMOS 1 seg
}

console.log("Iniciando el proceso...")
hola("Carlos",function(){
    adios("Carlos",function(){
        console.log("Terminando el proceso...")
    })
})

//hola("Carlos",function(){})
//adios("Carlos",function(){})

