# NODE PRIMEROS PASOS

## QUE ES NODE.JS

Node.js es un entorno de ejecución (runtime) que permite ejecutar código JavaScript fuera del navegador web.

Diferencias clave

• JavaScript: Es el lenguaje de programación (creado originalmente para correr dentro de los navegadores web).
• Node.js: Es la plataforma o herramienta construida con el motor V8 de Google Chrome que toma ese lenguaje y le da la capacidad de funcionar en el servidor o directamente en la computadora.

Para qué sirve Node.js

• Desarrollo Backend: Permite crear servidores web y aplicaciones de red escalables usando JavaScript.
• Acceso al sistema: A diferencia de un navegador, Node.js te deja interactuar con el disco duro, archivos del sistema, bases de datos y redes a través de su propia librería.
• NPM: Incluye un gestor de paquetes (Node Package Manager) para instalar bibliotecas de código abierto.

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
  console.log("Esto se ejecuta después de 2 segundos");
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
console.log("Inicio del programa"); //1

setTimeout(() => {
  console.log("Primer TimeOut"); //5
}, 3000);

setTimeout(() => {
  console.log("Segundo TimeOut"); //3
}, 0);

setTimeout(() => {
  console.log("Tercer TimeOut"); //4
}, 0);

console.log("Fin del programa"); //2
```

**El Event Loop** y la **Callback Queue** (FIFO)La Callback Queue funciona bajo la regla **FIFO** (First In, First Out: el primero en llegar es el primero en salir).
Cuando el **Call Stack** termina de ejecutar el código sincrónico (después de imprimir el fin del programa),
el Event Loop revisa si hay funciones esperando en la cola:
-Toma el callback del segundo setTimeout (el primer 0 ms que llegó) y lo ejecuta imprime el 3.
-Toma el callback del tercer setTimeout (el segundo 0 ms que llegó) y lo ejecuta imprime el 4.

-El temporizador largoCuando transcurren los 3000 ms (3 segundos), el primer temporizador finaliza y su callback entra finalmente a la Callback Queue.
-El Event Loop lo toma y lo ejecuta en el Call Stack imprime el 5.\*/

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

## METODOS Y FUNCIONES GLOBALES

En Node.js, las funciones o métodos globales son aquellas herramientas que están disponibles en todos los módulos de tu aplicación sin necesidad de importarlas explícitamente mediante require() o import.
Al igual que en el navegador tienes el objeto global window, en Node.js existe un objeto llamado global. Todo lo que esté dentro de él se puede usar directamente en cualquier parte de tu código.
Aquí tienes los principales métodos y objetos globales agrupados por su función:

⏱️ Temporizadores (Timers)

• setTimeout(callback, delay): Ejecuta una función una vez transcurridos los milisegundos indicados.
• clearTimeout(timeoutObject): Cancela un temporizador configurado con setTimeout.
• setInterval(callback, delay): Ejecuta una función repetidamente cada cierto intervalo de tiempo.
• clearInterval(intervalObject): Detiene un bucle de ejecución creado con setInterval.
• setImmediate(callback): Ejecuta una función "inmediatamente" después de que termine el ciclo actual del bucle de eventos (event loop).
• clearImmediate(immediateObject): Cancela un temporizador configurado con setImmediate.

🖥️ Consola y Depuración

• console.log(): Imprime mensajes estándar en la terminal.
• console.error(): Muestra errores en la salida de errores (stderr).
• console.warn(): Emite advertencias en la terminal.
• console.time() / console.timeEnd(): Mide el tiempo exacto que tarda en ejecutarse un fragmento de código.

📦 El objeto process (Control del sistema)

Aunque es un objeto y no una función, es uno de los globales más importantes porque te permite interactuar con el proceso actual de Node.js:
• process.env: Accede a las variables de entorno del sistema.
• process.argv: Lee los argumentos pasados por la línea de comandos al ejecutar el script.
• process.exit(): Detiene la ejecución del programa de forma inmediata.

🧬 Globals que parecen globales (pero son locales a cada archivo)

Node.js inyecta de forma automática algunas variables en cada archivo que, aunque actúan como globales, solo tienen alcance dentro de ese módulo específico:
• __dirname: Te da la ruta absoluta de la carpeta donde está guardado el archivo actual.
• __filename: Te da la ruta absoluta completa del archivo actual (incluyendo su nombre).
• exports / module.exports: Permiten exportar código para usarlo en otros archivos.
• require(): La función que utilizas para importar otros módulos instalados o locales.

### Variables globales

En Node.js, las variables globales funcionan bajo el principio de que cualquier propiedad asignada al objeto raíz global se vuelve accesible de forma automática en cualquier archivo (módulo) de tu aplicación, sin necesidad de importarla.
Sin embargo, su comportamiento tiene reglas muy específicas y riesgos que debes conocer:

1. El objeto global

Así como en el navegador web el contenedor de todo lo global es window, en Node.js ese contenedor se llama global (o también globalThis en versiones modernas).
Si creas una propiedad en ese objeto, estará disponible en todo tu proyecto:

```js
// archivoA.js
global.miVariableGlobal = "Hola desde el espacio global";

// archivoB.js
// No necesitas importar archivoA ni hacer un require de nada
console.log(miVariableGlobal); // Imprime: Hola desde el espacio global
```

2. ¿Por qué var, let y const no crean variables globales?

A diferencia de los navegadores antiguos (donde escribir var x = 1 en la raíz de un script lo hacía global), en Node.js cada archivo es un módulo aislado.
Cuando declaras una variable con let, const o var en la raíz de un archivo, esa variable es local a ese archivo. Node.js envuelve tu código internamente en una función invisible, evitando que "contamines" otros archivos de forma accidental.
```js
// archivo1.js
const secreto = "12345"; // Local a este archivo

// archivo2.js
console.log(secreto); // ReferenceError: secreto is not defined
```

⚠️ El gran peligro de usar variables globales creadas por ti

En el desarrollo profesional con Node.js, se evita por completo crear variables globales propias debido a los siguientes problemas:
• Conflictos de nombres: Si estás usando una librería externa y ambos deciden usar global.config, uno sobrescribirá al otro causando errores difíciles de encontrar.
• Código impredecible: Hace que el código sea difícil de testear y de seguir, ya que cualquier archivo oculto en tu proyecto podría estar modificando el valor de la variable en medio de la ejecución.
• Problemas de memoria: Las variables globales nunca son eliminadas por el recolector de basura (Garbage Collector) mientras la aplicación esté corriendo, lo que puede causar fugas de memoria.

## MODULO FILE SYSTEM

El módulo node:fs (File System) de Node.js es una herramienta integrada que permite interactuar con el sistema de archivos del sistema operativo. Viene por defecto en la plataforma, por lo que no requiere ninguna instalación externa mediante npm.

💡 Formas de Uso (Síncrona, Callbacks y Promesas)

Node.js ofrece tres enfoques diferentes para manejar las operaciones del sistema de archivos:
1. Promesas (node:fs/promises): Es la alternativa más recomendada y moderna. Utiliza async/await y evita que el código se vuelva complejo de leer.
2. Callbacks (node:fs): Es la forma asíncrona tradicional. Envía una función que se ejecuta cuando la operación termina, pero puede generar el fenómeno conocido como callback hell si hay muchos procesos anidados.
3. Síncrona (node:fs con sufijo Sync): Bloquea el hilo principal de Node.js hasta que la acción termina. Solo se recomienda para scripts sencillos o tareas iniciales al arrancar la aplicación.

🛠️ Ejemplos Prácticos con Promesas

A continuación se detallan las operaciones esenciales utilizando el módulo basado en promesas (ES Modules):

1. Leer un Archivo

Para obtener el contenido de un archivo de texto, se utiliza readFile especificando la codificación correspondiente (normalmente utf-8).
```js
import fs from 'node:fs/promises';

try {
  const contenido = await fs.readFile('archivo.txt', 'utf-8');
  console.log(contenido);
} catch (error) {
  console.error('Error al leer el archivo:', error.message);
}
```

2. Crear o Escribir un Archivo

El método writeFile crea un archivo o reemplaza por completo su contenido si ya existe en la ruta especificada.
```js
import fs from 'node:fs/promises';

try {
  await fs.writeFile('nuevo.txt', 'Hola Mundo desde Node.js');
  console.log('Archivo creado con éxito.');
} catch (error) {
  console.error('Error al escribir:', error.message);
}
```

3. Añadir Información a un Archivo

Si necesitas agregar texto al final de un archivo sin borrar su contenido actual, se emplea appendFile.
```js
import fs from 'node:fs/promises';

try {
  await fs.appendFile('nuevo.txt', '\nEsta es una nueva línea.');
  console.log('Contenido añadido.');
} catch (error) {
  console.error('Error al añadir datos:', error.message);
}
```

4. Listar el Contenido de una Carpeta

El método readdir devuelve un arreglo con los nombres de los archivos y subcarpetas que se encuentran en el directorio indicado.
```javascript
import fs from 'node:fs/promises';

try {
  const archivos = await fs.readdir('.');
  console.log('Archivos en el directorio actual:', archivos);
} catch (error) {
  console.error('Error al leer la carpeta:', error.message);
}
```

5. Eliminar un Archivo o Carpeta

• Archivos: Se eliminan mediante la función unlink.
• Directorios: Se eliminan utilizando rm con la opción recursive: true para borrar también todo lo que contenga adentro.
```javascript
import fs from 'node:fs/promises';

try {
  // Eliminar un archivo individual
  await fs.unlink('nuevo.txt');
  
  // Eliminar una carpeta y su contenido de forma recursiva
  await fs.rm('carpeta_vieja', { recursive: true, force: true });
  console.log('Eliminación completada.');
} catch (error) {
  console.error('Error al eliminar:', error.message);
}
```

⚠️ Buena Práctica: Usa el módulo path

Cuando trabajes con rutas de archivos, evita concatenar cadenas manualmente (ej. './carpeta/' + archivo). Es altamente recomendable combinar node:fs con el módulo nativo node:path para asegurar que las rutas funcionen correctamente tanto en Windows como en macOS o Linux.
¿Qué tipo de tarea estás buscando automatizar? Si me compartes si necesitas procesar archivos muy grandes, crear estructuras de carpetas dinámicas o monitorear cambios en tiempo real, puedo darte un ejemplo de código adaptado exactamente a lo que estás construyendo.