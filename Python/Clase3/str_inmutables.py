

#help(str.capitalize)
mensaje1 = "hola mundo"
mensaje2 = mensaje1.capitalize()
print(f"Mensaje original: {mensaje1}, id: {id(mensaje1)}")
print(f"Mensaje modificado: {mensaje2}, id: {id(mensaje2)}")

mensaje1 += " Adios"
print(f"Mensaje actualizado: {mensaje1}, id: {id(mensaje1)}")

"""
Un string es inmutable, lo que significa que no se puede modificar su contenido una vez creado.
Cuando se realiza una operación que parece modificar un string, en realidad se crea un nuevo string con el contenido modificado y se asigna a la variable. 
Por eso, el id del string original y el id del string modificado son diferentes.
"""
