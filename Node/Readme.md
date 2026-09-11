# NODE PRIMEROS PASOS

## Funcion Flecha

```javascript
const sumar = (a, b) => a + b;
console.log(sumar(2, 3)); // Output: 5
```
```
Esta funcion flecha toma dos argumentos `a` y `b`, y devuelve su suma. Es una forma concisa de definir funciones en JavaScript.
La funcion Flecha es una forma más corta de escribir funciones en JavaScript. Se introdujo en ES6 y tiene algunas diferencias importantes con las funciones tradicionales, como la forma en que manejan el contexto de `this`.
**This**: En las funciones flecha, el valor de `this` se hereda del contexto en el que se define la función. Esto significa que no crean su propio contexto de `this`, lo que puede ser útil en ciertos casos, como cuando se trabaja con métodos de objetos o clases.
```
## Funcion TimeOut

```javascript
setTimeout(() => {
  console.log('Esto se ejecuta después de 2 segundos');
}, 2000);
```

En Node.js (y JavaScript en general), el orden de ejecución no se rige únicamente por el orden en que escribes las líneas,
sino por la interacción entre tres componentes principales:
el **Call Stack** (pila de ejecución), las **APIs del entorno** (Timers) y la **Callback Queue** (cola de tareas), coordinados por el **Event Loop**.

### EXPLICACION

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


## Event Loop


Un ejemplo clásico para entender el Event Loop en Node.js es el siguiente:

```javascript
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

```
**El Event Loop** y la **Callback Queue** (FIFO)La Callback Queue funciona bajo la regla **FIFO** (First In, First Out: el primero en llegar es el primero en salir).
Cuando el **Call Stack** termina de ejecutar el código sincrónico (después de imprimir el fin del programa),
el Event Loop revisa si hay funciones esperando en la cola:
-Toma el callback del segundo setTimeout (el primer 0 ms que llegó) y lo ejecuta imprime el 3.
-Toma el callback del tercer setTimeout (el segundo 0 ms que llegó) y lo ejecuta  imprime el 4.

-El temporizador largoCuando transcurren los 3000 ms (3 segundos), el primer temporizador finaliza y su callback entra finalmente a la Callback Queue.
-El Event Loop lo toma y lo ejecuta en el Call Stack  imprime el 5.*/



## Funcion SetInterval

### ¿Cómo funciona el modelo monohilo?
**Bucle de eventos (Event Loop)**: Es el núcleo de Node.js que se encarga de recibir, procesar y coordinar las operaciones de forma asíncrona.
**E/S no bloqueante**: Cuando llega una tarea de entrada/salida (como leer un archivo o consultar una base de datos), Node.js la delega al sistema operativo o a un grupo de hilos internos (libuv), liberando el hilo principal para atender otras solicitudes. 
**Eficiencia**: Este diseño es extremadamente rápido y ligero para aplicaciones con mucho tráfico de red o consultas constantes de E/S.


```sh
const express = require('express');
const app = express();

// Simulación de una tarea pesada que consume mucha CPU
function calcularSumaGigante() {
  let suma = 0;
  for (let i = 0; i < 5_000_000_000; i++) {
    suma += i;
  }
  return suma;
}

// Ruta bloqueante
app.get('/calcular-bloqueante', (req, res) => {
  const resultado = calcularSumaGigante(); // ⚠️ El monohilo se congela aquí
  res.send(`Resultado: ${resultado}`);
});

// Ruta rápida
app.get('/rapida', (req, res) => {
  res.send('¡Esta ruta responde de inmediato!');
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));
```