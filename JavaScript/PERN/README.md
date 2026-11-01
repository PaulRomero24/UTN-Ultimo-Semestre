# Despliegue (Deployment) en Railway

Railway es una plataforma de despliegue (deployment) que permite hostear 
(alojar) tanto el backend como la base de datos en la nube.

> ⚠️ El plan gratuito otorga 5 USD de crédito de prueba.

## Requisitos previos

- Repositorio creado en GitHub
- Cuenta en [railway.com](https://railway.com)
- dBeaver instalado — administrador universal de bases de datos con 
  interfaz gráfica (GUI) que permite conectarse, crear tablas y 
  verificar la conexión a múltiples bases de datos desde un solo programa

## Pasos

### 1. Desplegar el Backend y la Base de Datos

1. Ingresá a [railway.com](https://railway.com) y creá un nuevo proyecto
2. Conectá tu repositorio de GitHub
3. Configurá las variables de entorno (environment variables) del Backend 
   desde el panel de Railway
4. Usá dBeaver para conectarte a la base de datos de Railway, 
   verificar la conexión y crear las tablas necesarias

### 2. Desplegar el Frontend

1. Creá un nuevo despliegue (deployment) en Railway para el Frontend
2. Una vez desplegado, copiá la URL generada para el Frontend

### 3. Conectar el Frontend con el Backend

1. En el despliegue del **Backend**, agregá la URL del Frontend como 
   variable de entorno `ORIGIN`
2. En el despliegue del **Frontend**, agregá la URL del Backend como 
   variable de entorno `VITE_BACKEND` con formato `https://...`

   ## Aclaración

Cualquier cambio que se realice en el código debe subirse (pushearse) 
al repositorio de GitHub. Railway detecta automáticamente los cambios 
y vuelve a desplegar (re-deploy) la aplicación con las modificaciones.