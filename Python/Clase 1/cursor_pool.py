from typing import Any

from conexion import Conexion


class CursorDelPool:
    def __init__(self, conexion: Any):
        self._conexion = conexion
        self._cursor = None

    def __enter__(self):
        self._cursor = self._conexion.cursor()
        return self._cursor

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self._cursor:
            self._cursor.close()
        if exc_type is None:
            self._conexion.commit()
        Conexion.liberarConexion(self._conexion)
        return False
