function hola(nombre,miCallback){
    setTimeout(function(){
        console.log("Hola"+nombre)
        miCallback()
    },1000)//AGREGAMOS 1 seg 
}

function hablar(callBackHablar){
    setTimeout(function(){
        console.log("bla bla bla bla")
        callBackHablar
    },1000)
}

function adios(nombre,otroCallback){
    setTimeout(function(){
        console.log("Adios"+nombre)
        otroCallback()
    },1500)//AGREGAMOS 1,5 seg
}

function conversacion(nombre,veces,callback){
    if (veces > 0){
        hablar(function(){
            conversacion(nombre, --veces,callback)
        })
    }else
        callBack(nombre,callback)
}


console.log("Iniciando el proceso...")  //PRIMERO
hola("Ariel",function(nombre){//Primera funcion
    conversacion(nombre,4,function(){//Funcion recursiva
        console.log("Terminando el proceso...")//ULTIMO
    })
})

/*
ESTO ES UN CALLBACK HELL, muchas funciones anidadas,un embole

hola("Carlos",function(){
    hablar(function(){
        hablar(function(){
            hablar(function(){
                adios("Carlos",function(){
                    console.log("Terminando el proceso...")
                })
            })
        })
    })
    
})
*/
