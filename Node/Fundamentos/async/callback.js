function soyAsincrona(){
    setTimeout(function(miCallback){
        console.log("Hola,soy una funcion asincrona")
        miCallback()
    },1000)//AGREGAMOS 1 seg 
    
}

console.log("Iniciando el proceso...")
soyAsincrona(function(){
    console.log("Terminando el proceso...")    
})
