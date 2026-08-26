console.log("Inicio del programa") //1

setTimeout(()=>{
    console.log("Primer TimeOut") //5
},3000)

setTimeout(()=>{
    console.log("Segundo TimeOut")//3
},0)

setTimeout(()=>{
    console.log("Tercer TimeOut")//4
},0)

console.log("Fin del programa")//2

/*
En Node.js (y JavaScript en general), el orden de ejecución no se rige únicamente por el orden en que escribes las líneas,
sino por la interacción entre tres componentes principales:
el Call Stack (pila de ejecución), las APIs del entorno (Timers) y la Callback Queue (cola de tareas), coordinados por el Event Loop.

EXPLICACION

1. Ejecución sincrónica inmediata (Call Stack)JavaScript lee el archivo línea por línea y ejecuta todo el código síncrono de inmediato:
Ejecuta console.log("Inicio del programa") // 1ero ORDEN DE CONSOLA
.Encuentra el primer setTimeout(..., 3000).
Node delega el temporizador de 3 segundos al sistema operativo y sigue sin bloquearse.
Encuentra el segundo setTimeout(..., 0). Node delega el temporizador de 0 ms y continúa de inmediato.
Encuentra el tercer setTimeout(..., 0). Node delega el temporizador de 0 ms y continúa de inmediato.
Ejecuta console.log("Fin del programa") //2do ORDEN CONSOLA

La regla de oro: El Call Stack debe quedar vacíosetTimeout(..., 0) no significa "ejecútate ya", sino "ejecútate tan pronto como termine todo el código sincrónico principal".
Aunque el temporizador de "Segundo TimeOut" finaliza casi al instante, su callback no se ejecuta directamente en el Call Stack;
se envía a la Callback Queue (cola de espera).

3. El Event Loop y la Callback Queue (FIFO)La Callback Queue funciona bajo la regla FIFO (First In, First Out: el primero en llegar es el primero en salir).
Cuando el Call Stack termina de ejecutar el código sincrónico (después de imprimir el fin del programa),
el Event Loop revisa si hay funciones esperando en la cola:
Toma el callback del segundo setTimeout (el primer 0 ms que llegó) y lo ejecuta 
imprime el
3.Toma el callback del tercer setTimeout (el segundo 0 ms que llegó) y lo ejecuta  imprime el 
4.4. El temporizador largoCuando transcurren los 3000 ms (3 segundos), el primer temporizador finaliza y su callback entra finalmente a la Callback Queue.
El Event Loop lo toma y lo ejecuta en el Call Stack  imprime el 5.*/