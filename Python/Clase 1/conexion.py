import psycopg2
import queue
from typing import Optional
from logger_base import logger

class Conexion:
    DATABASE = "laboratorio_usuarios"   # ← la que creaste en pgAdmin
    USERNAME = "postgres"
    PASSWORD = "ElBackend26"
    DB_PORT  = 5432
    HOST     = "localhost"
    MIN_CON  = 2
    MAX_CON  = 5
    _pool: Optional[queue.Queue] = None

    @classmethod
    def obtenerPool(cls) -> queue.Queue:
        if cls._pool is None:
            cls._pool = queue.Queue(maxsize=cls.MAX_CON)
            for _ in range(cls.MIN_CON):
                conn = psycopg2.connect(
                    host=cls.HOST,
                    port=cls.DB_PORT,
                    database=cls.DATABASE,
                    user=cls.USERNAME,
                    password=cls.PASSWORD
                )
                cls._pool.put(conn)
            cls.__inicializar_bd()  # ✅ crea las tablas al arrancar
            logger.debug("Pool inicializado con %s conexiones", cls.MIN_CON)
        return cls._pool

    @classmethod
    def __inicializar_bd(cls):
        """Crea las tablas si no existen"""
        conn = cls._pool.get()
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS usuario (
                id_usuario SERIAL PRIMARY KEY,
                username   VARCHAR(100) NOT NULL UNIQUE,
                password   VARCHAR(100) NOT NULL
            )
        """)
        conn.commit()
        cursor.close()
        cls._pool.put(conn)  # ✅ devuelve la conexión al pool
        logger.debug("Tablas verificadas/creadas")

    @classmethod
    def obtenerConexion(cls):
        pool = cls.obtenerPool()
        conexion = pool.get()
        logger.debug("Conexion obtenida del pool")
        return conexion

    @classmethod
    def liberarConexion(cls, conexion):
        if conexion:
            cls.obtenerPool().put(conexion)
            logger.debug("Conexion liberada al pool")

    @classmethod
    def cerrarConexiones(cls):
        if cls._pool is None:
            return
        while not cls._pool.empty():
            conexion = cls._pool.get_nowait()
            conexion.close()
        cls._pool = None
        logger.debug("Todas las conexiones cerradas")