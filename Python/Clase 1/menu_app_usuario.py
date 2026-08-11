from usuario import Usuario
from usuario_dao import UsuarioDao


class MenuAppUsuario:
    def __init__(self):
        self._dao = UsuarioDao()

    def ejecutar(self):
        while True:
            print("\nMenú Usuario")
            print("1) Listar usuarios")
            print("2) Agregar usuario")
            print("3) Actualizar usuario")
            print("4) Eliminar usuario")
            print("5) Salir")
            opcion = input("Seleccione una opción: ")

            if opcion == "1":
                self._listar_usuarios()
            elif opcion == "2":
                self._agregar_usuario()
            elif opcion == "3":
                self._actualizar_usuario()
            elif opcion == "4":
                self._eliminar_usuario()
            elif opcion == "5":
                break
            else:
                print("Opción inválida, intente de nuevo.")

    def _listar_usuarios(self):
        usuarios = self._dao.seleccionar()
        if not usuarios:
            print("No hay usuarios registrados.")
            return
        for usuario in usuarios:
            print(usuario)

    def _agregar_usuario(self):
        username = input("Nombre de usuario: ")
        password = input("Contraseña: ")
        usuario = Usuario(username=username, password=password)
        usuario.id_usuario = self._dao.insertar(usuario)
        print(f"Usuario agregado con id {usuario.id_usuario}")

    def _actualizar_usuario(self):
        try:
            id_usuario = int(input("ID de usuario a actualizar: "))
        except ValueError:
            print("ID inválido.")
            return
        username = input("Nuevo nombre de usuario: ")
        password = input("Nueva contraseña: ")
        usuario = Usuario(id_usuario=id_usuario, username=username, password=password)
        filas = self._dao.actualizar(usuario)
        print("Usuario actualizado." if filas else "No se encontró el usuario.")

    def _eliminar_usuario(self):
        try:
            id_usuario = int(input("ID de usuario a eliminar: "))
        except ValueError:
            print("ID inválido.")
            return
        usuario = Usuario(id_usuario=id_usuario)
        filas = self._dao.eliminar(usuario)
        print("Usuario eliminado." if filas else "No se encontró el usuario.")
