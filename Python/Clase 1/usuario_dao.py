from typing import List

from conexion import Conexion
from cursor_pool import CursorDelPool
from logger_base import logger
from usuario import Usuario


class UsuarioDao:
    SELECCIONAR = "SELECT id_usuario, username, password FROM usuario"
    INSERTAR = "INSERT INTO usuario (username, password) VALUES (%s, %s)"
    ACTUALIZAR = "UPDATE usuario SET username = %s, password = %s WHERE id_usuario = %s"
    ELIMINAR = "DELETE FROM usuario WHERE id_usuario = %s"
    CREAR_TABLA = "CREATE TABLE IF NOT EXISTS usuario (id_usuario SERIAL PRIMARY KEY, username VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL)"

    def __init__(self):
        self._crear_tabla()

    def _crear_tabla(self):
        conexion = Conexion.obtenerConexion()
        with CursorDelPool(conexion) as cursor:
            cursor.execute(self.CREAR_TABLA)
        logger.debug("Tabla de usuario verificada/creada")

    def seleccionar(self) -> List[Usuario]:
        conexion = Conexion.obtenerConexion()
        usuarios: List[Usuario] = []
        with CursorDelPool(conexion) as cursor:
            cursor.execute(self.SELECCIONAR)
            registros = cursor.fetchall()
            for registro in registros:
                usuarios.append(Usuario(registro[0], registro[1], registro[2]))
        logger.debug("Usuarios seleccionados: %s", len(usuarios))
        return usuarios

    def insertar(self, usuario: Usuario) -> int:
        conexion = Conexion.obtenerConexion()
        with CursorDelPool(conexion) as cursor:
            cursor.execute(self.INSERTAR, (usuario.username, usuario.password))
            id_generado = cursor.lastrowid
        logger.debug("Usuario insertado con id %s", id_generado)
        return id_generado

    def actualizar(self, usuario: Usuario) -> int:
        conexion = Conexion.obtenerConexion()
        with CursorDelPool(conexion) as cursor:
            cursor.execute(self.ACTUALIZAR, (usuario.username, usuario.password, usuario.id_usuario))
            filas_actualizadas = cursor.rowcount
        logger.debug("Usuario actualizado, filas afectadas: %s", filas_actualizadas)
        return filas_actualizadas

    def eliminar(self, usuario: Usuario) -> int:
        conexion = Conexion.obtenerConexion()
        with CursorDelPool(conexion) as cursor:
            cursor.execute(self.ELIMINAR, (usuario.id_usuario,))
            filas_eliminadas = cursor.rowcount
        logger.debug("Usuario eliminado, filas afectadas: %s", filas_eliminadas)
        return filas_eliminadas
