


## ERRORES QUE LE PASARON AL BARBA


*WSL distro*:  

si no encuentra el distro,hay que activarlo desde Docker Desktop 

*Comando*  

en el archivo yml no va **CMD**, sino la linea  de *command:*
El barba pasa esa linea de comando al Dockerfile

*Acceso denegado*:  

si no se puede ingresar a docker por usuarios:
**sudo docker-compose build**
pedira contraseña

*FROM*:  

cuando llamamos a python cuidado con los espacios



## Comandos y su uso  

### sudo  

permisos de administrador si no corre el comando.
### docker-compose ps  

Muestra los servicios que estan corriendo

### docker-compose up -d  

Levanta todos los contenedores definidos en el docker-compose.yml. El -d significa “detached” — los corre en segundo plano sin bloquear la terminal.

### docker-compose exec app-csv bash  

Entra dentro del contenedor llamado "app-csv" y abre una terminal bash. Es como “meterte adentro” del contenedor para ejecutar comandos. El nombre "app-csv" es el nombre del contenedor en el docker-compose.yml.

### docker-compose down  

Apaga y elimina los contenedores que estaban corriendo. Es el opuesto de up.

### Dentro del contenedor

Una vez dentro del contenedor con bash usás comandos de Linux normales:

```bash
ls          # ver archivos
cd carpeta  # entrar a una carpeta
pwd         # ver en qué carpeta estás
cat archivo.csv   # ver contenido de un archivo
python app.py     # correr un script
exit        # salir del contenedor
```

## ENLAZAR DOCKER  

se le agrega un volumes en el compose

### volumes   

volumes sirve para conectar una carpeta de tu PC con una carpeta dentro del contenedor — así los archivos se comparten entre los dos.
Esto significa: la carpeta data de tu PC (./data) se conecta con /app/data dentro del contenedor.

Por qué es importante: los contenedores son temporales — cuando hacés *docker-compose down* todo lo que estaba adentro se borra. Con volumes los archivos sobreviven porque en realidad están en tu PC, el contenedor solo los “ve”.

Ejemplo práctico: si procesás un CSV dentro del contenedor y el resultado se guarda en /app/data, gracias al volume ese archivo aparece en tu carpeta ./data en Windows y no lo perdés al bajar el contenedor.