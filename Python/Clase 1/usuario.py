from dataclasses import dataclass


@dataclass
class Usuario:
    id_usuario: int = None
    username: str = ""
    password: str = ""

    def __str__(self) -> str:
        return f"Usuario(id_usuario={self.id_usuario}, username='{self.username}', password='***')"

    @property
    def id(self) -> int:
        return self.id_usuario

    @id.setter
    def id(self, value: int):
        self.id_usuario = value

    @property
    def nombre(self) -> str:
        return self.username

    @nombre.setter
    def nombre(self, value: str):
        self.username = value

    @property
    def clave(self) -> str:
        return self.password

    @clave.setter
    def clave(self, value: str):
        self.password = value
